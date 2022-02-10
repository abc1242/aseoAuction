import React from "react";
import Room from "../RoomPage/Room";

const HomeGroupMeeting = () => {
  return (
    <div>
      <h1>이게그룹미팅</h1>
      <p>vs코드에서 터미널 하나 더 키고</p>
      <p>docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.20.0</p>
      <p>복붙</p>
      <Room />
    </div>
  );
};

export default HomeGroupMeeting;