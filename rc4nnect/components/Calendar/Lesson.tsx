import React, { useState } from 'react';

type AppProps = {
  lessonInfo: {
    id: string;
    startDateTime: Date;
    duration: number;
    name: string;
    location: string | null;
    residentEmail: string;
  }
  earliestHour: number
}

const Lesson: React.FC<AppProps> = ({lessonInfo, earliestHour}) => {
  const colStartValue = 1 + ((lessonInfo.startDateTime.getHours() - earliestHour) * 4) + (lessonInfo.startDateTime.getMinutes() / 15)
  const colEndValue = 1 + ((lessonInfo.startDateTime.getHours() - earliestHour) * 4) + (lessonInfo.startDateTime.getMinutes() / 15) + (lessonInfo.duration * 4)

  return (
    <div className="bg-gray-600 rounded z-[5] mb-px py-2 text-center mx-px"
    style={{gridColumnStart: colStartValue, gridColumnEnd: colEndValue}}
    key={lessonInfo.id}>
      {`${lessonInfo.name} @ ${lessonInfo.location}`}
    </div>
  );
}

export default Lesson;