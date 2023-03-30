import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useUpdateUserDarkModeMutation } from "../redux/api/users"

const DarkMode = ({ username, darkmode }) => {
  const [updateDarkmode] = useUpdateUserDarkModeMutation()

  const handledarkmode = () => {
    updateDarkmode({ username, darkmode: !darkmode })
  }
  return (
    <>
      {darkmode ? (
        <SunIcon
          className="ml-auto w-8 text-mediumGray hover:text-white"
          onClick={handledarkmode}
        />
      ) : (
        <MoonIcon
          className="ml-auto w-8 text-mediumGray hover:text-black"
          onClick={handledarkmode}
        />
      )}
    </>
  )
}

export default DarkMode
