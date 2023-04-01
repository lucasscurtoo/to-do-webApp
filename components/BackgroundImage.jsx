import Image from "next/image"
import background from "../public/background.jpg"

const BackgroundImage = () => {
  return (
    <Image
      className="z-0 absolute w-screen h-screen"
      src={background}
      alt="bakground image"
      priority
      placeholder="blur"
    />
  )
}

export default BackgroundImage
