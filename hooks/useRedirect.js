import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearUserData, setRedirected } from "../redux/reducers/userSlice"

export const useRedirect = () => {
  const { username, isLoggedIn } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if (!isLoggedIn || username === null) {
      router.push("/")
      dispatch(setRedirected(true))
      dispatch(clearUserData())
    }
  }, [])
}
