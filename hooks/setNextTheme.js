import { useTheme } from "next-themes"
import { useEffect } from "react"

export const setNextTheme = (darkmode) => {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(darkmode ? "dark" : "light")
  }, [darkmode])
}
