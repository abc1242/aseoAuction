import React, { useState, useContext } from "react";
import classes from "./HomePage.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import Profile from "../MyPage/Profile";
import { Route, Switch } from "react-router-dom";
import RoomCard from "./RoomCard";
import { useEffect } from "react";
import ContentContext from "../../store/content-context";
import AuthContext from "../../store/auth-context";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const contentContext = useContext(ContentContext);
  const [rooms, setRooms] = useState([]);

  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    if (!contentContext.content) {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(
        rooms.filter((room) => room.category === contentContext.content)
      );
    }
  }, [rooms, contentContext.content]);

  useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) => room.roomTitle.includes(contentContext.search))
    );
  }, [rooms, contentContext.search]);

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
        setFilteredRooms(data);
      });
  };

  // // 실제 서버와 통신할 때 써야하는 코드
  // const getData = () => {
  //   fetch("http://localhost:8080/room/search/", {
  //     method: "GET",
  //     headers: {
  //       Authorization: authContext.token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setRooms(data);
  //     });
  // };
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
                {/* {rooms.map((roomInfo) => {
                  return <RoomCard roomInfo={roomInfo} />;
                })} */}
                {/* {contentContext.content
                  ? rooms
                      .filter(
                        (roomInfo) =>
                          roomInfo.category === contentContext.content
                      )
                      .map((roomInfo) => <RoomCard roomInfo={roomInfo} />)
                  : rooms.map((roomInfo) => <RoomCard roomInfo={roomInfo} />)} */}
                {filteredRooms.map((roomInfo) => (
                  <RoomCard roomInfo={roomInfo} />
                ))}
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </>
  );
};

export default HomePage;
