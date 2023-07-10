import React from 'react';

type AppProps = {
  displayedVenues: string[],
  setDisplayedVenues: any,
}

export default function FilterByVenue({ displayedVenues, setDisplayedVenues }: AppProps) {
  return (
    <div>
      <h3 className="mb-1 font-semibold white dark:text-white">Filter by venue:</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="MPSH" defaultChecked={displayedVenues.includes('MPSH') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedVenues((prevState: string[]) => {
              if (prevState.includes('MPSH')) {
                return prevState.filter((category) => category !== 'MPSH')
              } else {
                const newArray = [...prevState]
                newArray.push('MPSH')
                return newArray
              }
              })
            }/>
            <label htmlFor="MPSH" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">MPSH</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="SR1-SR6" defaultChecked={displayedVenues.includes('SR1-SR6') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedVenues((prevState: string[]) => {
              if (prevState.includes('SR1-SR6')) {
                return prevState.filter((category) => category !== 'SR1-SR6')
              } else {
                const newArray = [...prevState]
                newArray.push('SR1-SR6')
                return newArray
              }
              })
            }/>
            <label htmlFor="SR1-SR6" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">SR1-SR6</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="USC" defaultChecked={displayedVenues.includes('USC') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedVenues((prevState: string[]) => {
              if (prevState.includes('USC')) {
                return prevState.filter((category) => category !== 'USC')
              } else {
                const newArray = [...prevState]
                newArray.push('USC')
                return newArray
              }
              })
            }/>
            <label htmlFor="USC" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">USC</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="others" defaultChecked={displayedVenues.includes('Others') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedVenues((prevState: string[]) => {
              if (prevState.includes('Others')) {
                return prevState.filter((category) => category !== 'Others')
              } else {
                const newArray = [...prevState]
                newArray.push('Others')
                return newArray
              }
              })
            }/>
            <label htmlFor="others" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Others</label>
          </div>
        </li>
      </ul>
    </div>
  )
}