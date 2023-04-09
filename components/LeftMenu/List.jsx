import { memo, useCallback, useEffect, useRef, useState } from "react"
import DocumentIcon from "../../assets/icons/document-icon.svg"
import { useIsMobile } from "../../hooks/useIsMobile"
import useListManagement from "../../hooks/useManageLists"
import ListItem from "./ListItem"

const List = ({ currentList, list, darkmode, onClose }) => {
  const isSelected = currentList?.title === list.title
  const [listToEdit, setListToEdit] = useState()
  const { isMobileState } = useIsMobile()
  const inputRef = useRef()
  const { handleSelectAList, handleDeleteList, handleEditUserList } =
    useListManagement()

  const editUserList = useCallback(() => {
    handleEditUserList(listToEdit.title, inputRef.current.value)
    inputRef.current.value = ""
    setListToEdit(false)
    handleMobileClose()
  }, [handleEditUserList, handleMobileClose, listToEdit])

  const handleMobileClose = useCallback(() => {
    if (isMobileState) {
      onClose()
    }
  }, [isMobileState, onClose])

  const handleOnBlur = useCallback(() => {
    if (listToEdit) {
      editUserList()
    }
  }, [editUserList, listToEdit])

  const handleKeyEvent = useCallback(
    (event) => {
      if (event.key === "Enter") {
        editUserList()
      }
    },
    [editUserList]
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.readOnly = true
      if (listToEdit) {
        inputRef.current.readOnly = false
        inputRef.current.focus()
      }
    }
  }, [inputRef, listToEdit])

  return (
    <ListItem
      isSelected={isSelected}
      darkmode={darkmode}
      onClick={() => {
        handleSelectAList(list)
        handleMobileClose()
      }}
      onDelete={() => {
        handleDeleteList(list.title)
        handleMobileClose()
      }}
      onRename={() => setListToEdit(list)}
    >
      <DocumentIcon
        stroke={isSelected ? (darkmode ? "white" : "black") : "gray"}
        className="mr-2 md:min-w-max"
      />
      <input
        className={`w-90% truncate bg-transparent  ${
          isSelected ? "placeholder:text-white" : "placeholder:text-mediumGray"
        }`}
        ref={inputRef}
        placeholder={list.title}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyEvent}
      />
    </ListItem>
  )
}

export default memo(List)
