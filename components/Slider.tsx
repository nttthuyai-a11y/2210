
import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label htmlFor="confidence-slider" className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
        <span>{label}</span>
        <span className="font-bold text-green-600 text-base">{value}%</span>
      </label>
      <input
        id="confidence-slider"
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
      />
    </div>
  );
};

export default Slider;
