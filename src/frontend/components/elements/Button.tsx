import React from "react"

export const Button: React.FC<{ children: any, onClick: React.MouseEventHandler<HTMLButtonElement> | undefined, color?: string, disabled?: boolean }> = ({ onClick, children, disabled, color = "gray" }) => {
    return (
        <button onClick={onClick} disabled={disabled}
            className={`bg-gradient-to-r from-${color}-600 to-${color}-600 hover:from-gray-800 hover:to-gray-800 hover:opacity-70 text-white font-bold py-2 px-6 rounded-sm shadow-lg transform transition-transform duration-300 hover:scale-105 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} >
            {children}
        </button>
    )
}