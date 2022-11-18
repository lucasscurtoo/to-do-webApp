import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useRedirect } from "../components/RedirectContext"
import LeftMenu from "../components/LeftMenu"
import { defaultList } from "../helpers/functions"
import Task from "../components/Tasks"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { useDarkMode } from "../components/DarkModeContext"

const ToDo = () => {
  const [closeState, setCloseState] = useState(false)
  const [list, setList] = useState(defaultList[0])
  const router = useRouter()
  const { setRedirect } = useRedirect()
  const { darkMode, setDarkMode } = useDarkMode()
  const [openCompleted, setOpenCompleted] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/")
      setRedirect(true)
    }
  }, [])

  console.log(list)

  const handleSelectedList = (list) => {
    setList(list)
  }

  return (
    <div className="w-screen h-screen bg-background1 bg-cover bg-no-repeat">
      <div className="black-overlay w-full h-full flex">
        <div className="bg-secondGrayColor w-4/5 h-90% m-auto flex">
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
            <Task itsNew={true} />
            {list.todo.map((task) => (
              <Task itsNew={false} todo={task} key={task.description} />
            ))}
            <div className="w-full">
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
              <div className="w-full border bg-black mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
