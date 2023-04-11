import { Menu, MenuItem } from "@szhsin/react-menu"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import "@szhsin/react-menu/dist/index.css"
import "@szhsin/react-menu/dist/theme-dark.css"
import "@szhsin/react-menu/dist/transitions/slide.css"
import { useSelector } from "react-redux"

const OptionsMenu = ({ onDelete, onRename, children }) => {
  const darkmode = useSelector((state) => state.userReducer.darkmode)
  return (
    <div className="w-full">
      <Menu
        transition={{ open: true }}
        menuButton={children}
        align="start"
        arrow={true}
        theming={darkmode ? "dark" : undefined}
        menuClassName="shadow-md group-hover:text-white z-10"
      >
        <div onClick={onDelete} className="flex items-center my-2 group">
          <MenuItem className="w-full hover:outline-none focus:outline-none hover:bg-transparent group-hover:text-errorColor text-softErrorColor">
            <TrashIcon className="w-6 group-hover:text-errorColor text-softErrorColor" />
            <p>Delete</p>
          </MenuItem>
        </div>
        <div onClick={onRename} className="flex items-center group my-2">
          <MenuItem className="w-full hover:outline-none focus:outline-none text-gray-900 group-hover:!text-black dark:text-gray-300 group-hover:dark:!text-white">
            <PencilSquareIcon className="w-6 text-gray-500 group-hover:!text-black dark:text-gray-300 group-hover:dark:!text-white" />
            <p>Rename</p>
          </MenuItem>
        </div>
      </Menu>
    </div>
  )
}

export default OptionsMenu
