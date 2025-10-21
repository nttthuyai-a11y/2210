
import React from 'react';
import type { WasteTypes } from '../types';

interface HistoryChartProps {
  history: string[];
  wasteTypes: WasteTypes;
}

const HistoryChart: React.FC<HistoryChartProps> = ({ history, wasteTypes }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-50 rounded-lg p-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold">Chưa có dữ liệu thống kê</h3>
        <p className="mt-2 max-w-sm">Hãy bắt đầu phân loại rác để xem biểu đồ thống kê tại đây.</p>
      </div>
    );
  }

  // FIX: Explicitly typed the reduce accumulator to ensure correct type inference.
  const counts = history.reduce<Record<string, number>>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(counts), 1);
  const wasteTypeKeys = Object.keys(wasteTypes);

  return (
    <div className="p-4 bg-gray-50 rounded-lg h-full flex flex-col">
      <h3 className="text-lg font-heading font-semibold text-gray-700 mb-4">Tổng số lần phân loại: {history.length}</h3>
      <div className="flex-grow flex items-end justify-around space-x-4">
        {wasteTypeKeys.map((key) => {
          const wasteType = wasteTypes[key as keyof WasteTypes];
          const count = counts[key] || 0;
          const barHeight = (count / maxCount) * 100;
          const bgColor = wasteType.color.replace('text-', 'bg-');

          return (
            <div key={key} className="flex flex-col items-center h-full w-1/4">
              <div className="text-lg font-bold text-gray-800">{count}</div>
              <div className="w-full h-full flex items-end justify-center pt-2">
                 <div
                    className={`w-3/4 max-w-md rounded-t-md ${bgColor}`}
                    style={{ height: `${barHeight}%`, transition: 'height 0.5s ease-in-out' }}
                    title={`${wasteType.label}: ${count} lần`}
                  ></div>
              </div>
              <div className={`mt-2 text-sm font-semibold text-center ${wasteType.color}`}>
                {wasteType.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryChart;