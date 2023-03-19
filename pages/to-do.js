import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import LeftMenu from "../components/LeftMenu"
import Task from "../components/Tasks"
import {
  ChevronRightIcon,
  ChevronUpIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import CustomToast from "../components/CustomToast"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetLists } from "../redux/reducers/todoSlice"
import {
  fetchGetUserDarkMode,
  fetchUpdateUserDarkMode,
  setRedirected,
  clearUserData,
} from "../redux/reducers/userSlice"
import NewTask from "../components/NewTask"
import { useTheme } from "next-themes"

const ToDo = () => {
  const [closeState, setCloseState] = useState(false)
  const selectedList = useSelector((state) => state.todoReducer.selectedList)
  const tasks = useSelector((state) => state.todoReducer.tasks)
  const completedTasks = useSelector(
    (state) => state.todoReducer.completedTasks
  )
  const { setTheme } = useTheme()
  const [showToast, setShowToast] = useState(false)
  const [openCompleted, setOpenCompleted] = useState(false)
  const error = useSelector((state) => state.todoReducer.error)
  const router = useRouter()
  const darkMode = useSelector((state) => state.userReducer.darkmode)
  const [isMobileState, setIsMobileState] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/")
      dispatch(setRedirected(true))
      dispatch(clearUserData())
    } else {
      dispatch(fetchGetLists())
      dispatch(fetchGetUserDarkMode())
    }
  }, [])

  useEffect(() => {
    const width = window.innerWidth
    const isMobile = width < 768 ? true : false
    if (isMobile) {
      setCloseState(true)
      setIsMobileState(true)
    }
  }, [])

  useEffect(() => {
    setOpenCompleted(false)
  }, [selectedList])

  useEffect(() => {
    error !== null && setShowToast(true)
    //error cahnged?
  }, [error])

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light")
  }, [darkMode])

  const handleDarkMode = () => {
    dispatch(fetchUpdateUserDarkMode(!darkMode))
  }

  return (
    <div className="w-screen h-screen background1 bg-cover bg-no-repeat">
      {error !== null && (
        <CustomToast
          show={showToast}
          close={() => setShowToast(false)}
          notifi={error.state && error.message}
          state={!error.state}
        />
      )}
      <div className="black-overlay w-full h-full flex">
        <div className="md:bg-secondGrayColor md:dark:bg-secondDarkColor w-full h-full md:w-4/5 md:h-90% m-auto flex">
          {!closeState && (
            <div className="w-full md:w-1/6 h-full flex absolute md:static">
              <LeftMenu close={setCloseState} />
              {isMobileState && (
                <div className="black-overlay ml-auto w-2/4 z-10 h-screen"></div>
              )}
            </div>
          )}
          <div
            className={`h-full flex flex-col mx-auto overflow-y-scroll ${
              closeState ? "w-95% md:w-95%" : "w-95% md:w-3/4"
            }`}
          >
            <section className="flex items-center md:py-8 mt-6 py-4">
              {closeState ? (
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="w-6 text-mediumGray hover:text-black dark:hover:text-white transition-all duration-300 hover:rotate-180"
                    onClick={() => setCloseState(!closeState)}
                  />
                  <h1 className="text-mediumGray">{selectedList?.title}</h1>
                </div>
              ) : (
                <h1 className="text-mediumGray">{selectedList?.title}</h1>
              )}
              {darkMode ? (
                <SunIcon
                  className="ml-auto w-8 text-mediumGray hover:text-white"
                  onClick={handleDarkMode}
                />
              ) : (
                <MoonIcon
                  className="ml-auto w-8 text-mediumGray hover:text-black"
                  onClick={handleDarkMode}
                />
              )}
            </section>
            <NewTask />
            {tasks?.map(
              (todo) =>
                todo.completed === false && (
                  <Task
                    todo={{
                      title: selectedList.title,
                      completed: todo.completed,
                      description: todo.description,
                    }}
                    key={todo.description}
                  />
                )
            )}
            <div className="w-full mt-4">
              <section className="flex">
                <h2 className="text-blueColor">Completed</h2>
                <ChevronUpIcon
                  className="w-6 ml-2 text-blueColor transition-all	"
                  onClick={() => setOpenCompleted(!openCompleted)}
                  style={{
                    transition: "transform 200ms linear",
                    transform: `rotateZ(${openCompleted ? 0 : "180deg"})`,
                    display: "inline-block",
                  }}
                />
                <p className="pl-2 text-blueColor">{completedTasks.length}</p>
              </section>
              <div className="w-full border bg-mediumGray mt-6 mb-2"></div>
              {openCompleted &&
                completedTasks.length > 0 &&
                completedTasks.map((todo) => (
                  <Task
                    todo={{
                      title: selectedList.title,
                      completed: todo.completed,
                      description: todo.description,
                    }}
                    key={todo.description}
                  />
                ))}
              {completedTasks.length === 0 && (
                <p className="text-mediumGray dark:text-darkGray pt-2">
                  Theres no completed tasks yet, go, complete one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
