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
        residents: { name: string }[];
        polled: boolean,
        subscribed: boolean,    
    },
    session: any,
    color: string,
}

const Slot: React.FC<AppProps> = ({slotInfo, session, color}) => {
    const [showModal, setShowModal] = useState(false);
        
    const colStartValue = 1 + ((slotInfo.startDateTime.getHours() - 14) * 4) + (slotInfo.startDateTime.getMinutes() / 15)
    const colEndValue = 1 + ((slotInfo.startDateTime.getHours() - 14) * 4) + (slotInfo.startDateTime.getMinutes() / 15) + (slotInfo.duration * 4)

    return (
        <>
            <div className={`row-start-1 row-end-2 ${color} 
            rounded z-[5] py-2 text-center mx-px cursor-pointer`} 
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