import React, { useState, useContext } from "react";
import classes from "./HomePage.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import Profile from "../MyPage/Profile";
import { Route, Switch } from "react-router-dom";
import RoomCard from "./RoomCard";
import { useEffect } from "react";
import AuthContext from "../../store/auth-context";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [searchWord, setSearchWord] = useState("");

  // 임시 코드
  const getData = () => {
    fetch("rooms.json", {
      headers: {
        "Content-Type": "application.json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      });
  };
  // 실제 서버와 통신할 때 써야하는 코드
  // fetch("http://localhost:8080/room/search/" + searchWord, {
  //   method: "GET",
  //   headers: {
  //     Authorization: authContext.token,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => setRooms(data));

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className={classes.homepage}>
        <div className={classes.navigation}>
          <Navigation />
        </div>
        <main className={classes.content}>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <div className={classes.grid}>
                {rooms.map((roomInfo) => {
                  return <RoomCard roomInfo={roomInfo} />;
                })}
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </>
  );
};

export default HomePage;
