import BackgroundImage from "./BackgroundImage"
import LogoToDo from "../public/logo-todo.png"
import Image from "next/image"
import { BarLoader } from "react-spinners"
import { memo } from "react"

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen">
      <BackgroundImage />
      <div className="black-overlay z-10 w-full h-full flex flex-col items-center justify-center relative">
        <Image className="w-40" src={LogoToDo} alt="Logo" priority />
        <BarLoader color="#00d7ee" width={200} />
        <p className="text-grayColor">We are loading your data, please wait</p>
      </div>
    </div>
  )
}

export default memo(LoadingScreen)
