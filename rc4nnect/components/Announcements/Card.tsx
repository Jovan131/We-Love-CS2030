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

    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
            <h1 className="text-gray-500 dark:text-white text-lg font-bold"> {announcement.title} </h1>
        </ul>
        <div id="defaultTabContent">
            <div className=" bg-white rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white"> {announcement.igName} </h2>
                <p className="mb-3 text-gray-500 dark:text-gray-400"> {announcement.content} </p>
                <a className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500">
                    {announcement.createdDateTime.toString()}
                </a>
            </div>
            
        </div>
    </div>



    )
}

export default Card
