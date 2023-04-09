import { memo, useState } from "react"
import OptionsMenu from "./OptionsMenu"
import { useMenuState } from "@szhsin/react-menu"

const ListItem = ({ isSelected, children, onClick, onDelete, onRename }) => {
  const [menuProps, toggleMenu] = useMenuState()
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  const textColor = isSelected
    ? "text-black dark:text-white"
    : "text-mediumGray"

  return (
    <div>
      <OptionsMenu
        onDelete={onDelete}
        onRename={onRename}
        menuProps={menuProps}
        anchorPoint={anchorPoint}
        toggleMenu={toggleMenu}
      />
      <div
        className={`items-center w-full ${textColor}`}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault()
          setAnchorPoint({ x: e.clientX, y: e.clientY })
          toggleMenu(true)
        }}
      >
        <div className="flex w-full items-center menuLeftListHovers py-2 relative">
          {children}
        </div>
      </div>
    </div>
  )
}

export default memo(ListItem)
