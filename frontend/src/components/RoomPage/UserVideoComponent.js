import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import styled from "styled-components";
import "./UserVideo.css";
// import styles from "./UserVideo.module.css";

const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
`;

const Nickname = styled.div`
  text-align: right;
  position: absolute;
  width: auto;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  font-size: medium;
`;

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <StreamComponent className="streamcomponent">
            {/* <div className={styles.streamcomponent}> */}
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div className="nametag">
              <Nickname>{this.getNicknameTag()}</Nickname>
            </div>
          </StreamComponent>
        ) : null}
      </div>
    );
  }
}
