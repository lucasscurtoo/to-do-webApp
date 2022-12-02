import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCreateTask, setErrorState } from "../redux/todoSlice"
import { PlusIcon } from "@heroicons/react/24/outline"
import CustomToast from "./CustomToast"

const NewTask = () => {
    const newTask = useRef(null)
    const tasks = useSelector((state) => state.todoReducer.tasks)
    const selectedList = useSelector((state) => state.todoReducer.selectedList)
    const dispatch = useDispatch()

    const handleNewTask = () => {
        const newTaskValue = newTask.current.value
        newTask.current.value = ""
        newTask.current.blur() 
        if (newTaskValue != "") {
          if (!tasks.some(elem => elem.description === newTaskValue)) {
              dispatch(fetchCreateTask({title: selectedList.title, completed: false, description: newTaskValue}))
          }else{
            dispatch(setErrorState({state: true, message:"This task already exists"}))
          }
        }
      }

      const newTaskHandleKeyDown = (event) => {
        if (event.key === "Enter") {
          handleNewTask(newTask.current.value)
        }
      }

  return (
    <div className="w-full h-20 bg-white mx-auto shadow-md mb-4">
      <div className="w-full h-20 flex items-center">
        <PlusIcon className="w-8 ml-4 text-blueColor" />
        <input
          className="ml-2 w-full pr-2 placeholder:text-blueColor font-thin placeholders"
          onKeyDown={newTaskHandleKeyDown}
          ref={newTask}
          placeholder="Add a task"
        />
        <button
          className="ml-auto mr-8 text-mediumGray py-1 px-5 border-2 border-blueColor text-xs rounded-sm hover:bg-blueColor hover:text-white"
          onClick={() => handleNewTask()}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default NewTask;
