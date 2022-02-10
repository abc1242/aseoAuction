import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const HomePage = () => {
  const ctx = useContext(AuthContext);

  return (
    <div>
      <h1>{ctx.userEmail}</h1>
      <h2>{ctx.token}</h2>
    </div>
  );
};

export default HomePage;
