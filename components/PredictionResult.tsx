
import React from 'react';
import type { Classification, WasteTypeDetails } from '../types';

interface PredictionResultProps {
  prediction: Classification;
  details: WasteTypeDetails;
  onReportError: () => void;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, details, onReportError }) => {
  const confidence = Math.round(prediction.probability * 100);

  return (
    <div className={`p-4 rounded-lg border-l-4 ${details.borderColor} ${details.bgColor}`}>
      <div className="flex justify-between items-center mb-2">
        <span className={`font-heading font-bold text-xl ${details.color}`}>{details.label}</span>
        <span className={`text-lg font-semibold ${details.color}`}>{confidence}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${details.color.replace('text-', 'bg-')}`}
          style={{ width: `${confidence}%` }}
        ></div>
      </div>
      <div className="text-right mt-2">
        <button
          onClick={onReportError}
          className="text-xs text-gray-500 hover:text-red-600 hover:underline transition-colors"
        >
          AI nhận dạng sai?
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;
