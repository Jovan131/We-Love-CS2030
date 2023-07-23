'use client'

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
        residents: { name: string, id: string }[];
        polled: boolean,
        subscribed: boolean, 
        description: string | null,   
    },
    session: any,
    color: string,
    earliestHour: number
}

const Slot: React.FC<AppProps> = ({slotInfo, session, color, earliestHour}) => {
    const [showModal, setShowModal] = useState(false);
        
    const colStartValue = 1 + ((slotInfo.startDateTime.getHours() - earliestHour) * 4) + (slotInfo.startDateTime.getMinutes() / 15)
    const colEndValue = 1 + ((slotInfo.startDateTime.getHours() - earliestHour) * 4) + (slotInfo.startDateTime.getMinutes() / 15) + (slotInfo.duration * 4)

    return (
        <>
            <div className={`${color} 
            rounded z-[5] mb-px py-2 text-center mx-px cursor-pointer`} 
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