import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useMemo, useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import BackgroundImage from "../BackgroundImage"
import CompletedTasks from "../todo/CompletedTasks"
import LeftMenu from "../LeftMenu/LeftMenu"
import NewTask from "../todo/NewTask"
import ShowError from "../ShowError"
import Task from "./Task"
import DarkMode from "./DarkMode"
import FetchingProgressBar from "../FetchingProgressBar"

const ToDoComponent = ({ isMobileState, darkmode }) => {
  const username = useSelector((state) => state.userReducer.username)
  const lists = useSelector((state) => state.todoReducer.lists)
  const currentList = useSelector((state) => state.todoReducer.currentList)
  const [closeMenu, setCloseMenu] = useState(isMobileState ? true : false)

  const filteredTodo = useMemo(() => {
    return currentList?.todo?.filter((todo) => todo.completed === false)
  }, [currentList])

  useEffect(() => {
    if (isMobileState) {
      setCloseMenu(true)
    }
  }, [currentList])

  const handleCloseMenu = useCallback(() => {
    setCloseMenu(!closeMenu)
  }, [closeMenu])

  return (
    <div className="w-screen h-screen">
      <BackgroundImage />
      <ShowError />
      <div className="black-overlay w-full h-full flex z-10 relative">
        <div className="md:bg-secondGrayColor md:dark:bg-secondDarkColor w-full h-full md:w-4/5 md:h-90% m-auto flex">
          {!closeMenu && (
            <div className="w-full md:w-1/6 h-full flex absolute md:static">
              <LeftMenu closeMenu={handleCloseMenu} lists={lists} />
              {isMobileState && (
                <div className="black-overlay ml-auto w-2/4 z-10 h-screen"></div>
              )}
            </div>
          )}
          <div
            className={`h-full flex flex-col mx-auto overflow-y-scroll ${
              closeMenu ? "w-95% md:w-95%" : "w-95% md:w-3/4"
            }`}
          >
            <section className="flex items-center justify-evenly md:py-8 mt-6 py-4">
              {closeMenu ? (
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="w-6 text-mediumGray hover:text-black dark:hover:text-white transition-all duration-300 hover:rotate-180"
                    onClick={handleCloseMenu}
                  />
                  <h1 className="text-mediumGray">{currentList?.title}</h1>
                </div>
              ) : (
                <h1 className="text-mediumGray">{currentList?.title}</h1>
              )}
              <div className="mx-auto">
                <FetchingProgressBar width="100vw" />
              </div>
              <DarkMode username={username} darkmode={darkmode} />
            </section>
            <NewTask />
            <div>
              {filteredTodo?.map(
                (todo) =>
                  todo.completed === false && (
                    <Task
                      todo={{
                        title: currentList.title,
                        completed: todo.completed,
                        description: todo.description,
                      }}
                      key={todo.description}
                    />
                  )
              )}
            </div>
            <CompletedTasks
              tasks={currentList?.todo}
              currentList={currentList}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDoComponent
