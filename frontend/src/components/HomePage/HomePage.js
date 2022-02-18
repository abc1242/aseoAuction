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
import Room from "../RoomPage/Room";
import SessionContext from "../../store/session-context";

const HomePage = () => {
  const sessionContext = useContext(SessionContext);
  const authContext = useContext(AuthContext);
  const contentContext = useContext(ContentContext);
  const [rooms, setRooms] = useState([]);
  const [dummy, setDummy] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filteredDummy, setFilteredDummy] = useState([]);

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
    if (!contentContext.content) {
      setFilteredDummy(dummy);
    } else {
      setFilteredDummy(
        dummy.filter((dummy) => dummy.category === contentContext.content)
      );
    }
  }, [dummy, contentContext.content]);

  useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) => room.roomTitle.includes(contentContext.search))
    );
  }, [rooms, contentContext.search]);

  useEffect(() => {
    setFilteredDummy(
      dummy.filter((dummy) => dummy.roomTitle.includes(contentContext.search))
    );
  }, [dummy, contentContext.search]);

  const getData = () => {
    fetch("rooms.json", {
      headers: {
        "Content-Type": "application.json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDummy(data);
      });
  };

  useEffect(() => {
    getData();

    fetch("/api/room/search/", {
      method: "GET",
      headers: {
        Authorization: authContext.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRooms(data);
      });
  }, [authContext.token]);

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
            <Route path="/room/create">
              <Room />
            </Route>
            <Route path="/room/detail">
              <Room />
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
                {filteredDummy.map((roomInfo) => (
                  // 링크를 통해서 Room.js 렌더링
                  <RoomCard roomInfo={roomInfo} />
                ))}
                {filteredRooms.map((roomInfo) => (
                  // 링크를 통해서 Room.js 렌더링
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
