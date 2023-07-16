import React from 'react';
import Select from 'react-select';

type AppProps = {
  setDisplayedCategories: any,
}

const options = [
  { value: 'Arts', label: 'Arts' },
  { value: 'Cogpods', label: 'Cogpods' },
  { value: 'Community Service', label: 'Community Service' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Sports', label: 'Sports' }
]

export default function FilterByCategory({ setDisplayedCategories }: AppProps) {
  return (
    <div className='w-[250px] pb-[188px]'>
      <h3 className="mb-1 font-semibold white dark:text-white">Filter by category:</h3>
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
        noOptionsMessage={() => "All categories selected"}
        onChange={(data) => setDisplayedCategories(data.map((obj) => obj.value))}
      />
    </div>
  )
}