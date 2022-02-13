import React from "react";
import { useState } from "react";
import ProfileRequest from "./ProfileRequest";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const userAuthorizationHandler = (result) => {
    setIsAuthorized(result);
  };

  return (
    <>
      {isAuthorized ? (
        <ProfileForm />
      ) : (
        <ProfileRequest userAuthorizationHandler={userAuthorizationHandler} />
      )}
    </>
  );
};

export default Profile;
