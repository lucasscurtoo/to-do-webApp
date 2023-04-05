import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
  useCompleteOrDecompleteTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/api/tasks"

const Task = ({ todo }) => {
  const [taskDescription, setTaskDescription] = useState(todo?.description)
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [completeOrDecompleteTask] = useCompleteOrDecompleteTaskMutation()
  const { username } = useSelector((state) => state.userReducer)

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleTaskChange()
    }
  }

  const handleTaskChange = () => {
    if (todo.description != taskDescription) {
      updateTask({
        title: todo.title,
        completed: todo.completed,
        description: todo.description,
        newDescription: taskDescription,
        username,
      })
    }
  }
  const handleOnCheck = () => {
    completeOrDecompleteTask({
      title: todo.title,
      completed: todo.completed,
      description: todo.description,
      username,
    })
  }

  const handleDeleteTask = () => {
    deleteTask({
      title: todo.title,
      completed: todo.completed,
      description: todo.description,
      username,
    })
  }

  const handleTaskDescription = (event) => {
    setTaskDescription(event.target.value)
  }

  return (
    <div className="w-full h-16 md:h-20 md:min-h-20 bg-white dark:bg-thirdDarkColor mx-auto shadow-md mb-4">
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
          className="ml-4 w-full pr-2 bg-transparent dark:text-white dark:hover:text-mediumGray dark:focus:text-mediumGray text-mediumGray hover:text-black focus:text-black"
          placeholder={todo.description}
          value={taskDescription}
          onChange={handleTaskDescription}
          onKeyDown={handleEnter}
          onBlur={handleTaskChange}
        />
        <TrashIcon
          className="w-8 md:w-6 mr-8 text-errorColor hover:text-intenseErrorColor dark:text-softErrorColor dark:hover:text-errorColor"
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  )
}

export default Task
