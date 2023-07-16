import React from 'react';
import Select from 'react-select';

type AppProps = {
  setDisplayedVenues: any,
}

const options = [
  { value: 'MPSH', label: 'MPSH' },
  { value: 'SR1-SR6', label: 'SR1-SR6' },
  { value: 'USC', label: 'USC' },
  { value: 'Others', label: 'Others' }
]

export default function FilterByVenue({ setDisplayedVenues }: AppProps) {
  return (
    <div className='w-[250px]'>
      <h3 className="mb-1 font-semibold white dark:text-white">Filter by venue:</h3>
      <Select 
        classNames={{
          menuList: () => 'text-black text-sm',
          control: () => 'text-black',
          multiValue: () => 'text-sm',
          multiValueRemove: () => 'text-cyan-950',
          valueContainer: () => 'text-sm',
        }}      
        isMulti
        options={options}
        className="basic-multi-select"
        defaultValue={options}
        isSearchable={false}
        noOptionsMessage={() => "All venues selected"}
        onChange={(data) => setDisplayedVenues(data.map((obj) => obj.value))}
      />
    </div>
  )
}