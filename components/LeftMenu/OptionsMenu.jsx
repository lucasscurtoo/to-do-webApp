import { useState } from "react"
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

const OptionsMenu = ({ listTitle, editList }) => {
  const [menuProps, toggleMenu] = useMenuState()
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })

  const handleDeleteList = () => {
    deleteUserList({ title: listTitle, username })
  }

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        setAnchorPoint({ x: e.clientX, y: e.clientY })
        toggleMenu(true)
      }}
      className="w-32 h-12 absolute z-10"
    >
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        direction="right"
        onClose={() => toggleMenu(false)}
        menuClassName="bg-white dark:bg-secondDarkGray p-2 flex flex-col justify-center group-hover:text-white "
      >
        <div
          onClick={handleDeleteList}
          className="parentHoverRed flex items-center my-2"
        >
          <TrashIcon className="w-6 text-errorColor dark:text-softErrorColor childHover" />
          <MenuItem className="hover:outline-none focus:outline-none text-errorColor dark:text-softErrorColor childHover">
            Delete
          </MenuItem>
        </div>
        <div className="flex items-center group my-2">
          <PencilSquareIcon className="w-6 group-hover:text-gray-300" />
          <MenuItem className="hover:outline-none focus:outline-none group-hover:text-gray-300">
            Rename
          </MenuItem>
        </div>
      </ControlledMenu>
    </div>
  )
}

export default OptionsMenu
