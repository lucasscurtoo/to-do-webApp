import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearErrorState } from "../redux/reducers/todoSlice"
import CustomToast from "./CustomToast"

const ShowError = () => {
  const [showToast, setShowToast] = useState(false)
  const error = useSelector((state) => state.todoReducer.error)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error !== null) {
      setShowToast(true)
    }
  }, [error])

  const handleToastClose = () => {
    setShowToast(false)
    dispatch(clearErrorState())
  }

  return (
    <CustomToast
      show={showToast}
      toastOnClose={handleToastClose}
      notifi={error?.state && error.message}
      state={!error?.state}
    />
  )
}

export default ShowError
