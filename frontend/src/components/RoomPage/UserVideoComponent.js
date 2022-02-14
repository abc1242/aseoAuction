import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';
import styles from "./UserVideo.module.css";

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    // <div className="streamcomponent">
                    <div className={styles.streamcomponent}>
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div className={styles.nametag}>
                            <h1>{this.getNicknameTag()}님</h1>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
