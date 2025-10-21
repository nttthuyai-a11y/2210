
import React from 'react';
import type { Classification } from '../types';
import { ALL_CLASSES_LABELS } from '../constants';

interface DetailedPredictionsProps {
  predictions: Classification[];
}

const DetailedPredictions: React.FC<DetailedPredictionsProps> = ({ predictions }) => {
  if (predictions.length === 0) {
    return null;
  }

  const predictionMap = new Map(predictions.map(p => [p.className, p.probability]));
  
  const allClassNames = Object.keys(ALL_CLASSES_LABELS);

  // Find the class with the highest probability to highlight it
  const highestPrediction: Classification = predictions.reduce((prev, current) => 
    (prev.probability > current.probability) ? prev : current
  , { className: '', probability: 0 });

  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-200">
      <h3 className="text-lg font-heading font-semibold text-gray-600 mb-3">Phân tích chi tiết</h3>
      <div className="space-y-3">
        {allClassNames.map((className) => {
          const probability = predictionMap.get(className) || 0;
          const percentage = Math.round(probability * 100);
          const label = ALL_CLASSES_LABELS[className];
          const isHighest = className === highestPrediction.className && highestPrediction.probability > 0;

          return (
            <div key={className}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className={`font-medium ${isHighest ? 'text-green-600' : 'text-gray-700'}`}>{label}</span>
                <span className={`font-semibold ${isHighest ? 'text-green-600' : 'text-gray-500'}`}>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-200 ease-in-out ${isHighest ? 'bg-green-500' : 'bg-gray-400'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedPredictions;