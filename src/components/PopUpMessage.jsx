import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faX,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

let messagesArray = [];

export const addPopup = (message) => {
  messagesArray = [...messagesArray, message]
}

const PopUpMessage = (props) => {
  const [arrayMsg, setArrayMsg] = useState([])
  
  useEffect(() => {
    console.log(arrayMsg)
    const interval = setInterval(() => {
      
      if (messagesArray.length) {
        let trimmedList = messagesArray.slice(1);
       setArrayMsg(trimmedList);
       messagesArray.shift()
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-[3rem] left-[50%] translate-x-[-50%] isolate z-[200] max-h-[175px] overflow-hidden ">
      {arrayMsg.length > 0 &&
        arrayMsg.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                item.error ? "bg-red-900" : "bg-green-900"
              } w-[fit-content]   px-[1.25rem] py-[0.5rem] pr-[0.9rem] rounded-[5px] shadow-md text-white flex flex-row gap-[1rem] items-center justify-center my-[0.75rem] hover:brightness-[1.2] animate-slideDown`}
              data-id={index}
              onClick={(e) => {
                deleteMessage(e);
              }}
            >
              <FontAwesomeIcon
                icon={item.error ? faCircleXmark : faCircleCheck}
              />
              <p className=" font-semibold ">{item}</p>
              <FontAwesomeIcon
                className="border-l-[0.1rem] py-[0.35rem] pl-[1rem] scale-[0.8]"
                icon={faX}
              />
            </div>
          );
        })}
    </div>
  );
};

export default PopUpMessage;
