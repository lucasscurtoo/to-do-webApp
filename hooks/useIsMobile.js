import { useState } from "react"
import { useEffect } from "react"

export const useIsMobile = () => {
  const [isMobile, setIsMobileState] = useState(false)

  useEffect(() => {
    const width = window.innerWidth
    const isMobile = width < 768 ? true : false
    if (isMobile) {
      setIsMobileState(true)
    }
  }, [])

  return {
    isMobile,
  }
}
