import { memo, useRef } from "react"
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import LogOut from "../auth/LogOut"
import useListManagement from "../../hooks/useManageLists"
import List from "./List"

const LeftMenu = ({ closeMenu, lists }) => {
  const currentList = useSelector((state) => state.todoReducer.currentList)
  const darkmode = useSelector((state) => state.userReducer.darkmode)
  const { createNewList } = useListManagement()
  const newList = useRef(null)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createNewList(newList.current.value)
      newList.current.value = ""
      newList.current.blur()
    }
  }

  return (
    <div className="bg-white dark:bg-primaryDarkColor w-2/4 md:w-full h-screen md:h-full shadow-lg absolute z-50 md:static rounded-s-lg">
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
            <List
              key={list.title}
              currentList={currentList}
              list={list}
              darkmode={darkmode}
              onClose={closeMenu}
            />
          ))}
          <section className="flex mt-8 group">
            <PlusIcon className="w-6 ml-2 text-blueColor group-hover:text-sky-700" />
            <input
              className="ml-2 w-36 bg-transparent placeholder:text-blueColor group-hover:placeholder:text-sky-700 font-thin placeholders text-black dark:text-white"
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

export default memo(LeftMenu)
