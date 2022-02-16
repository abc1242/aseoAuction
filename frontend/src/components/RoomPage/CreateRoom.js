import React, { useContext } from "react";
import { useRef } from "react";
import classes from "./CreateRoom.module.css";

import AuthContext from "../../store/auth-context";

const CreateRoom = () => {
  // const [file, setFile] = useState();
  const filePickerRef = useRef();
  const authContext = useContext(AuthContext);
  const roomTitleRef = useRef();
  const seller = "샘플 닉네임";
  const startPriceRef = useRef();
  const categoryRef = useRef();
  const productRef = useRef();

  // function pickedHandler(event) {
  //   event.preventdefault();
  //   if (event.target.files && event.target.files.length === 1) {
  //     setFile(event.target.files[0]);
  //     console.log(event.target.files[0]);
  //   }
  // }

  const onFileUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("img", filePickerRef.current.files[0]);
    data.append("roomTitle", roomTitleRef.current.value);
    data.append("seller", seller);
    data.append("startPrice", startPriceRef.current.value);
    data.append("category", categoryRef.current.value);
    data.append("product", productRef.current.value);
    console.log(filePickerRef.current.files[0]);

    fetch("http://localhost:8080/room/open", {
      method: "POST",
      headers: {
        Authorization: authContext.token,
      },
      body: data,
    }).then((response) => {
      console.log(response);
    });
  };

  console.log(filePickerRef);

  return (
    <div className={classes.container}>
      <form onSubmit={onFileUpload}>
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
          <input placeholder={seller} disabled />
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
