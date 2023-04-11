import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { memo } from "react"
import { useDispatch } from "react-redux"
import { clearUserData, logOut } from "../../redux/reducers/userSlice"

const LogOut = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogOut = async () => {
    router.push("/")
    dispatch(logOut())
    dispatch(clearUserData())
  }

  return (
    <div
      className="flex items-center group w-fit cursor-pointer"
      onClick={handleLogOut}
    >
      <ArrowLeftOnRectangleIcon className="w-6 ml-2 text-mediumGray group-hover:text-black group-hover:dark:text-white" />
      <h2 className="text-mediumGray group-hover:text-black group-hover:dark:text-white">
        Log out
      </h2>
    </div>
  )
}

export default memo(LogOut)
