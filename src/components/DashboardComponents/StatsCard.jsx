import { useState, useRef, useEffect } from 'react';
import { PencilIcon, CheckIcon } from '@heroicons/react/20/solid';

function StatsCard({cardData, mileageUnit}) {

  const staticInfo = () => {
    return (
      <dl>
        <dt className="text-sm font-medium text-gray-500">{cardData.name}</dt>
        <dd>
          <span className="font-semibold text-xl sm:text-2xl text-gray-900">{cardData.amount}</span>
          <span className="ml-1 font-light text-gray-500 text-lg">{mileageUnit}</span>
        </dd>
      </dl>
    )
  }

  const editableInfo = () => {
    return (
      <div className="">
        <label htmlFor={cardData.name} className="block text-sm font-medium text-gray-500 m-0 p-0">{cardData.name}</label>
        <div className="grid">
          <input
            type="number"
            name={cardData.name}
            id={cardData.name}
            value={cardData.amount !== 0 ? cardData.amount : ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus={currentlyEditing}
            className="w-5/6 text-gray-900 font-semibold text-xl sm:text-2xl p-0 border-none focus:ring-0 focus:border-b-2 focus:border-b-red-600"/>
        </div>
      </div>
    )
  }

  const [currentlyEditing, setCurrentlyEditing] = useState(false);

  const handleInputChange = (event) => {
    cardData.editAction(Number(event.target.value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      toggleEditing();
    }
  }

  const toggleEditing = () => {
    setCurrentlyEditing(!currentlyEditing);
  }

  useEffect(() => {
    const stopEditingOnFocusout = () => {
      setCurrentlyEditing(false);
    }

    if (currentlyEditing) {
      document.addEventListener('focusout', stopEditingOnFocusout);
    }
    
    return () => {
      document.removeEventListener('focusout', stopEditingOnFocusout);
    }
  }, [currentlyEditing])

  return (
    <div
      key={cardData.name} 
      className={`overflow-hidden rounded-lg bg-white shadow ${currentlyEditing && 'ring-2 ring-inset ring-indigo-600'}`}
    >
      <div className="p-3 xs:p-4 sm:p-5 flex items-center justify-between">
        {currentlyEditing
          ? editableInfo()
          : staticInfo()
        }
        {cardData.editAction && 
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-white p-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
            onClick={toggleEditing}
          >
          {currentlyEditing
            ? <CheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            : <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          }
          </button>
        }
      </div>
    </div>
  )
}

export default StatsCard