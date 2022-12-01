import React, { useContext, useState, useEffect, useTransition } from "react";
import { fetchGetUserChannel } from "../helper/Apicall";
import { ApiContext } from "../context/apiContext";
import { useQueryClient, useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faRotate } from "@fortawesome/free-solid-svg-icons";
import ChannelItem from "../components/ChannelItem";
import CreateChannelModal from "../components/CreateChannelModal";
import { userFilterList } from "../helper/functions";
import myContacts from "../users/contacts.json";

export default function Channel() {
  const [channels, setChannels] = useState([]);
  const [contacts, setContacts] = useState(
    localStorage.getItem("contactList") === null
      ? []
      : JSON.parse(localStorage.getItem("contactList"))
  );
  const [channelPanelSearchInput, setChannelPanelSearchInput] = useState("");
  const [searchSelectionShowing, setSearchSelectionShowing] = useState(false);
  const [searchSelection, setSearchSelection] = useState([]);
  const [isListing, startTransition] = useTransition();
  const {
    theme,
    setTheme,
    accessData,
    createChannel,
    setCreateChannel,
    msgType,
    setChatBoxHeaderName,
    channelHeaderName,
    setChatLoading,
    setShowSideBarMembersList,
    setUsersOptions,
    usersOptions,
  } = useContext(ApiContext);

  // Query fetch //
  const queryClient = useQueryClient();
  const allUsers = queryClient.getQueryData("ALL_USERS");

  // Events //
  const selectedItem = async (e) => {
    let selected = e.currentTarget.dataset;

    if (selected.type === "Channel") {
      setShowSideBarMembersList(true);
    }
    setChatBoxHeaderName({
      id: selected.id,
      type: selected.type,
      name: selected.name,
    });
    setChatLoading(true);
  };

  const addToContacts = (e) => {
    let selected = e.currentTarget.dataset;

    setContacts([...contacts, { uid: selected.id, email: selected.name }]);
    localStorage.setItem("contactList", JSON.stringify(contacts));

    setChatBoxHeaderName({
      id: selected.id,
      type: selected.type,
      name: selected.name,
    });
    setChatLoading(true);
    setChannelPanelSearchInput("");
  };

  const loadChannel = async () => {
    let ch = await fetchGetUserChannel(accessData);
    setChannels(
      ch.data === undefined
        ? ch.errors
        : ch.data.map((data, index) => (
            <ChannelItem
              key={index}
              name={data.name}
              dataId={data.id}
              dataMsgType={"Channel"}
              onClickSelected={selectedItem}
            />
          ))
    );
  };

  const loadUserContacts = () => {
    // let usercontacts = myContacts.users.find(
    //   (user) => user.uid === accessData.id.toString()
    // );
    // if (usercontacts !== undefined) {
    //   setContacts(
    //     usercontacts.contacts.map((user, index) => (
    //       <ChannelItem
    //         key={index}
    //         name={user.email}
    //         dataId={user.uid}
    //         dataMsgType={"User"}
    //         onClickSelected={selectedItem}
    //       />
    //     ))
    //   );
    // }
  };

  const handleSearch = (e) => {
    let val = e.currentTarget.value;
    let userlist;
    setChannelPanelSearchInput(val);

    startTransition(() => {
      if (msgType === "User") {
        if (!usersOptions || usersOptions === "") {
          setUsersOptions(
            allUsers.data &&
              allUsers.data.map((user) => {
                return { value: user.id, label: user.uid };
              })
          );
        }

        if (val.length < 3) {
          setSearchSelection([
            <div className="w-[100%] h-[100%] grid place-items-center">
              <FontAwesomeIcon
                icon={faRotate}
                className="channel-loading animate-spin text-[4rem] m-[auto]"
              />
            </div>,
          ]);
        } else if (val.length > 3) {
          userlist = userFilterList(val, usersOptions);

          if (userlist.length === 0) {
            setSearchSelection(["No results"]);
          } else {
            setSearchSelection(
              userlist.map((item, index) => (
                <ChannelItem
                  key={index}
                  name={item.label}
                  dataId={item.value}
                  dataMsgType={"User"}
                  onClickSelected={addToContacts}
                />
              ))
            );
          }
        }
      }
      if (msgType === "Channel") {
      }
    });
  };

  useEffect(() => {
    if (channelPanelSearchInput.length > 1) {
      setSearchSelectionShowing(true);
    } else {
      setSearchSelectionShowing(false);
    }
  }, [channelPanelSearchInput]);
  useEffect(() => {
    setChannelPanelSearchInput("");
  }, [msgType]);

  useEffect(() => {
    loadChannel();
    loadUserContacts();
  }, [createChannel]);

  const handleTheme = (e) => {
    let themeID = e.target.id.toLowerCase();
    localStorage.setItem("themePreference", JSON.stringify(themeID));
    setTheme(themeID);
  };

  return (
    <>
      <div className="channel-panel flex flex-col items-stretch justify-start  w-[100%] max-w-[320px] h-[100%] z-[3]">
        <div className="channel-panel-header flex flex-row flex-wrap items-center justify-start w-[100%] min-h-[80px]  p-5 font-bold ">
          <span>{channelHeaderName}</span>
          {channelHeaderName === "Channels" ? (
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="channel-plus ml-auto cursor-pointer text-[1.25rem]"
              onClick={() => {
                setUsersOptions(
                  allUsers.data &&
                    allUsers.data.map((user) => {
                      return { value: user.id, label: user.uid };
                    })
                );
                setCreateChannel(true);
              }}
            />
          ) : (
            ""
          )}
        </div>

        <div className="channel-filter p-[0.8rem]">
          <input
            className="indent-[10px] w-[100%] h-[100%] p-2.5  focus:outline-none"
            placeholder="Search"
            onChange={handleSearch}
            value={channelPanelSearchInput}
          />
        </div>

        <div className="channel-items flex flex-col justify-start items-stretch w-[100%] h-[100%] p-2.5 gap-2.5 overflow-y-auto">
          {searchSelectionShowing === false
            ? msgType === "User"
              ? contacts.map((user, index) => (
                  <ChannelItem
                    key={index}
                    name={user.email}
                    dataId={user.uid}
                    dataMsgType={"User"}
                    onClickSelected={selectedItem}
                  />
                ))
              : channels
            : searchSelection}
        </div>
        <div className="theme-picker mt-auto p-[0.8rem] min-h-[70px] w-[100%] flex flex-row justify-center items-center gap-[1rem]">
          {/* {Dark Theme} */}
          <label className="sr-only" htmlFor="dark">
            dark
          </label>
          <input
            className="cursor-pointer opacity-[0.75]"
            type="radio"
            name="theme"
            id="dark"
            checked={theme === "dark"}
            value="dark"
            title="Dark Theme"
            onChange={handleTheme}
          />
          {/* {Light Theme} */}
          <label className="sr-only" htmlFor="light">
            light
          </label>
          <input
            className="cursor-pointer opacity-[0.75]"
            type="radio"
            name="theme"
            id="light"
            title="Light Theme"
            checked={theme === "light"}
            value="light"
            onChange={handleTheme}
          />
          {/* {Cobalt Theme} */}
          <label className="sr-only" htmlFor="cobalt">
            cobalt
          </label>
          <input
            className="cursor-pointer opacity-[0.75]"
            type="radio"
            name="theme"
            id="cobalt"
            title="Cobalt Theme"
            checked={theme === "cobalt"}
            value="cobalt"
            onChange={handleTheme}
          />
        </div>
      </div>
      {createChannel ? (
        <CreateChannelModal usersList={usersOptions} />
      ) : (
        <div />
      )}
    </>
  );
}
