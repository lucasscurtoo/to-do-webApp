import { TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  useCompleteOrDecompleteTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../redux/api/tasks"
import { setErrorState } from "../redux/reducers/todoSlice"

const Task = ({ todo }) => {
  const [taskDescription, setTaskDescription] = useState(todo?.description)
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [completeOrDecompleteTask] = useCompleteOrDecompleteTaskMutation()
  const [errorState, setErrorState] = useState({})
  const { username } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

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
    } else {
      setErrorState({
        state: true,
        message: "Can not update the same task description",
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

  return (
    <div className="w-full h-16 md:h-20 md:min-h-20 bg-white dark:bg-thirdDarkColor mx-auto shadow-md mb-4">
      <div className="w-full h-full flex items-center ">
        <label className="checkboxRound-contain ml-4 flex items-center h-7">
          {todo.completed ? (
            <input
              type="checkbox"
              checked
              onChange={() => handleOnCheck(todo)}
            />
          ) : (
            <input type="checkbox" onChange={() => handleOnCheck(todo)} />
          )}
          <div className="checkboxRound-input"></div>
        </label>
        <input
          type="text"
          className="ml-4 w-full pr-2 bg-transparent dark:text-white dark:hover:text-mediumGray dark:focus:text-mediumGray text-mediumGray hover:text-black focus:text-black"
          placeholder={todo.description}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
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
