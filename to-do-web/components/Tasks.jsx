import { useRef } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"

const Task = ({ itsNew, todo }) => {
  const newTask = useRef(null)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createNewTask(newTask.current.value)
      newTask.current.value = ""
      newTask.current.blur()
    }
  }

  const handleOnCheck = (task) => {
    console.log("checked", task)
  }

  return (
    <div className="w-full h-20 bg-white mx-auto shadow-md mb-6">
      {itsNew ? (
        <div className="w-full h-full flex items-center">
          <PlusIcon className="w-8 text-blueColor" />
          <input
            className="ml-2 w-36 placeholder:text-blueColor font-thin placeholders"
            onKeyDown={handleKeyDown}
            ref={newTask}
            placeholder="Add a task"
          />
          <button className="ml-auto mr-8 text-mediumGray py-1 px-5 border-2 border-blueColor text-xs rounded-sm hover:bg-blueColor hover:text-white">
            Add
          </button>
        </div>
      ) : (
          <div className="w-full h-20 bg-white mx-auto shadow-md mb-4">
            <div className="w-full h-full flex items-center">
              <label className="checkboxRound-contain ml-4 flex items-center h-7">
                <span className="ml-4">{todo.description}</span>
                <input
                  type="checkbox"
                  onChange={() => handleOnCheck(todo.description)}
                  />
                  <div className="checkboxRound-input"></div>
                </label>  
            </div>
          </div>
      )}
    </div>
  )
}

export default Task
