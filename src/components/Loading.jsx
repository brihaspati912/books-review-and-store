import React from 'react'

function Loading({ text = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-gray-600">{text}</p>
        </div>
    )
}

export default Loading