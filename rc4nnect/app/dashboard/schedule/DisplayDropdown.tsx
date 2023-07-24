import React, { useState } from 'react';
import Select, { components, ValueContainerProps } from 'react-select'

type AppProps = {
  changeDisplayType: any
}

const options = [
  { value: 'both', label: 'Show both polled slots and subscribed IGs' },
  { value: 'polled', label: 'Show only polled slots' },
  { value: 'subscribed', label: 'Show only subscribed IGs' }
]

export default function DisplayDropdown({ changeDisplayType }: AppProps) {
  return (
    <div className='w-[361px] pb-[116px]'>
      <label className="block mb-1 text-sm font-medium text-black dark:text-white">Filter:</label>
      <div className='text-black'>
        <Select 
          classNames={{
            valueContainer: () => 'text-sm',
            menuList: () => 'text-sm',
          }}
          options={options} 
          onChange={(e) => changeDisplayType(e?.value)}
          className="basic-single"
          defaultValue={options[0]}
          isSearchable={false}
        />
      </div>
    </div>
  )
}