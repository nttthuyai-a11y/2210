
import React from 'react';
import type { MisclassificationReport, WasteTypes } from '../types';

interface MisclassificationReportProps {
  reports: MisclassificationReport[];
  wasteTypes: WasteTypes;
}

const MisclassificationReportComponent: React.FC<MisclassificationReportProps> = ({ reports, wasteTypes }) => {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-50 rounded-lg p-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold">Chưa có báo cáo nào</h3>
        <p className="mt-2 max-w-sm">Khi bạn báo cáo một nhận dạng sai, thống kê sẽ được hiển thị tại đây.</p>
      </div>
    );
  }

  // FIX: Explicitly typed the reduce accumulator to ensure correct type inference for reportCounts.
  const reportCounts = reports.reduce<Record<string, number>>((acc, { incorrect, correct }) => {
    const key = `${incorrect}->${correct}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const sortedReports = Object.entries(reportCounts).sort(([, countA], [, countB]) => countB - countA);

  return (
    <div className="p-4 bg-gray-50 rounded-lg h-full flex flex-col">
      <h3 className="text-lg font-heading font-semibold text-gray-700 mb-4">Tổng số báo cáo: {reports.length}</h3>
      <div className="overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Nhận Dạng</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người Dùng Sửa</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Số Lần</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedReports.map(([key, count]) => {
              const [incorrect, correct] = key.split('->');
              const incorrectDetails = wasteTypes[incorrect as keyof WasteTypes];
              const correctDetails = wasteTypes[correct as keyof WasteTypes];

              return (
                <tr key={key}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${incorrectDetails.bgColor} ${incorrectDetails.color}`}>
                      {incorrectDetails.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${correctDetails.bgColor} ${correctDetails.color}`}>
                      {correctDetails.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-gray-700">{count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MisclassificationReportComponent;