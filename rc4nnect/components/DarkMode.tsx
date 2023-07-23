'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'


const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (theme === "dark") {
    return (
    <div className="mt-5 mb-5">
        <h1 className = "text-white font-bold text-lg"> Current theme: Dark Mode</h1>
        <button type="button" className ="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mt-2" onClick={() => setTheme('light')}>Light Mode</button>
    </div>)
  } else {
    return (
    <div className="mt-5">
        <h1 className = "text-black font-bold text-lg"> Current theme: Light Mode</h1>
        <button type="button" className ="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mt-2" onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>)
  }
  
}

export default ThemeSwitch