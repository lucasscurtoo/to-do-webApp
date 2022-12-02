import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchUpdateTask, handleCompletedOrDecompletedTask, setErrorState } from "../redux/todoSlice"

const Task = ({todo}) => {
  const [taskDescription, setTaskDescription] = useState(todo?.description)
  const dispatch = useDispatch()

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleTaskChange()
    }
  }

  const handleTaskChange = () => {
    if (todo.description != taskDescription) {
      console.log('description', todo.description, 'newDesc', taskDescription)
      dispatch(fetchUpdateTask({title: todo.title, completed: todo.completed, description: todo.description, newDescription: taskDescription}))
    }else{
      dispatch(setErrorState({state: true, message:"Can not update the same task description"}))
    }
  }
  const handleOnCheck = (task) => {
    dispatch(handleCompletedOrDecompletedTask(task))
    }

  return ( 
          <div className="w-full h-20 min-h-20 bg-white mx-auto shadow-md mb-4">
            <div className="w-full h-full flex items-center">
              <label className="checkboxRound-contain ml-4 flex items-center h-7">
                {todo.completed ? <input
                  type="checkbox"
                  checked
                  onChange={() => handleOnCheck(todo)}
                  />
                  :
                  <input
                  type="checkbox"
                  onChange={() => handleOnCheck(todo)}
                  />}
                  <div className="checkboxRound-input"></div>
                </label>  
                <input  type='text' className="ml-4 w-full pr-2 text-mediumGray hover:text-black focus:text-black" placeholder={todo.description} 
                 value={taskDescription}
                 onChange={(e) => setTaskDescription(e.target.value)}
                 onKeyDown={handleEnter}
                 onBlur={handleTaskChange}
                 />
            </div>
          </div>
  )
}

export default Task
