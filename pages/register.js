import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { useRegisterMutation } from "../redux/api/userAuth"
import { setErrorState } from "../redux/reducers/todoSlice"
import RegisterForm from "../components/auth/RegisterForm"

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation()
  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await register({ username, password }).unwrap()
      router.push("/to-do")
    } catch (error) {
      dispatch(setErrorState({ state: true, message: error?.data.message }))
    }
  }

  return <RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
}

export default Register
