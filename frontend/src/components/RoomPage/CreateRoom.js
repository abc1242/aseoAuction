import React, { useContext } from "react";
import { useRef } from "react";
import classes from "./CreateRoom.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import SessionContext from "../../store/session-context";

const CreateRoom = () => {
  const sessionContext = useContext(SessionContext);
  const history = useHistory();
  const filePickerRef = useRef();
  const authContext = useContext(AuthContext);
  const roomTitleRef = useRef();
  const seller = authContext.nickname;
  const startPriceRef = useRef();
  const categoryRef = useRef();
  const productRef = useRef();
  const roomId = Math.floor(Math.random().toFixed(6) * 10000000);

  const onFileUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("img", filePickerRef.current.files[0]);
    data.append("roomTitle", roomTitleRef.current.value);
    data.append("seller", seller);
    data.append("startPrice", startPriceRef.current.value);
    data.append("category", categoryRef.current.value);
    data.append("product", productRef.current.value);
    data.append("roomId", roomId);

    fetch("/api/room/open", {
      method: "POST",
      headers: {
        Authorization: authContext.token,
      },
      body: data,
    }).then((response) => {
      console.log(response);
      sessionContext.createSession(roomId);
    });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={onFileUpload}>
        <p>{roomId}</p>
        <div>
          <input ref={filePickerRef} accept=".jpg,.png,.jpeg" type="file" />
        </div>
        <div>
          <input placeholder="방 제목" ref={roomTitleRef} />
        </div>

        <div>
          <textarea placeholder="설명" ref={productRef} />
        </div>

        <div>
          <input placeholder="시작 가격" ref={startPriceRef} />
        </div>
        <div>
          <input placeholder="카테고리" ref={categoryRef} />
        </div>
        <button>업로드</button>
      </form>
    </div>
  );
};

export default CreateRoom;
