import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'

type AppProps = {
  showNusmodsLessons: boolean,
  setShowNusmodsLessons: any
}

export default function NusmodsToggle({ showNusmodsLessons, setShowNusmodsLessons }: AppProps) {
  return (
    <div className='flex'>
      <div>
        <Toggle
          defaultChecked={showNusmodsLessons}
          onChange={() => setShowNusmodsLessons((prevState: boolean) => !prevState)} />
      </div>
      <div className='ml-2'>{"Show your NUSMods timetable (if uploaded)"} </div>
    </div>
  )
}