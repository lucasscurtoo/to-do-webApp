import { useState } from "react";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import { TrashIcon } from "@heroicons/react/24/outline";

const DeleteMenu = ({onClick}) => {
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
    <div onContextMenu={e => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
    }} className="w-32 h-12 absolute z-10">

        <ControlledMenu {...menuProps} anchorPoint={anchorPoint}
            direction="right" onClose={() => toggleMenu(false)}
            menuClassName="bg-white w-32 h-12 dark:bg-secondDarkGray p-2 flex items-center group-hover:text-white parentHoverRed"
            onClick={onClick}
        >   
            <TrashIcon className="w-6 text-errorColor dark:text-softErrorColor childHover"/>
            <MenuItem className="hover:outline-none focus:outline-none text-errorColor dark:text-softErrorColor childHover">Delete</MenuItem>
        </ControlledMenu>
    </div >
    )
}

export default DeleteMenu;
