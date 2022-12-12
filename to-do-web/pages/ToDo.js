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
import { fetchGetLists } from "../redux/todoSlice"
import { setRedirectState } from "../redux/userSlice"
import NewTask from "../components/NewTask"

const ToDo = () => {
  const [closeState, setCloseState] = useState(false)
  const selectedList = useSelector((state) => state.todoReducer.selectedList)
  const tasks = useSelector((state) => state.todoReducer.tasks)
  const completedTasks = useSelector((state) => state.todoReducer.completedTasks)
  const [showToast, setShowToast] = useState(false)
  // const [list, setList] = useState(defaultList[0])
  const [openCompleted, setOpenCompleted] = useState(false)
  const error = useSelector((state) => state.todoReducer.error)
  const router = useRouter()
  // const { setRedirect } = useRedirect()
  // const { darkMode, setDarkMode } = useDarkMode()
  const darkMode = false
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/")
      dispatch(setRedirectState(true))
    }
    dispatch(fetchGetLists())
  }, [])

  useEffect(() => {
    setOpenCompleted(false)
  }, [selectedList])
  
  useEffect(() => {
    error !== null && 
      setShowToast(true)
  }, [error])
  

  return (
    <div className="w-screen h-screen background1 bg-cover bg-no-repeat">
       {error !== null &&
        <CustomToast
            show={showToast}
            close={() => setShowToast(false)}
            notifi={error.state && error.message}
            state={!error.state}
            />}
      <div className="black-overlay w-full h-full flex">
        <div className="bg-secondGrayColor w-4/5 h-90% m-auto flex">
          {!closeState && (
            <div className="w-1/6 h-full">
              <LeftMenu
                close={setCloseState}
              />
            </div>
          )}
          <div
            className={`h-full flex flex-col mx-auto overflow-y-scroll ${
              closeState ? "w-5/6" : "w-3/4"
            }`}
          >
            <section className="flex items-center py-10 mt-6">
              {closeState ? (
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="w-6 text-mediumGray hover:text-black transition-all duration-300 hover:rotate-180"
                    onClick={() => setCloseState(!closeState)}
                  />
                  <h1 className="text-mediumGray">{selectedList?.title}</h1>
                </div>
              ) : (
                <h1 className="text-mediumGray">{selectedList?.title}</h1>
              )}
              {darkMode === true ? (
                <SunIcon
                  className="ml-auto w-8 text-mediumGray hover:text-white"
                  onClick={() => setDarkMode(!darkMode)}
                />
              ) : (
                <MoonIcon
                  className="ml-auto w-8 text-mediumGray hover:text-black"
                  onClick={() => setDarkMode(!darkMode)}
                />
              )}
            </section>
            <NewTask/>
            {tasks?.map(
              (todo) =>
                todo.completed === false && (
                  <Task
                    itsNew={false}
                    todo={{title: selectedList.title, completed:todo.completed, description: todo.description}}
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
              </section>
              <div className="w-full border bg-mediumGray mt-6 mb-2"></div>
              {openCompleted &&
                completedTasks.length > 0 &&
                completedTasks.map((todo) => (
                  <Task
                    itsNew={false}
                    todo={todo}
                    key={todo.description}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
