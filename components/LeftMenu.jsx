import { useState, useRef, useEffect } from "react"
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline"
import { checkIfExists } from "../helpers/functions"
import DocumentIcon from "../assets/icons/document-icon.svg"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCreateList,
  fetchDeleteList,
  selectAList,
  setErrorState,
} from "../redux/todoSlice"
import DeleteMenu from "./DeleteMenu"
import { clearUserData, logOut } from "../redux/userSlice"
import { useRouter } from "next/router"

const LeftMenu = ({ close }) => {
  const lists = useSelector((state) => state.todoReducer.lists)
  const selectedList = useSelector((state) => state.todoReducer.selectedList)
  const darkMode = useSelector((state) => state.userReducer.darkmode)
  const [isMobileState, setIsMobileState] = useState(null)
  const newList = useRef(null)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const width = window.innerWidth
    const isMobile = width < 768 ? true : false
    if (isMobile) {
      setIsMobileState(true)
    }
  }, [])

  const createNewList = (listName) => {
    const listExists = checkIfExists(lists, listName)
    if (listExists) {
      dispatch(
        setErrorState({ state: true, message: "The list already exists" })
      )
    } else {
      dispatch(fetchCreateList(listName))
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
    dispatch(fetchDeleteList(listTitle))
    dispatch(selectAList(lists[0]))
  }

  const handleSelectedList = (list) => {
    dispatch(selectAList(list))
    if (isMobileState) {
      close(true)
    }
  }

  const handleLogOut = async () => {
    dispatch(logOut())
    dispatch(clearUserData())
    router.push("/")
  }

  return (
    <div className="bg-white dark:bg-primaryDarkColor w-2/4 md:w-full h-screen md:h-full shadow-lg absolute z-10 md:static">
      <div className="py-6 px-4 h-full flex flex-col menuLeftCounters">
        <section
          onClick={() => close(true)}
          className={`w-full flex items-center cursor-pointer mt-4 ml-2 ${
            darkMode ? "parentHoverWhite" : "parentHoverBlack"
          }`}
        >
          <ChevronLeftIcon className="w-6 text-mediumGray childHover transition-all duration-300 hover:rotate-180" />
          <p className="text-mediumGray font-thin childHover">Close</p>
        </section>
        <section className="w-full flex mt-12 md:mt-24 text-mediumGray flex-col">
          {lists?.map((list) => (
            <div
              className={`flex w-full items-center menuLeftCounters ${
                selectedList.title === list.title
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
                    selectedList.title === list.title
                      ? darkMode
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
          <h2 onClick={handleLogOut}>Log out</h2>
          <div className="ml-auto mr-3 relative"></div>
        </section>
      </div>
    </div>
  )
}

export default LeftMenu
