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
import { setRedirected, clearUserData } from "../redux/reducers/userSlice"
import NewTask from "../components/NewTask"
import { useTheme } from "next-themes"
import { useGetUserListsQuery } from "../redux/api/lists"
import {
  useGetUserDarkModeQuery,
  useUpdateUserDarkModeMutation,
} from "../redux/api/users"
import CompletedTasks from "../components/CompletedTasks"

const ToDo = () => {
  const [closeState, setCloseState] = useState(false)
  const selectedList = useSelector((state) => state.todoReducer.selectedList)
  const tasks = useSelector((state) => state.todoReducer.tasks)
  const { setTheme } = useTheme()
  const [showToast, setShowToast] = useState(false)

  const [errorState, setErrorState] = useState(false)
  const router = useRouter()
  const { username, isLoggedIn, darkmode } = useSelector(
    (state) => state.userReducer
  )
  const [isMobileState, setIsMobileState] = useState(null)
  const dispatch = useDispatch()
  const [updateDarkmode] = useUpdateUserDarkModeMutation()
  useGetUserListsQuery(username)
  useGetUserDarkModeQuery(username)

  useEffect(() => {
    if (!isLoggedIn || username === null) {
      router.push("/")
      dispatch(setRedirected(true))
      dispatch(clearUserData())
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
    setTheme(darkmode ? "dark" : "light")
  }, [darkmode])

  const handledarkmode = () => {
    updateDarkmode({ username, darkmode: !darkmode })
  }

  return (
    <div className="w-screen h-screen background1 bg-cover bg-no-repeat">
      {errorState !== null && (
        <CustomToast
          show={showToast}
          close={() => setShowToast(false)}
          notifi={errorState.state && errorState.message}
          state={!errorState.state}
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
              {darkmode ? (
                <SunIcon
                  className="ml-auto w-8 text-mediumGray hover:text-white"
                  onClick={handledarkmode}
                />
              ) : (
                <MoonIcon
                  className="ml-auto w-8 text-mediumGray hover:text-black"
                  onClick={handledarkmode}
                />
              )}
            </section>
            <NewTask />
            <div>
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
            </div>
            <CompletedTasks tasks={tasks} selectedList={selectedList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
