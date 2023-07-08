import React, { useState } from 'react';
import Slot from './Slot';
import { prisma } from '@/app/db';

type AppProps = {
  slots: {
    id: string;
    capacity: any; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: { name: string, id: string }[];
  }[];
  session: any
}

type SlotInfo = {
  id: string;
    capacity: any; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: { name: string, id: string }[];
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = ["1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"];



const Calendar: React.FC<AppProps> = ({slots, session}) => {
  function getColor(slotInfo: SlotInfo, subscribed: any, polled: any) {
    const positionInList = slotInfo.residents.findIndex((resident) => resident.id === session.user.id) + 1
  
    if (slotInfo.residents.length <= slotInfo.capacity && !polled) {
      return 'bg-green-600 hover:bg-green-800'
    } else if (subscribed && !polled) {
      return 'bg-rose-600 hover:bg-rose-800'
    } else if (polled && positionInList <= slotInfo.capacity) {
      return 'bg-blue-600 hover:bg-blue-800'
    } else if (polled) {
      return 'bg-orange-600 hover:bg-orange-800'
    } else {
      return ''
    }
  }

  return (
    <div>
      <div>
        <ul className="list-none grid grid-cols-10 mr-5 ml-[30px]">
          {timeSlots.map((timeSlot) => <li key={timeSlot}>{timeSlot}</li>)}
        </ul>
      </div>
      <div>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="grid grid-cols-[50px_auto] h-12 pb-2">
            <div className="text-center pt-[5px]">{day}</div>
            <div className="bg-gray-300 grid grid-cols-40">
              {slots.filter((slot) => slot.startDateTime.getDay() === index + 1).map(async (slot) => {  
                
                  const polled = await prisma.resident.findFirst({
                    where: {
                      AND: [
                        {
                          email: {
                            equals: session.user.email
                          },
                        },
                        {
                          slots: {
                            some: {
                              id: slot.id
                            }
                          }
                        }
                      ]
                    }
                  })

                  const subscribed = await prisma.resident.findFirst({
                    where: {
                      AND: [
                        {
                          email: {
                            equals: session.user.email
                          },
                        },
                        {
                          igs: {
                            some: {
                              name: slot?.igName
                            }
                          }
                        }
                      ]
                    }
                  })
                
                return (<Slot key={slot.id} slotInfo={slot} session={session} color={getColor(slot, subscribed, polled)}/>)
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
