import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  clearUserData,
  logOut,
  setRedirected,
  setUserData,
} from "../redux/reducers/userSlice"
import { middleware } from "../redux/api/api"

export const useSession = () => {
  const { username, isLoggedIn, isRedirected } = useSelector(
    (state) => state.userReducer
  )
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storageUsername = localStorage.getItem("username")
    if (!isLoggedIn && username === null && !token) {
      router.push("/")
      dispatch(setRedirected(true))
      dispatch(clearUserData())
    }
    if (token && username === null) {
      dispatch(setUserData({ username: storageUsername, userToken: token }))
    }
  }, [isRedirected, isLoggedIn, username])
}
