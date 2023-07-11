import React, { useState } from 'react';

type AppProps = {
  changeDisplayType: any
}

export default function DisplayDropdown({ changeDisplayType }: AppProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-white dark:text-white">Filter:</label>
      <select id="displayOnly" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => changeDisplayType(e.target.value)}>
        <option value="both">Show both polled slots and subscribed IGs</option>
        <option value="polled">Show only polled slots</option>
        <option value="subscribed">Show only subscribed IGs</option>
      </select>
    </div>
  )
}