import { useRef } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux"
import { useCreateTaskMutation } from "../redux/api/tasks"

const NewTask = () => {
  const currentList = useSelector((state) => state.todoReducer.currentList)
  const { username } = useSelector((state) => state.userReducer)
  const [createNewTask] = useCreateTaskMutation()
  const dispatch = useDispatch()
  const newTask = useRef(null)

  const handleNewTask = () => {
    const newTaskValue = newTask.current.value
    newTask.current.value = ""
    newTask.current.blur()

    if (newTaskValue != "") {
      if (!currentList.todo.some((elem) => elem.description === newTaskValue)) {
        createNewTask({
          title: currentList.title,
          completed: false,
          description: newTaskValue,
          username,
        })
      } else {
        dispatch(
          setErrorState({ state: true, message: "This task already exists" })
        )
      }
    }
  }

  const newTaskHandleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNewTask(newTask.current.value)
    }
  }

  return (
    <div className="w-full h-16 md:h-20 bg-white dark:bg-thirdDarkColor mx-auto shadow-md mb-4">
      <div className="w-full h-16 md:h-20 flex items-center">
        <PlusIcon className="w-8 ml-4 text-blueColor" />
        <input
          className="ml-2 w-full pr-2 bg-transparent placeholder:text-blueColor font-thin placeholders"
          onKeyDown={newTaskHandleKeyDown}
          ref={newTask}
          placeholder="Add a task"
        />
        <button
          className="ml-auto mr-8 text-mediumGray py-1 px-5 border-2 border-blueColor text-xs rounded-sm hover:bg-blueColor hover:text-white"
          onClick={handleNewTask}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default NewTask
