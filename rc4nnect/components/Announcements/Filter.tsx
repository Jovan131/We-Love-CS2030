'use client'

import { useState, useEffect } from "react"
import React from 'react'

type AppProps = {
  changeFilter: any
}

function Filter({ changeFilter }: AppProps) {
  const [activeButton, setActiveButton] = useState("Today");



  return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" 
                        onClick={() => {changeFilter("Today"); setActiveButton("Today")}}
                        className={activeButton == "Today" 
                                                ? "px-5 py-2.5 text-sm font-medium text-white bg-gray-600 border border-gray-200 rounded-l-lg hover:bg-gray-800 dark:bg-white dark:border-white dark:text-black dark:hover:text-black dark:hover:bg-gray-200"
                                                : "px-5 py-2.5 text-sm font-medium text-white bg-violet-700 border border-gray-200 rounded-l-lg hover:bg-violet-900"}>
                Today
                </button>

                <button type="button" 
                onClick={() => {changeFilter("Past Week"); setActiveButton("Past Week")}}
                className={activeButton == "Past Week" 
                                        ? "px-5 py-2.5 text-sm font-medium text-white bg-gray-600 border-t border-b border-gray-200 hover:bg-gray-800  dark:bg-white dark:border-white dark:text-black dark:hover:text-black dark:hover:bg-gray-200"
                                        : "px-5 py-2.5 text-sm font-medium text-white bg-violet-700 border-t border-b border-gray-200 hover:bg-violet-900 "}>
                Past Week
                </button>

                <button type="button" 
                onClick={() => {changeFilter("All"); setActiveButton("All")}}
                className={activeButton == "All" 
                                        ? "px-5 py-2.5 text-sm font-medium text-white bg-gray-600 border border-gray-200 rounded-r-md hover:bg-gray-800 dark:bg-white dark:border-white dark:text-black dark:hover:text-black dark:hover:bg-gray-200"
                                        : "px-5 py-2.5 text-sm font-medium text-white bg-violet-700 border border-gray-200 rounded-r-md hover:bg-violet-900 "}>
                All
                </button>

    </div>
  )
}

export default Filter;
