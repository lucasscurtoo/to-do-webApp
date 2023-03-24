import { ChevronUpIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Task from "./Tasks"

const CompletedTasks = ({ tasks, selectedList }) => {
  const [openCompleted, setOpenCompleted] = useState(false)

  return (
    <div className="w-full mt-4">
      <section className="flex">
        <h2 className="text-blueColor">Completed</h2>
        <ChevronUpIcon
          className="w-6 ml-2 text-blueColor transition-all	"
          onClick={() => setOpenCompleted(!openCompleted)}
          style={{
            transition: "transform 200ms linear",
            transform: `rotateZ(${openCompleted ? 0 : "180deg"})`,
            display: "inline-block",
          }}
        />
        <p className="pl-2 text-blueColor">
          {
            tasks.reduce((number, task) => {
              task.completed === true && number.push(task)
              return number
            }, []).length
          }
        </p>
      </section>
      <div className="w-full border bg-mediumGray mt-6 mb-2"></div>
      {openCompleted &&
        tasks?.map(
          (todo) =>
            todo.completed === true && (
              <Task
                todo={{
                  title: selectedList.title,
                  completed: todo.completed,
                  description: todo.description,
                }}
                key={todo.description}
              />
            )
        )}
      {tasks.map((task) => task.completed).length === 0 && (
        <p className="text-mediumGray dark:text-darkGray pt-2">
          Theres no completed tasks yet, go, complete one!
        </p>
      )}
    </div>
  )
}

export default CompletedTasks
