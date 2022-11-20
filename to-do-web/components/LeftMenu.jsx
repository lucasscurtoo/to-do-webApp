import { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { checkIfExists, defaultList } from "../helpers/functions";
import { toDoCreateList, toDoGetLists } from "../api/toDo";
import CustomToast from "./CustomToast";
import DocumentIcon from "../assets/icons/document-icon.svg";

const LeftMenu = ({ close, selectedList }) => {
  const [lists, setLists] = useState(defaultList);
  const [showToast, setShowToast] = useState(false);
  const [listCreated, setListCreated] = useState();
  const [listExists, setListExists] = useState(false);
  const [selectedListStyle, setSelectedListStyle] = useState(
    defaultList[0].title
  );
  const newList = useRef(null);

  useEffect(() => {
    toDoGetLists().then((response) => {
      if (response.status === 200) {
        setLists(response.data);
        setSelectedListStyle(response.data[0].title)
      }
    });
  }, []);

  const createNewList = (listName) => {
    const listExists = checkIfExists(lists, listName);
    if (listExists) {
      setShowToast(true);
      setListExists(true);
    } else {
      setLists((lists) => [
        ...lists,
        {
          title: listName,
          todo: [],
          user: {
            username: localStorage.getItem("username"),
          },
        },
      ]);
      toDoCreateList(listName).then((response) => {
        if (response.status === 400) {
          setListCreated(false);
          setShowToast(true);
        } else {
          setListCreated(true);
          setShowToast(false);
        }
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createNewList(newList.current.value);
      newList.current.value = "";
      newList.current.blur();
    }
  };

  const handleSelectedList = (list) => {
    selectedList(list);
    setSelectedListStyle(list);
  };

  const handleLogOut = () => {
    console.log("Not implemented yet");
  };

  return (
    <div className="bg-white w-full h-full menuLeftShadow">
      <CustomToast
        show={showToast}
        close={() => setShowToast(false)}
        notifi={
          (listCreated === false &&
            "There was an error creating the list, try again") ||
          (listExists && "List already exists, cant be created")
        }
        state={listCreated}
      />
      <div className="py-6 px-4 h-full flex flex-col">
        <section
          onClick={() => close(true)}
          className="w-full flex items-center cursor-pointer"
        >
          <ChevronLeftIcon className="w-8 text-mediumGray" />
          <p className="text-mediumGray font-thin">Close</p>
        </section>
        <section className="w-full flex mt-24 text-mediumGray flex-col">
          {lists.map((list) => (
            <div
              className={`flex w-full items-center ${
                selectedListStyle === list.title
                  ? "text-black"
                  : "text-mediumGray"
              }`}
              key={list.title}
              onClick={() => handleSelectedList(list)}
            >
              <DocumentIcon
                stroke={selectedListStyle === list.title ? "black" : "gray"}
              />
              <h2 className="truncate block">{list.title}</h2>
            </div>
          ))}
          <section className="flex mt-8">
            <PlusIcon className="w-6 text-blueColor" />
            <input
              className="ml-2 w-36 placeholder:text-blueColor font-thin placeholders"
              onKeyDown={handleKeyDown}
              ref={newList}
              placeholder="Create a new list"
            />
          </section>
        </section>
        <section className="w-full mt-auto">
          <h2 onClick={handleLogOut}>Log out</h2>
        </section>
      </div>
    </div>
  );
};

export default LeftMenu;
