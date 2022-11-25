import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../context/apiContext";
const ChatItem = (props) => {
  const { accessData } = useContext(ApiContext);

  const dateTimeToday = new Date().getTime();

  const calculateTime = (timeSent) => {
    const dateTime = new Date(timeSent);
    const timeDifference = dateTimeToday - dateTime;
    const minute = 60_000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 4 * week;
    const year = 4 * month;

    let result;

    if (timeDifference < minute) {
      return "a few seconds ago";
    }
    if (timeDifference < hour) {
      result = Math.round(timeDifference / minute);
      // return dateTime.toLocaleTimeString();
      return `${result} ${result > 1 ? "minutes" : "minute"} ago`;
    }
    if (timeDifference < day) {
      return dateTime.toLocaleTimeString();
    }
    if (timeDifference < week) {
      result = Math.round(timeDifference / day);
      return `${result} ${result > 1 ? "days" : "day"} ago`;
    }
    if (timeDifference < month || timeDifference < year) {
      return dateTime.toLocaleDateString();
    }
    if (timeDifference > year) {
      result = Math.round(timeDifference / year);
      return `${result} ${result > 1 ? "years" : "year"} ago`;
    } else {
      return "invalid time";
    }
  };

  console.log(accessData, "accessdata", props.sender, "sender");

  return (
    <div className="flex flex-row flex-nowrap items-end gap-[0.8rem] w-[min(650px,_100%)] h-[max-content]">
      <div
        className={
          !props.pictoggle
            ? "invisible photo-holder aspect-square w-[min(28px,_100%)]"
            : "photo-holder aspect-square w-[min(28px,_100%)] text-white bg-black p-[0.4rem] mb-auto rounded-[0.35rem] grid place-items-center"
        }
      >
        <FontAwesomeIcon icon={faUser} className="w-[100%] h-[100%]" />
      </div>
      <div className="flex flex-col flex-nowrap gap-[0.1rem] ">
        {props.toggle && (
          <div>
            <span className="sender text-[0.6rem] pl-[6px]">
              {props.sender.uid}
            </span>
            <span className="time-holder lowercase text-[0.6rem] pl-[6px]">
              {calculateTime(props.time)}
            </span>
          </div>
        )}
        <div className="messages-holder relative w-[100%]">
          <p>{props.body}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
