
import React from 'react';
import type { Classification, WasteTypes } from '../types';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (correctClass: string) => void;
  prediction: Classification | null;
  wasteTypes: WasteTypes;
}

const CorrectionModal: React.FC<CorrectionModalProps> = ({ isOpen, onClose, onSubmit, prediction, wasteTypes }) => {
  if (!isOpen || !prediction) {
    return null;
  }

  const incorrectLabel = wasteTypes[prediction.className as keyof WasteTypes]?.label || prediction.className;
  const possibleCorrectClasses = Object.keys(wasteTypes).filter(key => key !== prediction.className);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-heading font-bold text-gray-800 mb-2">Báo cáo nhận dạng sai</h2>
        <p className="text-gray-600 mb-4">
          AI đã nhận dạng là <strong className={`font-semibold ${wasteTypes[prediction.className as keyof WasteTypes]?.color}`}>{incorrectLabel}</strong>.
          <br/>
          Theo bạn, đây là loại rác nào?
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {possibleCorrectClasses.map(className => {
            const details = wasteTypes[className as keyof WasteTypes];
            return (
              <button
                key={className}
                onClick={() => onSubmit(className)}
                className={`w-full p-3 rounded-lg font-semibold border-2 transition-all duration-200 ${details.borderColor} ${details.bgColor} ${details.color} hover:shadow-md`}
              >
                {details.label}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrectionModal;
