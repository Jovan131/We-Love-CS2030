'use client'

import React from 'react'
import IGSubscribeButton from './IGSubscribeButton'
import { useState } from 'react'
import Modal from './Modal'

type AppProps = {
    igInfo: {
        id: string,
        name: string,
        category: string,
        numOfSessionsPerWeek: number,
        members: {email: string}[],
        subscribed: boolean,
    },
    email: string
}

const Card: React.FC<AppProps> = ({igInfo, email}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div className="p-4 max-w-sm"
        onClick={() => setShowModal(true)}>
            <div className="flex rounded-lg h-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:translate-x-1 hover:-translate-y-1 text-white focus:ring-4 focus:outline-none focus:ring-purple-800 pt-4 pl-4 pr-4 flex-col">
                <div className="flex items-center justify-center mb-3">
                    <h1 className=" text-white text-lg font-bold"> {igInfo.name} </h1>
                </div>
            </div>
        </div>
        <Modal igInfo={igInfo} isVisible={showModal} onClose={() => setShowModal(false)} email={email} />
        </>
    )
}

export default Card

