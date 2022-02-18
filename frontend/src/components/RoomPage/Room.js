import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "./Room.css";
import micOn from "../../images/Room/micon.png";
import micOff from "../../images/Room/micoff.png";
import camOn from "../../images/Room/camon.png";
import camOff from "../../images/Room/camoff.png";
import Messages from "./Messages";
import UserVideoComponent from "./UserVideoComponent";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomTitle: "",
      mySessionId: "Pa" + Math.floor(Math.random().toFixed(6) * 10000000),
      myUserName: localStorage.getItem("nickname"),

      myStartTime: "",
      myStartPrice: 0,
      myProductInfo: "",
      myProductImg: null,
      isUploaded: false,
      category: null,

      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],

      audiostate: true,
      videostate: true,

      messages: [],
      chaton: true,
      message: "",

      ishost: false,
      timer: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);

    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeRoomTitle = this.handleChangeRoomTitle.bind(this);

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangeStartPrice = this.handleChangeStartPrice.bind(this);
    this.handleChangeProductInfo = this.handleChangeProductInfo.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);

    //image
    this.handleChangeProductImg = this.handleChangeProductImg.bind(this);

    //chat
    this.chattoggle = this.chattoggle.bind(this);
    this.messageContainer = createRef(null);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);

    //timer
    this.handleTimerClick = this.handleTimerClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    setTimeout(() => {
      const { nickname } = this.props;

      this.setState({
        //   token,
        //   mySessionId: roomId,
        myUserName: nickname,
      });
    }, 500);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeRoomTitle(e) {
    console.log(e.target.value);
    this.setState({
      roomTitle: e.target.value,
    });
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

  handleChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  // image
  handleChangeProductImg(e) {
    console.log(e.target.files[0]);
    this.setState({
      //   myProductImg: e.target.value,
      myProductImg: e.target.files[0],
    });
  }

  handlePost() {
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
  }

  // timer
  handleTimerClick(e) {
    this.setState({
      timer: true,
    });
  }

  // chat
  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
  }

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
          chatClass: "messages__item--operator",
        },
      ],
    });
    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: "chat",
    });

    this.setState({
      message: "",
    });
  }

  sendmessageByEnter(e) {
    if (e.key === "Enter") {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: "messages__item--operator",
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: "chat",
      });

      this.setState({
        message: "",
      });
    }
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
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
    console.log(this.state.roomTitle);
    // DB 반영
    const data = new FormData();
    data.append("img", this.state.myProductImg);
    data.append("roomId", this.state.mySessionId);
    data.append("seller", this.state.myUserName);
    data.append("startPrice", this.state.myStartPrice);
    data.append("category", this.state.category);
    data.append("product", this.state.myProductInfo);
    data.append("roomTitle", this.state.roomTitle);

    console.log(data);

    fetch("/api/room/open", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: data,
    }).then((response) => {
      console.log(response);
    });

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
        mySession.on("streamCreated", (event) => {
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
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        //chat
        mySession.on("signal:chat", (event) => {
          let chatdata = event.data.split(",");
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: "messages__item--visitor",
                },
              ],
            });
          }
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(() => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
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
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
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
      session: "",
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      myStartTime: "time",
      myStartPrice: 0,
      myProductInfo: "productinfo",
      myProductImg: null,
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    const { nickname } = this.props;
    const mySessionId = this.state.mySessionId;
    const myUserName = nickname;

    const myStartTime = this.state.myStartTime;
    const myStartPrice = this.state.myStartPrice;
    const myProductInfo = this.state.myProductInfo;

    const messages = this.state.messages;

    return (
      <div className="Room">
        {this.state.session === undefined ? (
          <div id="join">
            {/* <div id="img-div">
                            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
                        </div> */}
            <div id="join-dialog" className="jumbotron vertical-center">
              {/* <img className='grid--2--cols' src={logo} alt="로고"></img> */}

              <form
                className="form-group grid--2--cols"
                onSubmit={this.joinSession}
              >
                <p>
                  <label> 제목 </label>
                  <input
                    className="form-input"
                    type="text"
                    onChange={this.handleChangeRoomTitle}
                    required
                  />
                </p>
                <p>
                  <label>참여자: </label>
                  <input
                    className="form-input"
                    type="text"
                    id="userName"
                    value={this.state.myUserName}
                    onChange={this.handleChangeUserName}
                    required
                    disabled
                  />
                </p>
                <p>
                  <label> 세션: </label>
                  <input
                    className="form-input"
                    type="text"
                    id="sessionId"
                    disabled
                    value={this.state.mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>

                <p>
                  <label> 경매시작 시간: </label>
                  <input
                    className="form-input"
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
                    className="form-input"
                    type="text"
                    id="startPrice"
                    value={myStartPrice}
                    onChange={this.handleChangeStartPrice}
                    required
                  />
                </p>
                <p>
                  <label> 카테고리 </label>
                  <input
                    className="form-input"
                    type="text"
                    onChange={this.handleChangeCategory}
                    required
                  />
                </p>

                <p>
                  <label> 물품 정보: </label>
                  <input
                    className="form-input"
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
                    className="form-input"
                    type="file"
                    id="productImg"
                    accept=".jpg, .png, .bmp, .jpeg"
                    onChange={this.handleChangeProductImg}
                  />
                  {/* <button type='button' onClick={this.handlePost}>버튼</button> */}
                </p>
                <p className="text-center">
                  <input
                    className="btnRoom btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="경매실 입장"
                  />

                  <Link to="/">
                    <input
                      className="btnRoom btn-lg btn-danger"
                      name="commit"
                      type="button"
                      value="나가기"
                      to="/"
                    />
                  </Link>
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session">
            <div id="video-container" className="videoBack">
              {this.state.publisher !== undefined ? (
                <div
                  className="stream-container"
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  {/* <div className="stream-container col-md-6 col-xs-6"> */}
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  {/* <div key={i} className="stream-container col-md-6 col-xs-6"> */}
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>

            <div className="container grid grid--2--cols">
              <div className="productInfo">
                <h1 id="session-title">
                  {myUserName}님 안녕하세요, 여기는 {mySessionId}입니다.
                </h1>
                <h1>경매 시작 시간은 {myStartTime}입니다.</h1>
                <h1>물품정보는 {myProductInfo}입니다.</h1>
                <h1>시작가격은 {myStartPrice}입니다.</h1>
                {/* <h1>닉네임은 {nickname}</h1> */}

                <hr />

                <hr />

                <button
                  className="btn-home"
                  // onClick={this.handleTimerClick}
                >
                  타이머/경매 시작
                </button>

                {this.state.mainStreamManager !== undefined ? (
                  <div id="main-video" className="main-video">
                    <h1>호스트</h1>
                    <div className="main-stream-container">
                      <UserVideoComponent
                        streamManager={this.state.mainStreamManager}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              {/* chat */}
              <div className="chatbox">
                <h1 className="chatboxHeader">채팅하기</h1>
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
                        className="form-input"
                        placeholder="전송할 메세지를 입력하세요"
                        onChange={this.handleChatMessageChange}
                        onKeyPress={this.sendmessageByEnter}
                        value={this.state.message}
                      />
                      <button
                        className="chat chatbox__send--footer btnRoom"
                        onClick={this.sendmessageByClick}
                      >
                        보내기
                      </button>
                    </div>
                  </div>
                ) : null}
                <div className="chatbox__button" ref={this.chatButton}>
                  {/* <button onClick={this.chattoggle}>
                                        채팅 버튼
                                    </button> */}
                </div>
              </div>
            </div>
            <div className="roomFooter">
              <div className="roomControl grid--3--cols">
                {this.state.videostate ? (
                  <div className="controlPosition">
                    <img
                      src={camOff}
                      alt="카메라 끄기"
                      onClick={() => {
                        this.state.publisher.publishVideo(
                          !this.state.videostate
                        );
                        this.setState({ videostate: !this.state.videostate });
                      }}
                    />
                    <span>
                      <h1>비디오</h1>
                    </span>
                  </div>
                ) : (
                  <div className="controlPosition">
                    <img
                      src={camOn}
                      alt="카메라켜기"
                      onClick={() => {
                        this.state.publisher.publishVideo(
                          !this.state.videostate
                        );
                        this.setState({ videostate: !this.state.videostate });
                      }}
                    />
                    <span>
                      <h1>비디오</h1>
                    </span>
                  </div>
                )}

                {this.state.audiostate ? (
                  <div className="controlPosition">
                    <img
                      src={micOff}
                      alt="마이크 끄기"
                      onClick={() => {
                        this.state.publisher.publishAudio(
                          !this.state.audiostate
                        );
                        this.setState({ audiostate: !this.state.audiostate });
                      }}
                    />
                    <span>
                      <h1>마이크</h1>
                    </span>
                  </div>
                ) : (
                  <div className="controlPosition">
                    <img
                      src={micOn}
                      alt="마이크 켜기"
                      onClick={() => {
                        this.state.publisher.publishAudio(
                          !this.state.audiostate
                        );
                        this.setState({ audiostate: !this.state.audiostate });
                      }}
                    />
                    <span>
                      <h1>마이크</h1>
                    </span>
                  </div>
                )}

                <Link to="/">
                  <input
                    className="btn-home"
                    type="button"
                    id="buttonLeaveSession"
                    onClick={this.leaveSession}
                    value="나가기"
                  />
                </Link>
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
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", "세션을 만들 때", response);
          console.log(OPENVIDU_SERVER_URL + "/openvidu/api/sessions");
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", "토큰입니다", response);
          console.log(
            OPENVIDU_SERVER_URL +
              "/openvidu/api/sessions/" +
              sessionId +
              "/connection"
          );
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default Room;
