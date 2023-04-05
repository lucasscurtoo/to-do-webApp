import { memo } from "react"
import DocumentIcon from "../../assets/icons/document-icon.svg"
import useListManagement from "../../hooks/useManageLists"
import ListItem from "./ListItem"

const List = ({ currentList, list, darkmode }) => {
  const isSelected = currentList?.title === list.title
  const { handleSelectAList, handleDeleteList } = useListManagement()

  return (
    <ListItem
      isSelected={isSelected}
      darkmode={darkmode}
      onClick={() => handleSelectAList(list)}
      onDelete={() => handleDeleteList(list.title)}
    >
      <DocumentIcon
        stroke={isSelected ? (darkmode ? "white" : "black") : "gray"}
        className="mr-2 md:min-w-max"
      />
      <h2 className="truncate">{list.title}</h2>
    </ListItem>
  )
}
export default memo(List)
