import { useState, useRef } from "react";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { checkIfExists, defaultList } from "../helpers/functions";
import DocumentIcon from "../assets/icons/document-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateList, selectAList, setErrorState } from "../redux/todoSlice";

const LeftMenu = ({ close }) => {
  const lists = useSelector((state) => state.todoReducer.lists)
  const [selectedListStyle, setSelectedListStyle] = useState(
    defaultList[0].title
  );
  const newList = useRef(null);
  const dispatch = useDispatch()

  const createNewList = (listName) => {
    const listExists = checkIfExists(lists, listName);
    if (listExists) {
      dispatch(setErrorState({state: true, message:"The list already exists"}))
    } else {
      dispatch(fetchCreateList(listName))
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
    setSelectedListStyle(list.title);
    dispatch(selectAList(list))
  };

  const handleLogOut = () => {
    console.log("Not implemented yet");
  };

  return (
    <div className="bg-white w-full h-full shadow-lg">
      <div className="py-6 px-4 h-full flex flex-col menuLeftCounters">
        <section
          onClick={() => close(true)}
          className="w-full flex items-center cursor-pointer mt-4 ml-2 parentHoverBlack"
        >
          <ChevronLeftIcon className="w-6 text-mediumGray childHoverBlack transition-all duration-300 hover:rotate-180" />
          <p className="text-mediumGray font-thin childHoverBlack">Close</p>
        </section>
        <section className="w-full flex mt-24 text-mediumGray flex-col">
          {lists?.map((list) => (
            <div
              className={`flex w-full items-center menuLeftCounters ${
                selectedListStyle === list.title
                  ? "text-black"
                  : "text-mediumGray"
              }`}
              key={list.title}
              onClick={() => handleSelectedList(list)}
            >
              <div className="flex w-full items-center menuLeftListHovers py-2">
                <DocumentIcon
                  stroke={selectedListStyle === list.title ? "black" : "gray"}
                  className="mr-2 min-w-max"
                />
                <h2 className="truncate">{list.title}</h2>
              </div>
            </div>
          ))}
          <section className="flex mt-8">
            <PlusIcon className="w-6 ml-2 text-blueColor" />
            <input
              className="ml-2 w-36 placeholder:text-blueColor font-thin placeholders text-black"
              onKeyDown={handleKeyDown}
              ref={newList}
              placeholder="Create a new list"
            />
          </section>
        </section>
        <section className="w-full mt-auto mb-4 ml-3">
          <h2 onClick={handleLogOut}>Log out</h2>
        </section>
      </div>
    </div>
  );
};

export default LeftMenu;
