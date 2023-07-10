import React from 'react'

type AppProps = {
    igInfo: {
        id: string,
        name: string,
        category: string,
        numOfSessionsPerWeek: number,
    },
}

const Card: React.FC<AppProps> = ({igInfo}) => {

    return (
        <div className="p-4 max-w-sm">
            <div className="flex rounded-lg h-full bg-white hover:bg-gray-200 p-8 flex-col">
            <div className="flex items-center mb-3">
                <h1 className="text-black text-lg font-bold"> {igInfo.name} </h1>
            </div>
            <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-black"> {igInfo.category} </p>
                <a href="#" className="mt-3 text-black inline-flex items-center"> Sessions per week: {igInfo.numOfSessionsPerWeek} </a>
            </div>
        </div>
    </div>
    )
}

export default Card

