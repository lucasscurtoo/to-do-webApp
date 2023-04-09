import { memo, useState } from "react"
import OptionsMenu from "./OptionsMenu"
import { useMenuState } from "@szhsin/react-menu"
import { useIsMobile } from "../../hooks/useIsMobile"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"

const ListItem = ({ isSelected, children, onClick, onDelete, onRename }) => {
  const textColor = isSelected
    ? "text-black dark:text-white"
    : "text-mediumGray"

  return (
    <div className={`items-center flex w-full ${textColor}`}>
      <div
        className="flex w-full items-center menuLeftListHovers py-2"
        onClick={onClick}
      >
        {children}
      </div>
      <OptionsMenu onDelete={onDelete} onRename={onRename}>
        <EllipsisHorizontalIcon className="w-8 ml-auto mr-4" />
      </OptionsMenu>
    </div>
  )
}

export default memo(ListItem)
