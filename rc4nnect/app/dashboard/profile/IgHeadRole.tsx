import React from 'react'

type AppProps = {
  igName: string
}

function IgHeadRole({ igName  }: AppProps) {
  return (
    <div className="bg-yellow-100 text-xl text-black font-medium mr-2 px-2.5 py-2 w-fit rounded-full dark:bg-yellow-900 dark:text-yellow-300">{igName} IG Head</div>
  )
}

export default IgHeadRole