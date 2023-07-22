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
}

const Lesson: React.FC<AppProps> = ({lessonInfo}) => {
  const colStartValue = 1 + ((lessonInfo.startDateTime.getHours() - 14) * 4) + (lessonInfo.startDateTime.getMinutes() / 15)
  const colEndValue = 1 + ((lessonInfo.startDateTime.getHours() - 14) * 4) + (lessonInfo.startDateTime.getMinutes() / 15) + (lessonInfo.duration * 4)

  return (
    <div className="bg-violet-600 rounded z-[5] mb-px py-2 text-center mx-px cursor-pointer"
    style={{gridColumnStart: colStartValue, gridColumnEnd: colEndValue}}
    key={lessonInfo.id}>
      {`${lessonInfo.name} @ ${lessonInfo.location}`}
    </div>
  );
}

export default Lesson;