import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useRedirect } from "../components/RedirectContext"
import LeftMenu from "../components/LeftMenu"
import { checkIfExists, defaultList, getUnique } from "../helpers/functions"
import Task from "../components/Tasks"
import { ChevronUpIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useDarkMode } from "../components/DarkModeContext"
import CustomToast from "../components/CustomToast"

const ToDo = () => {
  const [closeState, setCloseState] = useState(false)
  const [list, setList] = useState(defaultList[0])
  const [openCompleted, setOpenCompleted] = useState(false)
  const [tasks, setTasks] = useState(list.todo)
  const [completedTask, setCompletedTask] = useState([])
  const [showToast, setShowToast] = useState(false);
  const [repeatedTask, setRepeatedTask] = useState(false)
  const router = useRouter()
  const { setRedirect } = useRedirect()
  const { darkMode, setDarkMode } = useDarkMode()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/")
      setRedirect(true)
    }
  }, [])

  useEffect(() => {
    list.todo.map((task) =>
      task.completed === false
        ? setTasks((prevState) => getUnique([...prevState, task]))
        : setCompletedTask((prevState) => [...prevState, task])
    )
  }, [list])

  useEffect(() => {
    (tasks, completedTask)
  }, [tasks,completedTask])

  const handleSelectedList = (incominglist) => {
    setList(incominglist)
  }

  const handleCompleted = (value) => {
    ("completed", value)
    ('TASKS',tasks)
    //manejar aca cuando llamar a uno y cuando llamar al otro
    if (!tasks.some(currentTask => currentTask.description === value.description)) {
      handleTasks(value)
    }
    handleCompletedTasks(value)
  }

  const handleCompletedTasks = (value) => {
    completedTask.map(compTask => {
      if (compTask.description === value) {
        setCompletedTask((current) => current.filter(compTask => compTask.description !== value))
        setTasks((prevState) => getUnique([...prevState, compTask]))
        compTask.completed = false
      }
    })
  }

  const handleTasks = (value) => {
    tasks.map(task => { 
      if (task.description === value) {
          setCompletedTask((prevState) => getUnique([...prevState, task]))
          setTasks((current) => 
           current.filter(task => task.description !== value))
          task.completed = true
        }
     })
  }

  const handleNewTask = (values) => {
    if (!tasks.some(currentTask => currentTask.description === values.description)) {
      ('hola')
      setTasks((prevState) => getUnique([...prevState, values]))
      setRepeatedTask(false)
    }else{
      setRepeatedTask(true)
      setShowToast(true)
    }
  }

  return (
    <div className="w-screen h-screen bg-background1 bg-cover bg-no-repeat">
      <CustomToast
        show={showToast}
        close={() => setShowToast(false)}
        notifi={repeatedTask && "This task already exists"}
        state={!repeatedTask}
      />
      <div className="black-overlay w-full h-full flex">
        <div className="bg-secondGrayColor w-4/5 h-90% m-auto flex overflow-y-scroll">
          <div className="w-1/6 h-full">
            {!closeState && (
              <LeftMenu
                close={setCloseState}
                selectedList={handleSelectedList}
              />
            )}
          </div>
          <div className="w-3/4 h-full flex flex-col mx-auto">
            <section className="flex items-center py-10 mt-6">
              <h1 className="text-mediumGray">{list.title}</h1>
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
            <Task itsNew={true} createTask={handleNewTask}/>
            {tasks.map(todo => todo.completed === false &&
              <Task itsNew={false} todo={todo} key={todo.description} completed={handleCompleted} />
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
              <div className="w-full border bg-mediumGray mt-6"></div>
              {(openCompleted && completedTask.length > 0 )&& completedTask.map(todo => <Task itsNew={false} todo={todo} key={todo.description} completed={handleCompleted} />) }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
