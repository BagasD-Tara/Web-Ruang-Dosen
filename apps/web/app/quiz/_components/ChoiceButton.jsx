"use client";

export default function ChoiceButton({ label, text, isSelected, onClick, type = 'single' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-4 border rounded-xl mb-3 transition-all duration-200 text-left
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 bg-white'
        }`}
    >
      <div 
        className={`flex items-center justify-center w-8 h-8 font-bold mr-4 shrink-0 transition-colors
          ${type === 'single' ? 'rounded-full' : 'rounded-md'} 
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
        `}
      >
        {label}
      </div>
      <span className={`text-sm md:text-base ${isSelected ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>
        {text}
      </span>
    </button>
  );
}