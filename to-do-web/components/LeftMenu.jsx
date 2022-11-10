import { useState, useRef, useEffect } from "react";
import {
  ChevronLeftIcon,
  DocumentDuplicateIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { checkIfExists, defaultList } from "../helpers/functions";
import { toDoCreateList, toDoGetLists } from "../api/toDo";
import CustomToast from "./CustomToast";

const LeftMenu = () => {
  const [lists, setLists] = useState(defaultList);
  const [showToast, setShowToast] = useState(false);
  const [listCreated, setListCreated] = useState();
  const [listExists, setListExists] = useState(false);
  const newList = useRef(null);

    useEffect(() => {
            toDoGetLists().then(response => {
                console.log(response)
                if (response.status === 200){
                    setLists(response.data)
                }
            })
    }, [])
    
  
  useEffect(() => {
    console.log(lists)
  }, [lists]);

  const createNewList = (listName) => {
    const listExists = checkIfExists(lists, listName)
    console.log(listExists)
      if (listExists) {
        setShowToast(true);
        setListExists(true);
      }else{
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
        console.log(response.status);
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
  return (
    <div className="bg-white w-1/6 h-full">
      <CustomToast
        show={showToast}
        close={() => setShowToast(false)}
        notifi={
         (listCreated === false && "There was an error creating the list, try again") ||
          (listExists && "List already exists, cant be created")
        }
        state={listCreated}
      />
      <div className="py-6 px-4 h-full flex flex-col">
        <section className="w-full flex items-center">
          <ChevronLeftIcon className="w-8 text-mediumGray" />
          <p className="text-mediumGray font-thin">Close</p>
        </section>
        <section className="w-full flex mt-24 text-[#5B5B5B] flex-col">
          {lists.map((list) => (
            <div className="flex w-full items-center" key={list.title}>
              <DocumentDuplicateIcon className="w-8 mr-4" />
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
          <h2>Log out</h2>
        </section>
      </div>
    </div>
  );
};

export default LeftMenu;
