import { useState, useRef, useEffect } from "react"
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline"
import { checkIfExists } from "../helpers/functions"
import DocumentIcon from "../assets/icons/document-icon.svg"
import { useDispatch, useSelector } from "react-redux"
import { selectAList } from "../redux/reducers/todoSlice"
import DeleteMenu from "./DeleteMenu"
import {
  useCreateUserListMutation,
  useDeleteUserListMutation,
} from "../redux/api/lists"
import LogOut from "./LogOut"
import { useIsMobile } from "../hooks/useIsMobile"

const LeftMenu = ({ closeMenu }) => {
  const lists = useSelector((state) => state.todoReducer.lists)
  const currentList = useSelector((state) => state.todoReducer.currentList)
  const { darkmode, username } = useSelector((state) => state.userReducer)
  const [createUserList] = useCreateUserListMutation()
  const [deleteUserList] = useDeleteUserListMutation()
  const { isMobileState } = useIsMobile()
  const newList = useRef(null)
  const dispatch = useDispatch()

  const createNewList = (listName) => {
    const listExists = checkIfExists(lists, listName)
    if (listExists) {
      dispatch(
        setErrorState({ state: true, message: "The list already exists" })
      )
    } else {
      createUserList({ title: listName, username })
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createNewList(newList.current.value)
      newList.current.value = ""
      newList.current.blur()
    }
  }

  const handleDeleteList = (listTitle) => {
    deleteUserList({ title: listTitle, username })
    dispatch(selectAList(lists[0]))
  }

  const handleSelectedList = (list) => {
    dispatch(selectAList(list))
    if (isMobileState) {
      closeMenu()
    }
  }

  console.log(darkmode)

  return (
    <div className="bg-white dark:bg-primaryDarkColor w-2/4 md:w-full h-full md:h-full shadow-lg absolute z-10 md:static">
      <div className="py-6 px-4 h-full flex flex-col menuLeftCounters">
        <section
          onClick={closeMenu}
          className={`w-full flex items-center cursor-pointer mt-4 ml-2 ${
            darkmode ? "parentHoverWhite" : "parentHoverBlack"
          }`}
        >
          <ChevronLeftIcon className="w-6 text-mediumGray childHover transition-all duration-300 hover:rotate-180" />
          <p className="text-mediumGray font-thin childHover">Close</p>
        </section>
        <section className="w-full flex mt-12 md:mt-24 text-mediumGray flex-col">
          {lists?.map((list) => (
            <div
              className={`flex w-full items-center menuLeftCounters ${
                currentList?.title === list.title
                  ? "text-black dark:text-white"
                  : "text-mediumGray"
              }`}
              key={list.title}
              onClick={() => handleSelectedList(list)}
            >
              <div className="flex w-full items-center menuLeftListHovers py-2 relative">
                <DeleteMenu onClick={() => handleDeleteList(list.title)} />
                <DocumentIcon
                  stroke={
                    currentList?.title === list.title
                      ? darkmode
                        ? "white"
                        : "black"
                      : "gray"
                  }
                  className="mr-2 md:min-w-max"
                />
                <h2 className="truncate">{list.title}</h2>
              </div>
            </div>
          ))}
          <section className="flex mt-8">
            <PlusIcon className="w-6 ml-2 text-blueColor" />
            <input
              className="ml-2 w-36 bg-transparent placeholder:text-blueColor font-thin placeholders text-black dark:text-white"
              onKeyDown={handleKeyDown}
              ref={newList}
              placeholder="Create a new list"
            />
          </section>
        </section>
        <section className="w-full mt-auto mb-4 pl-3">
          <LogOut />
        </section>
      </div>
    </div>
  )
}

export default LeftMenu
