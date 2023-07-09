'use client'

import React, { useState } from 'react';

type AppProps = {
  selectedOption: any,
  setSelectedOption: any,
}

const DisplayDropdown: React.FC<AppProps> = ({selectedOption, setSelectedOption}) => {
  const options = ['Polled', 'Subscribed', 'Polled and subscribed'];

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="inline-flex">
      <div className="relative inline-flex min-w-[200px] rounded-md border bg-white">
        <a
          href="avascript:void(0)"
          onClick={toggling}
          className="w-[100%] rounded-l-md px-4 py-2 text-sm text-gray-600 no-underline hover:bg-gray-50 hover:text-gray-700"
        >
          {selectedOption}
        </a>
        <div className="relative">
          <button
            type="button"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            className={`button-${isOpen ? 'danger' : 'success'}
               hover:text-gray-700' inline-flex h-full items-center justify-center rounded-r-md border-l border-gray-100 px-2 text-gray-600 hover:bg-gray-50`}
            onClick={toggling}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={(isOpen ? 'content show' : 'content', 'h-4 w-4')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="absolute top-6 right-0 z-10 mt-4 min-w-[200px] origin-top-right rounded-md border border-gray-100 bg-white shadow-lg">
            {options.map((option) => (
              <div>
                <a
                  href="avascript:void(0)"
                  onClick={onOptionClicked(option)}
                  key={Math.random()}
                  className="block rounded-lg px-4 py-2 text-sm text-gray-500 no-underline hover:bg-gray-50 hover:text-gray-700"
                >
                  {option}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayDropdown