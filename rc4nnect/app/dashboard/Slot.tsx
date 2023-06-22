import React from 'react';

type AppProps = {
    slotInfo: {
      id: string;
      capacity: any; 
      venue: string;
      startDateTime: Date;
      duration: number;
      igName: string;
      residents: { name: string }[];
    };
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
    return (
        <div style={getStyle(slotInfo)} key={slotInfo.id}>
            {slotInfo.igName + ": " + slotInfo.residents.length + "/" + (slotInfo.capacity ?? "~")}
        </div>
    );
}

export default Slot;