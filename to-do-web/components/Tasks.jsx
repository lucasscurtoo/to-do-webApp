import { useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const Task = ({ itsNew }) => {
    const newTask = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          createNewTask(newTask.current.value);
          newTask.current.value = "";
          newTask.current.blur();
        }
      };
    
  return (
    <div className="w-90% h-20 bg-white mx-auto shadow-md">
      {itsNew ? (
        <div className="w-full h-full flex items-center">
          <PlusIcon className="w-8 text-blueColor mx-4" />
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
        <div>

        </div>
      )}
    </div>
  );
};

export default Task;
