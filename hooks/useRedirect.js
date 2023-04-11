import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  clearUserData,
  setRedirected,
  setUserData,
} from "../redux/reducers/userSlice"

export const useRedirect = () => {
  const { username, isLoggedIn, jwtExpired } = useSelector(
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
  }, [])

  useEffect(() => {
    if (jwtExpired) {
      router.push("/")
      dispatch(clearUserData())
    }
  }, [jwtExpired])
}
