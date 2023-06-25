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
}

function getStyle(slotInfo: {
    id: string;
    capacity: any; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: { name: string }[];
}) {
    return {
      gridColumnStart: 1 + ((slotInfo.startDateTime.getHours() - 14) * 4) + (slotInfo.startDateTime.getMinutes() / 15),
      gridColumnEnd: 1 + ((slotInfo.startDateTime.getHours() - 14) * 4) + (slotInfo.startDateTime.getMinutes() / 15) + (slotInfo.duration * 4),
      gridRowStart: 1,
      gridRowEnd: 2,
      backgroundColor: (slotInfo.residents.length <= slotInfo.capacity) ? 'green' : 'orange',
      borderRadius: '2px', 
      zIndex: 5, 
      paddingTop: '5px', 
      paddingBottom: '5px', 
      textAlign: 'center',
    } as const
}
  
  

const Slot: React.FC<AppProps> = ({slotInfo}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div style={getStyle(slotInfo)} key={slotInfo.id} onClick={() => setShowModal(true)}>
                {slotInfo.igName + ": " + slotInfo.residents.length + "/" + (slotInfo.capacity ?? "~")}
            </div>
            <Modal slotInfo={slotInfo} isVisible={showModal} onClose={() => setShowModal(false)}/>
        </>
    );
}

export default Slot;