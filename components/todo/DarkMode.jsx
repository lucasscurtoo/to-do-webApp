import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { memo } from "react"
import { useUpdateUserDarkModeMutation } from "../../redux/api/users"

const DarkMode = ({ username, darkmode }) => {
  const [updateDarkmode] = useUpdateUserDarkModeMutation()

  const handledarkmode = () => {
    updateDarkmode({ username, darkmode: !darkmode })
  }
  return (
    <>
      {darkmode ? (
        <SunIcon
          className="w-8 text-mediumGray hover:text-white cursor-pointer"
          onClick={handledarkmode}
        />
      ) : (
        <MoonIcon
          className="w-8 text-mediumGray hover:text-black cursor-pointer"
          onClick={handledarkmode}
        />
      )}
    </>
  )
}

export default memo(DarkMode)
