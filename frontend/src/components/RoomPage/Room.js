import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, createRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Room.css';
import Messages from './Messages';

import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';


class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            myTitle: 'product title',
            myStartTime: 'time',
            myStartPrice : 0,
            myProductInfo: 'productinfo',
            myProductImg: undefined,
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],

            audiostate: true,
            videostate: true,

            messages: [],
            chaton: false,
            message: '',
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);

        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeStartPrice = this.handleChangeStartPrice.bind(this);
        this.handleChangeProductInfo = this.handleChangeProductInfo.bind(this);

        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);


        //chat
        this.chattoggle = this.chattoggle.bind(this);
        this.messageContainer = createRef(null);
        this.sendmessageByClick = this.sendmessageByClick.bind(this);
        this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
        this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleChangeTitle(e) {
        this.setState({
            myTitle: e.target.value,
        });
    }

    handleChangeStartTime(e) {
        this.setState({
            myStartTime: e.target.value,
        });
    }

    handleChangeStartPrice(e) {
        this.setState({
            myStartPrice: e.target.value,
        });
    }

    handleChangeProductInfo(e) {
        this.setState({
            myProductInfo: e.target.value,
        });
    }

    handleChangeProductImg(e) {
        this.setState({
            myProductImg: e.target.value,            
        });
    }

    // chat
    handleChatMessageChange(e) {
        this.setState({
          message: e.target.value,
        });
      }

    sendmessageByClick() {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              userName: this.state.myUserName,
              text: this.state.message,
              chatClass: 'messages__item--operator',
            },
          ],
        });
        const mySession = this.state.session;
    
        mySession.signal({
          data: `${this.state.myUserName},${this.state.message}`,
          to: [],
          type: 'chat',
        });
    
        this.setState({
          message: '',
        });
      }
    
      sendmessageByEnter(e) {
        if (e.key === 'Enter') {
          this.setState({
            messages: [
              ...this.state.messages,
              {
                userName: this.state.myUserName,
                text: this.state.message,
                chatClass: 'messages__item--operator',
              },
            ],
          });
          const mySession = this.state.session;
    
          mySession.signal({
            data: `${this.state.myUserName},${this.state.message}`,
            to: [],
            type: 'chat',
          });
    
          this.setState({
            message: '',
          });
        }
      }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    joinSession() {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {

                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                //chat
                mySession.on('signal:chat', (event) => {
                    let chatdata = event.data.split(',');
                    if (chatdata[0] !== this.state.myUserName) {
                      this.setState({
                        messages: [
                          ...this.state.messages,
                          {
                            userName: chatdata[0],
                            text: chatdata[1],
                            chatClass: 'messages__item--visitor',
                          },
                        ],
                      });
                    }
                  });


                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(() => {

                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---

                            mySession.publish(publisher);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                mainStreamManager: publisher,
                                // publisher: publisher,
                                publisher,
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }

    chattoggle() {
        this.setState({ chaton: !this.state.chaton });
      }
    
    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            myTitle: 'product title',
            myStartTime: 'time',
            myStartPrice: 0,
            myProductInfo: 'productinfo',
            myProductImg: undefined,
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;

        const myStartTime = this.state.myStartTime;
        const myTitle = this.state.myTitle;
        const myStartPrice = this.state.myStartPrice;
        const myProductInfo = this.state.myProductInfo;
        const myProductImg = this.state.myProductImg;
        // const myProductImg = new FormData();

        //chat
        const messages = this.state.messages;

        

        return (
            <div className="container">
                {this.state.session === undefined ? (
                    <div id="join">
                        {/* <div id="img-div">
                            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
                        </div> */}
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h1> 경매실 </h1>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <label>참여자: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> 세션: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>

                                <p>
                                    <label> 제목: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="title"
                                        value={myTitle}
                                        onChange={this.handleChangeTitle}
                                        required
                                    />
                                </p>

                                <p>
                                    <label> 경매시작 시간: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="startTime"
                                        value={myStartTime}
                                        onChange={this.handleChangeStartTime}
                                        required
                                    />
                                </p>

                                <p>
                                    <label> 시작 가격: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="startPrice"
                                        value={myStartPrice}
                                        onChange={this.handleChangeStartPrice}
                                        required
                                    />
                                </p>

                                <p>
                                    <label> 물품 정보: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="productInfo"
                                        value={myProductInfo}
                                        onChange={this.handleChangeProductInfo}
                                        required
                                    />
                                </p>

                                <p>
                                    <label> 물품 사진: </label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="productImg"
                                        accept='image/*'
                                        value={myProductImg}
                                        onChange={this.handleChangeProductImg}
                                    />
                                </p>


                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="경매실 생성" />
                                
                                    <Link to="/">
                                        <input className="btn btn-lg btn-danger" name="commit" type="button" value="경매실 취소" to="/"/>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">

                        <div id="session-header">
                            <h1 id="session-title">{myUserName}님 안녕하세요, 여기는 {mySessionId}입니다.</h1>
                            <h1>제목은 {myTitle}입니다.</h1>
                            <h1>경매 시작 시간은 {myStartTime}입니다.</h1>
                            <h1>물품정보는 {myProductInfo}입니다.</h1>
                            <h1>시작가격은 {myStartPrice}입니다.</h1>
                            <h1>물품사진은 {myProductImg}입니다.</h1>

                            {/* <img src={myProductImg}> </img>
                            <file>{myProductImg}</file> */}

                            {this.state.videostate ? (
                                <button
                                    className="btn btn-large btn-danger"
                                    onClick={() => {
                                        this.state.publisher.publishVideo(!this.state.videostate);
                                        this.setState({ videostate: !this.state.videostate });
                                    }}
                                >
                                    비디오 끄기
                                </button>                    
                            ) : (
                                <button
                                    className="btn btn-large btn-success"
                                    onClick={() => {
                                        this.state.publisher.publishVideo(!this.state.videostate);
                                        this.setState({ videostate: !this.state.videostate });
                                    }}
                                >
                                    비디오 켜기
                                </button>
                            )}

                            {this.state.audiostate ? (
                                <button
                                    className="btn btn-large btn-danger"
                                    onClick={() => {
                                        this.state.publisher.publishAudio(!this.state.audiostate);
                                        this.setState({ audiostate: !this.state.audiostate });
                                    }}
                                >
                                    마이크 끄기
                                </button>
                            ) : (
                                <button
                                    className="btn btn-large btn-success"
                                    onClick={() => {
                                        this.state.publisher.publishAudio(!this.state.audiostate);
                                        this.setState({ audiostate: !this.state.audiostate });
                                    }}
                                >
                                    마이크 켜기
                                </button>
                            )}

                            <Link to="/">
                                <input
                                    className="btn btn-large btn-danger"
                                    type="button"
                                    id="buttonLeaveSession"
                                    onClick={this.leaveSession}
                                    value="나가기"
                                />
                            </Link>
                        </div>

                        <hr />

                        {/* {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                
                                <hr />

                                <h1>호스트</h1>
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                
                            </div>
                        ) : null} */}

                        <div id="video-container" className="col-md-6">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                {/* <div className="stream-container col-md-6 col-xs-6"> */}
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                {/* <div key={i} className="stream-container col-md-6 col-xs-6"> */}
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>

                        {/* chat */}
                        <div className="chatbox">
                            {this.state.chaton ? (
                                <div className="chat chatbox__support chatbox--active">
                                    <div className="chat chatbox__header" />
                                        <div className="chatbox__messages" ref="chatoutput">
                                            {/* {this.displayElements} */}
                                            <Messages messages={messages} />
                                        <div />
                                    </div>
                                    <div className="chat chatbox__footer">
                                        <input
                                            id="chat_message"
                                            type="text"
                                            placeholder="Write a message..."
                                            onChange={this.handleChatMessageChange}
                                            onKeyPress={this.sendmessageByEnter}
                                            value={this.state.message}
                                        />
                                        <p
                                            className="chat chatbox__send--footer"
                                            onClick={this.sendmessageByClick}
                                        >
                                            Send
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                            <div className="chatbox__button" ref={this.chatButton}>
                                <button onClick={this.chattoggle}>
                                    채팅 버튼
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION','세션을 만들 때', response);
                    console.log(OPENVIDU_SERVER_URL + '/openvidu/api/sessions')
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN','토큰입니다', response);
                    console.log(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection")
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default Room;