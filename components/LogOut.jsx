import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { clearUserData, logOut } from "../redux/reducers/userSlice"

const LogOut = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogOut = async () => {
    dispatch(logOut())
    dispatch(clearUserData())
    router.push("/")
  }

  return (
    <div
      className="flex items-center parentHoverWhite parentHoverBlack w-fit"
      onClick={handleLogOut}
    >
      <h2 className="text-mediumGray childHover">Log out</h2>
      <ArrowLeftOnRectangleIcon className="w-6 ml-2 text-mediumGray childHover" />
    </div>
  )
}

export default LogOut
