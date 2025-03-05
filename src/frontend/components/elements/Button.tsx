import React from "react"

export const Button: React.FC<{ children: any, onClick: React.MouseEventHandler<HTMLButtonElement> | undefined, color?: string, disabled?: boolean }> = ({ onClick, children, disabled, color }) => {
    console.log(`${typeof color}`, color)
    return (
        <button onClick={onClick} disabled={disabled}
            className={`bg-gradient-to-r ${color === 'red' ? 'bg-red-700' : color === 'gray' ? 'bg-gray-500' : ''} hover:from-gray-600 hover:to-gray-600 hover:opacity-70 text-white font-bold py-2 px-6 rounded-sm shadow-lg transform transition-transform duration-300 hover:scale-105 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} >
            {children}
        </button>
    )
}