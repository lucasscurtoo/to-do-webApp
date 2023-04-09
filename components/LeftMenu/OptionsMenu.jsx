import { ControlledMenu, Menu, MenuItem } from "@szhsin/react-menu"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

const OptionsMenu = ({ onDelete, onRename, toggleMenu, children }) => {
  return (
    <div className="w-full">
      <Menu
        menuButton={children}
        menuClassName="bg-white dark:bg-secondDarkGray px-2 group-hover:text-white z-10"
      >
        <div
          onClick={onDelete}
          className="parentHoverRed flex items-center my-2"
        >
          <TrashIcon className="w-6 text-errorColor dark:text-softErrorColor childHover" />
          <MenuItem className="hover:outline-none focus:outline-none text-errorColor dark:text-softErrorColor childHover">
            Delete
          </MenuItem>
        </div>
        <div onClick={onRename} className="flex items-center group my-2">
          <PencilSquareIcon className="w-6 text-gray-300 group-hover:text-white" />
          <MenuItem className="hover:outline-none text-gray-300 focus:outline-none group-hover:text-white">
            Rename
          </MenuItem>
        </div>
      </Menu>
    </div>
  )
}

export default OptionsMenu
