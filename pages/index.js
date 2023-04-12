import Head from "next/head"
import { useRouter } from "next/router"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoginForm from "../components/auth/LoginForm"
import { useLoginMutation } from "../redux/api/userAuth"
import { setErrorState } from "../redux/reducers/todoSlice"
import { setJwtExpired, setRedirected } from "../redux/reducers/userSlice"

const Home = () => {
  const isRedirected = useSelector((state) => state.userReducer.isRedirected)
  const jwtExpired = useSelector((state) => state.userReducer.jwtExpired)
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (isRedirected) {
      dispatch(setErrorState({ state: true, message: "Log in before" }))
      dispatch(setRedirected(false))
    }
    if (jwtExpired) {
      dispatch(
        setErrorState({
          state: true,
          message: "Your session expired, please log in again",
        })
      )
      dispatch(setJwtExpired(false))
    }
  }, [isRedirected, jwtExpired])

  const onSubmit = async (values) => {
    try {
      await login(values).unwrap()
      router.push("/to-do")
    } catch (error) {
      dispatch(setErrorState({ state: true, message: error?.data?.message }))
    }
  }

  return (
    <div>
      <Head>
        <title>To-Do List</title>
        <meta name="description" content="My personal to-do project" />
        <meta name="keywords" content="nextjs, react, web development" />
      </Head>
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}

export default memo(Home)
