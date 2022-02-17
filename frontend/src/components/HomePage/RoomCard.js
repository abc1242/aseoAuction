import React from "react";
import { Link } from "react-router-dom";
import classes from "./RoomCard.module.css";

const RoomCard = (props) => {
  const roomCreated = new Date(props.roomInfo.createdAt);
  const currentTime = new Date();

  let timeText = null;

  if (currentTime.getFullYear() !== roomCreated.getFullYear()) {
    const createdYear = roomCreated.getFullYear();
    const createdMonth = roomCreated.getMonth();
    const createdDay = roomCreated.getDate();
    timeText = `${createdYear}년 ${createdMonth + 1}월 ${createdDay}일`;
  } else {
    if (
      currentTime.getDate() === roomCreated.getDate() &&
      currentTime.getMonth() === roomCreated.getMonth()
    ) {
      if (currentTime.getHours() === roomCreated.getHours()) {
        timeText = `${
          currentTime.getMinutes() - roomCreated.getMinutes()
        }분 전`;
      } else {
        timeText = `${currentTime.getHours() - roomCreated.getHours()} 시간전`;
      }
    } else {
      timeText = `${roomCreated.getMonth() + 1}월 ${roomCreated.getDate()}일`;
    }
  }

  return (
    <div className={classes.card}>
      <section className={classes.imgBox}>
        <img
          className={classes.img}
          src={props.roomInfo.imgUrl}
          alt="img Error"
        />
      </section>
      <div className={classes.descriptionBox}>
        <p className={classes.title}>{props.roomInfo.roomTitle}</p>
        <section className={classes.priceSection}>
          <p className={classes.max}>
            {props.roomInfo.roomStatus === true ? "최대" : "최종"}
          </p>
          <p className={classes.price}>
            {props.roomInfo.roomStatus === true
              ? props.roomInfo.startPrice
              : props.roomInfo.endPrice}
            원
          </p>
        </section>

        <section>
          {props.roomInfo.roomStatus === true && (
            <button disabled className={classes.statusLive}>
              LIVE
            </button>
          )}
          {props.roomInfo.roomStatus === false && (
            <button disabled className={classes.statusDead}>
              종료
            </button>
          )}
          <span className={classes.statusNumber}>
            {props.roomInfo.participantList.length}명 시청중
          </span>
        </section>

        <p className={classes.time}>{timeText}</p>
      </div>
    </div>
  );
};

export default RoomCard;
