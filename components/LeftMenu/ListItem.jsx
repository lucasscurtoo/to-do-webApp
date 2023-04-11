import { memo } from "react"
import OptionsMenu from "./OptionsMenu"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"

const ListItem = ({ className, children, onClick, onDelete, onRename }) => {
  return (
    <div
      className={`items-center flex w-full  menuLeftListHovers ${className}`}
    >
      <div className="flex w-full items-center py-2" onClick={onClick}>
        {children}
      </div>
      <OptionsMenu onDelete={onDelete} onRename={onRename}>
        <EllipsisHorizontalIcon className="w-8 ml-auto mr-4 hover:text-gray-800 cursor-pointer hover:dark:text-gray-100" />
      </OptionsMenu>
    </div>
  )
}

export default memo(ListItem)
