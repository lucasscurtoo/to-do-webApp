import { useDispatch, useSelector } from "react-redux"
import { checkIfExists, removeTrailingSpace } from "../helpers/functions"
import {
  useCreateUserListMutation,
  useDeleteUserListMutation,
  useEditUserListMutation,
} from "../redux/api/lists"
import { selectAList, setErrorState } from "../redux/reducers/todoSlice"

const useListManagement = () => {
  const lists = useSelector((state) => state.todoReducer.lists)
  const username = useSelector((state) => state.userReducer.username)
  const [createUserList] = useCreateUserListMutation()
  const [deleteUserList] = useDeleteUserListMutation()
  const [editUserList] = useEditUserListMutation()
  const dispatch = useDispatch()

  const createNewList = (listName) => {
    const listExists = checkIfExists(lists, listName)
    const normalizedListName = removeTrailingSpace(listName)
    if (listExists) {
      dispatch(
        setErrorState({ state: true, message: "The list already exists" })
      )
    } else {
      createUserList({ title: normalizedListName, username })
    }
  }

  const handleEditUserList = (listName, newListName) => {
    if (listName && newListName) {
      if (listName != newListName) {
        const normalizedListName = removeTrailingSpace(newListName)
        editUserList({
          oldTitle: listName,
          newTitle: normalizedListName,
          username,
        })
      } else {
        dispatch(
          setErrorState({
            state: true,
            message:
              "Can'not set the same list name, please provide another one",
          })
        )
      }
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
    handleEditUserList,
  }
}

export default useListManagement
