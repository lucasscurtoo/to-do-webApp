import { memo } from "react"
import DeleteMenu from "../LeftMenu/DeleteMenu"

const ListItem = ({ isSelected, children, onClick, onDelete }) => {
  const textColor = isSelected
    ? "text-black dark:text-white"
    : "text-mediumGray"

  return (
    <div
      className={`flex w-full items-center menuLeftCounters ${textColor}`}
      onClick={onClick}
    >
      <div className="flex w-full items-center menuLeftListHovers py-2 relative">
        <DeleteMenu onClick={onDelete} />
        {children}
      </div>
    </div>
  )
}

export default memo(ListItem)
