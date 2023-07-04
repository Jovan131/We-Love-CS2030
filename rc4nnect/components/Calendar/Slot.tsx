"use client"

import React, { useState } from 'react';
import Modal from "./Modal";


type AppProps = {
    slotInfo: {
        id: string;
        capacity: any; 
        venue: string;
        startDateTime: Date;
        duration: number;
        igName: string;
        residents: { name: string }[];
    },
    session: any
}

const Slot: React.FC<AppProps> = ({slotInfo, session}) => {
    const [showModal, setShowModal] = useState(false);

    const colStartValue = 1 + ((slotInfo.startDateTime.getHours() - 14) * 4) + (slotInfo.startDateTime.getMinutes() / 15)
    const colEndValue = 1 + ((slotInfo.startDateTime.getHours() - 14) * 4) + (slotInfo.startDateTime.getMinutes() / 15) + (slotInfo.duration * 4)

    return (
        <>
            <div className={`row-start-1 row-end-2 ${(slotInfo.residents.length <= slotInfo.capacity) ? 'bg-green-600' : 'bg-orange-500'} 
            rounded z-[5] py-1.5 text-center mx-px`} 
            style={{gridColumnStart: colStartValue, gridColumnEnd: colEndValue}}
            key={slotInfo.id} 
            onClick={() => setShowModal(true)}>
            {slotInfo.igName + ": " + slotInfo.residents.length + "/" + (slotInfo.capacity ?? "~")}
            </div>
            <Modal slotInfo={slotInfo} isVisible={showModal} onClose={() => setShowModal(false)} session={session}/>
        </>
    );
}

export default Slot;