import { useDispatch, useSelector } from "react-redux"
import {
  useCompleteOrDecompleteTaskMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../redux/api/tasks"
import setErrorState from "../redux/reducers/todoSlice"

const useManageTasks = (todo) => {
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [createNewTask] = useCreateTaskMutation()
  const [completeOrDecompleteTask] = useCompleteOrDecompleteTaskMutation()
  const username = useSelector((state) => state.userReducer.username)
  const dispatch = useDispatch()

  const handleCreateTask = (currentList, newTaskDesc) => {
    if (!currentList.todo.some((elem) => elem.description === newTaskDesc)) {
      createNewTask({
        title: currentList.title,
        completed: false,
        description: newTaskDesc,
        username,
      })
    } else {
      dispatch(
        setErrorState({ state: true, message: "This task already exists" })
      )
    }
  }

  const handleTaskChange = (event) => {
    const newDescription = event.target.value
    if (todo.description != newDescription) {
      updateTask({
        title: todo.title,
        completed: todo.completed,
        description: todo.description,
        newDescription,
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

  return {
    handleTaskChange,
    handleOnCheck,
    handleDeleteTask,
    handleCreateTask,
  }
}

export default useManageTasks
