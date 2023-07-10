import React from 'react';

type AppProps = {
  displayedCategories: string[],
  setDisplayedCategories: any,
}

export default function FilterByCategory({ displayedCategories, setDisplayedCategories }: AppProps) {
  return (
    <div>
      <h3 className="mb-1 font-semibold white dark:text-white">Filter by category:</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="arts" defaultChecked={displayedCategories.includes('Arts') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedCategories((prevState: string[]) => {
              if (prevState.includes('Arts')) {
                return prevState.filter((category) => category !== 'Arts')
              } else {
                const newArray = [...prevState]
                newArray.push('Arts')
                return newArray
              }
              })
            }/>
            <label htmlFor="arts" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arts</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="Cogpods" defaultChecked={displayedCategories.includes('Cogpods') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedCategories((prevState: string[]) => {
              if (prevState.includes('Cogpods')) {
                return prevState.filter((category) => category !== 'Cogpods')
              } else {
                const newArray = [...prevState]
                newArray.push('Cogpods')
                return newArray
              }
              })
            }/>
            <label htmlFor="cogpods" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cogpods</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="community-service" defaultChecked={displayedCategories.includes('Community Service') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedCategories((prevState: string[]) => {
              if (prevState.includes('Community Service')) {
                return prevState.filter((category) => category !== 'Community Service')
              } else {
                const newArray = [...prevState]
                newArray.push('Community Service')
                return newArray
              }
              })
            }/>
            <label htmlFor="community-service" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Community service</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="lifestyle" defaultChecked={displayedCategories.includes('Lifestyle') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"            
            onChange={() => setDisplayedCategories((prevState: string[]) => {
              if (prevState.includes('Lifestyle')) {
                return prevState.filter((category) => category !== 'Lifestyle')
              } else {
                const newArray = [...prevState]
                newArray.push('Lifestyle')
                return newArray
              }
              })
            }/>
          <label htmlFor="lifestyle" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lifestyle</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input id="sports" defaultChecked={displayedCategories.includes('Sports') ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
            onChange={() => setDisplayedCategories((prevState: string[]) => {
              if (prevState.includes('Sports')) {
                return prevState.filter((category) => category !== 'Sports')
              } else {
                const newArray = [...prevState]
                newArray.push('Sports')
                return newArray
              }
              })
            }/>
            <label htmlFor="sports" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sports</label>
          </div>
        </li>
      </ul>
    </div>
  )
}