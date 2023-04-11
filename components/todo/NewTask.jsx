import { useRef } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import useManageTasks from "../../hooks/useManageTasks"

const NewTask = () => {
  const currentList = useSelector((state) => state.todoReducer.currentList)
  const { handleCreateTask } = useManageTasks()
  const newTask = useRef(null)

  const handleNewTask = () => {
    const newTaskValue = newTask.current?.value
    newTask.current.value = ""
    newTask.current.blur()

    if (newTaskValue != "") {
      handleCreateTask(currentList, newTaskValue)
    }
  }

  const newTaskHandleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNewTask()
    }
  }

  return (
    <div className="w-full h-16 md:h-20 bg-white dark:bg-thirdDarkColor mx-auto shadow-md mb-4 rounded-md">
      <div className="w-full h-16 md:h-20 flex items-center group">
        <PlusIcon className="w-8 ml-4 text-blueColor group-hover:text-sky-700 " />
        <input
          className="ml-2 w-full pr-2 bg-transparent placeholder:text-blueColor group-hover:placeholder:text-sky-700 font-thin placeholders"
          onKeyDown={newTaskHandleKeyDown}
          ref={newTask}
          placeholder="Write to start adding a task..."
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
