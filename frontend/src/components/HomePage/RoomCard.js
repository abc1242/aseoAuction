import React from "react";
import classes from "./RoomCard.module.css";

const RoomCard = (props) => {
  const roomCreated = new Date(props.roomInfo.createdAt);
  const currentTime = new Date();
  let timeText = null;

  if (currentTime.getFullYear() !== roomCreated.getUTCFullYear()) {
    const createdYear = roomCreated.getUTCFullYear();
    const createdMonth = roomCreated.getUTCMonth();
    const createdDay = roomCreated.getUTCDate();
    timeText = `${createdYear}년 ${createdMonth + 1}월 ${createdDay}일`;
  } else {
    if (
      currentTime.getDate() === roomCreated.getUTCDate() &&
      currentTime.getMonth() === roomCreated.getUTCMonth()
    ) {
      if (currentTime.getHours() === roomCreated.getUTCHours()) {
        timeText = `${
          currentTime.getMinutes() - roomCreated.getUTCMinutes()
        }분 전`;
      } else {
        timeText = `${
          currentTime.getHours() - roomCreated.getUTCHours()
        } 시간전`;
      }
    } else {
      timeText = `${
        roomCreated.getUTCMonth() + 1
      }월 ${roomCreated.getUTCDate()}일`;
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
          <span className={classes.max}>최대</span>
          <p className={classes.price}>{props.roomInfo.startPrice}</p>
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
            {props.roomInfo.participants.length}명 시청중
          </span>
        </section>

        <p className={classes.time}>{timeText}</p>
      </div>
    </div>
  );
};

export default RoomCard;
