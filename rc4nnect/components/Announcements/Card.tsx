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

        <div className="w-full my-3 bg-gray-800 border border-gray-700 rounded-lg shadow">
            <div className="bg-gray-700 border-0 border-b border-gray-200 text-white text-sm rounded-t-lg w-full p-2.5 ">
                <h1 className="text-white text-2xl font-bold"> {announcement.igName}: {announcement.title} </h1>
            </div>
        <div className="flex flex-col gap-2 p-2">
                <p className="mb-2 text-lg text-white"> {announcement.content} </p>
                <a className="inline-flex items-center font-medium text-blue-300">
                    {announcement.createdDateTime.toDateString()}
                </a>

        </div>
    </div>



    )
}

export default Card
