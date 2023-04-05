import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import LoginForm from "../components/auth/LoginForm"
import { useLoginMutation } from "../redux/api/userAuth"
import { setErrorState } from "../redux/reducers/todoSlice"
import { useRedirect } from "../hooks/useRedirect"

const Home = () => {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter()
  useRedirect()

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
