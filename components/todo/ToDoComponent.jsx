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

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu)
  }

  return (
    <div className="w-screen h-screen">
      <BackgroundImage />
      <ShowError />
      <div className="black-overlay w-full h-full flex z-10 relative">
        <div className="md:bg-secondGrayColor md:dark:bg-secondDarkColor w-full h-full md:w-4/5 md:h-90% m-auto flex rounded-lg select-none">
          {!closeMenu && (
            <div className="w-full md:w-1/3 lg:w-1/6 h-full flex absolute md:static">
              <LeftMenu closeMenu={handleCloseMenu} lists={lists} />
              {isMobileState && (
                <div className="black-overlay ml-auto w-2/4 z-10 h-screen"></div>
              )}
            </div>
          )}
          <div
            className={`h-full flex flex-col mx-auto px-2 ${
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
                  <div className="flex space-x-2">
                    <h1 className="text-black dark:text-white">List:/n</h1>
                    <h2 className="text-mediumGray">{currentList?.title}</h2>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <h1 className="text-black dark:text-white">List:</h1>
                  <h2 className="text-mediumGray">{currentList?.title}</h2>
                </div>
              )}
              <div className="mx-auto">
                <FetchingProgressBar width="100vw" />
              </div>
              <DarkMode username={username} darkmode={darkmode} />
            </section>
            <div className="w-full h-full overflow-y-scroll">
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
    </div>
  )
}

export default ToDoComponent
