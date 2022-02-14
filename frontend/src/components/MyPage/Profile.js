import React from "react";
import { useState } from "react";
import ProfileRequest from "./ProfileRequest";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState({
    email: "test@gmail.com",
    nickname: "testnickname",
  });

  const userAuthorizationHandler = (result) => {
    setIsAuthorized(result);
  };

  const userDataHandler = (userData) => {
    setUserData(userData);
  };

  return (
    <>
      {isAuthorized ? (
        <ProfileForm userData={userData} />
      ) : (
        <ProfileRequest
          userDataHandler={userDataHandler}
          userAuthorizationHandler={userAuthorizationHandler}
        />
      )}
    </>
  );
};

export default Profile;
