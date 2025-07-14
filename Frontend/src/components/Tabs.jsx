import React from 'react'

const Tabs = (props) => {

  const { filter, setFilter, deleteCompleted } = props

  return (
    <div className='flex  justify-between mt-8'>
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md cursor-pointer ${filter === "all" ? "bg-[#00223e] text-white" : "bg-gray-200"
            }`}
        >
          All Todos
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-md cursor-pointer ${filter === "active" ? "bg-[#00223e] text-white" : "bg-gray-200"
            }`}
        >
          Active Todos
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md cursor-pointer ${filter === "completed" ? "bg-[#00223e] text-white" : "bg-gray-200"
            }`}
        >
          Completed Todos
        </button>
      </div>

      <div>
        <button
        className='bg-red-600 text-white  px-4 py-2 rounded-md cursor-pointer hover:bg-red-700'
        onClick={deleteCompleted}
        >
          Delete Completed
        </button>
      </div>
    </div>
  )
}

export default Tabs
