import { ChevronUpIcon } from "@heroicons/react/24/outline"
import { memo, useMemo, useState } from "react"
import Task from "./Task"

const CompletedTasks = ({ tasks, currentList }) => {
  const [openCompleted, setOpenCompleted] = useState(true)
  const completedTasks = useMemo(() => {
    return tasks.filter((todo) => todo.completed === true)
  }, [tasks])

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
        <p className="pl-2 text-blueColor">{completedTasks.length}</p>
      </section>
      <div className="w-full border bg-mediumGray mt-6 mb-2"></div>
      {openCompleted &&
        completedTasks.map((task) => (
          <Task
            key={task.description}
            todo={{
              title: currentList.title,
              completed: task.completed,
              description: task.description,
            }}
          />
        ))}
      {!completedTasks.length && (
        <p className="text-mediumGray dark:text-darkGray pt-2">
          Theres no completed tasks yet, go, complete one!
        </p>
      )}
    </div>
  )
}

export default memo(CompletedTasks)
