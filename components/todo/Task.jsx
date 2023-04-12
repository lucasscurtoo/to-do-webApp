import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import { useState } from "react"
import useManageTasks from "../../hooks/useManageTasks"

const Task = ({ todo }) => {
  const [taskDescription, setTaskDescription] = useState(todo?.description)
  const { handleDeleteTask, handleOnCheck, handleTaskChange } =
    useManageTasks(todo)

  const handleTaskDescription = (event) => {
    setTaskDescription(event.target.value)
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleTaskChange(event)
    }
  }

  return (
    <div className="w-full h-16 md:h-20 md:min-h-20 bg-white dark:bg-thirdDarkColor mx-auto shadow-md mb-4 rounded-md">
      <div className="w-full h-full flex items-center ">
        <label className="checkboxRound-contain ml-4 flex items-center h-7">
          {todo.completed ? (
            <input type="checkbox" checked onChange={handleOnCheck} />
          ) : (
            <input type="checkbox" onChange={handleOnCheck} />
          )}
          <div className="checkboxRound-input"></div>
        </label>
        <input
          type="text"
          className="ml-4 w-full pr-2 bg-transparent placeholder:select-none dark:text-white dark:hover:text-mediumGray dark:focus:text-mediumGray text-mediumGray hover:text-black focus:text-black"
          placeholder={todo.description}
          value={taskDescription}
          onChange={handleTaskDescription}
          onKeyDown={handleEnter}
          onBlur={handleTaskChange}
        />
        <TrashIcon
          className="w-8 md:w-6 mr-8 text-errorColor cursor-pointer hover:text-amber-900 dark:text-softErrorColor dark:hover:text-errorColor"
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  )
}

export default Task
