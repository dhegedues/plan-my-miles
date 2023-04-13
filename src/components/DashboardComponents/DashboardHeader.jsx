import { PencilIcon } from '@heroicons/react/20/solid';

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-5 sm:px-6">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Seat Ibiza
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Edit
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader;