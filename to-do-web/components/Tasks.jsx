import { useRef, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"

const Task = ({ itsNew, todo, completed, createTask}) => {
  const newTask = useRef(null)
  const [taskDescription, setTaskDescription] = useState(todo?.description)

  const createNewTask = () => {
    if (newTask.current.value != "") {
      const task = {
        completed:false,
        description: newTask.current.value
      }
      createTask(task)
    }
  }

  const newTaskHandleKeyDown = (event) => {
    if (event.key === "Enter") {
      createNewTask(newTask.current.value)
      newTask.current.value = ""
      newTask.current.blur()
    }
  }

  const handleTaskChange = (event) => {
    if (event.key === "Enter") {
      
    }
    //que cuando le das enter mande al back que esa tarea cambio 
  }
  const handleOnCheck = (task) => {
    completed(task)
  }

  return (
    <div className="w-full h-20 bg-white mx-auto shadow-md my-2">
      {itsNew ? (
        <div className="w-full h-full flex items-center">
          <PlusIcon className="w-8 ml-4 text-blueColor" />
          <input
            className="ml-2 w-36 placeholder:text-blueColor font-thin placeholders"
            onKeyDown={newTaskHandleKeyDown}
            ref={newTask}
            placeholder="Add a task"
          />
          <button className="ml-auto mr-8 text-mediumGray py-1 px-5 border-2 border-blueColor text-xs rounded-sm hover:bg-blueColor hover:text-white" onClick={() => createNewTask()}>
            Add
          </button>
        </div>
      ) : (
          <div className="w-full h-20 bg-white mx-auto shadow-md mb-4">
            <div className="w-full h-full flex items-center">
              <label className="checkboxRound-contain ml-4 flex items-center h-7">
                
                {todo.completed ? <input
                  type="checkbox"
                  checked
                  onChange={() => handleOnCheck(todo.description)}
                  />
                  :
                  <input
                  type="checkbox"
                  onChange={() => handleOnCheck(todo.description)}
                  />}
                  <div className="checkboxRound-input"></div>
                </label>  
                <input  type='text' className="ml-4 text-mediumGray hover:text-black focus:text-black" placeholder={todo.description} value={taskDescription}
                 onChange={(e) => setTaskDescription(e.value)}
                 onKeyDown={handleTaskChange}
                 onBlur={handleTaskChange}
                 />
            </div>
          </div>
      )}
    </div>
  )
}

export default Task
