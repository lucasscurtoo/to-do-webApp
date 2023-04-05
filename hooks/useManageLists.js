import { useDispatch, useSelector } from "react-redux"
import { checkIfExists } from "../helpers/functions"
import {
  useCreateUserListMutation,
  useDeleteUserListMutation,
} from "../redux/api/lists"
import { selectAList } from "../redux/reducers/todoSlice"

const useListManagement = () => {
  const lists = useSelector((state) => state.todoReducer.lists)
  const username = useSelector((state) => state.userReducer.username)
  const [createUserList] = useCreateUserListMutation()
  const [deleteUserList] = useDeleteUserListMutation()
  const dispatch = useDispatch()

  const createNewList = (listName) => {
    const listExists = checkIfExists(lists, listName)
    if (listExists) {
      dispatch(
        setErrorState({ state: true, message: "The list already exists" })
      )
    } else {
      createUserList({ title: listName, username })
    }
  }

  const handleDeleteList = (listTitle) => {
    deleteUserList({ title: listTitle, username })
    dispatch(selectAList(lists[0]))
  }

  const handleSelectAList = (list) => {
    dispatch(selectAList(list))
  }

  return {
    createNewList,
    handleDeleteList,
    handleSelectAList,
  }
}

export default useListManagement
