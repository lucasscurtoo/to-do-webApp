import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import LoginForm from "../components/auth/LoginForm"
import { useLoginMutation } from "../redux/api/userAuth"
import { setErrorState } from "../redux/reducers/todoSlice"
import { setRedirected } from "../redux/reducers/userSlice"

const Home = () => {
  const isRedirected = useSelector((state) => state.userReducer.isRedirected)
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  if (isRedirected) {
    dispatch(setErrorState({ state: true, message: "Log in before" }))
    dispatch(setRedirected(false))
  }

  const onSubmit = async (values) => {
    try {
      await login(values).unwrap()
      router.push("/to-do")
    } catch (error) {
      dispatch(setErrorState({ state: true, message: error?.data.message }))
    }
  }
  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
}

export default Home
