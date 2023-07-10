'use client'

import { useState, useEffect } from "react"
import React from 'react'

type AppProps = {
  changeFilter: any
}

function Filter({ changeFilter }: AppProps) {
  const [activeButton, setActiveButton] = useState("All");



  return (
    <div className="grid grid-cols-7 p-8 ">
        <button onClick={() => {changeFilter("All"); setActiveButton("All")}} 
                className={activeButton == "All" ? "bg-violet-700 text-white font-bold py-2 px-4 rounded-full m-3"
                                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"}>
                  All
        </button>

        <button onClick={() => {changeFilter("Arts"); setActiveButton("Arts")}} 
                className={activeButton == "Arts" ? "bg-violet-700 text-white font-bold py-2 px-4 rounded-full m-3"
                                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"}>
                  Arts
        </button>

        <button onClick={() => {changeFilter("Music"); setActiveButton("Music")}} 
                className={activeButton == "Music" ? "bg-violet-700 text-white font-bold py-2 px-4 rounded-full m-3"
                                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"}>
                  Music
        </button>

        <button onClick={() => {changeFilter("Lifestyle"); setActiveButton("Lifestyle")}} 
                className={activeButton == "Lifestyle" ? "bg-violet-700 text-white font-bold py-2 px-4 rounded-full m-3"
                                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"}>
                  Lifestyle
        </button>

        <button onClick={() => {changeFilter("Sports"); setActiveButton("Sports")}} 
                className={activeButton == "Sports" ? "bg-violet-700 text-white font-bold py-2 px-4 rounded-full m-3"
                                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"}>
                  Sports
        </button>
        
        <button onClick={() => {changeFilter("Cogpods"); setActiveButton("Cogpods")}} 
                className={activeButton == "Cogpods" ? "bg-violet-700 text-white font-bold py-2 px-4 rounded-full m-3"
                                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"}>
                  Cogpods
        </button>

        <button onClick={() => {changeFilter("Community"); setActiveButton("Community")}} 
                className={activeButton == "Community" ? "bg-violet-700 text-white font-bold py-2 px-4 rounded-full m-3"
                                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"}>
                  Community
        </button>

    </div>
  )
}

export default Filter;
