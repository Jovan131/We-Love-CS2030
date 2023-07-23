import React from 'react'

type AppProps = {
    announcement: {
        id: string,
        title: string,
        content: string,
        createdDateTime: Date,
        igName: string,
    },
    email: string
}


const Card: React.FC<AppProps> = ({announcement, email}) => {

    return (

        <div className="w-full my-3 bg-slate-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow">
            <div className="bg-gray-200 dark:bg-gray-700 border-0 border-b border-gray-100 dark:border-gray-200 text-white text-sm rounded-t-lg w-full p-2.5 ">
                <h1 className="text-black dark:text-white text-2xl font-bold"> {announcement.igName}: {announcement.title} </h1>
            </div>
        <div className="flex flex-col gap-2 p-2">
                <p className="mb-2 text-lg text-black dark:text-white"> {announcement.content} </p>
                <a className="inline-flex items-center font-medium text-blue-700 dark:text-blue-300">
                    {announcement.createdDateTime.toDateString()}
                </a>

        </div>
    </div>



    )
}

export default Card
