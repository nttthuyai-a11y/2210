import React, { useState } from 'react';
import type { ReportContent, WasteTypeDetails } from '../types';

interface ReportTabsProps {
  reportData: ReportContent;
  details: WasteTypeDetails;
}

type Tab = 'thuGom' | 'tacHai' | 'taiSuDung';

const TABS: { id: Tab, label: string }[] = [
  { id: 'thuGom', label: 'Thu Gom' },
  { id: 'tacHai', label: 'Tác Hại' },
  { id: 'taiSuDung', label: 'Tái Sử Dụng' },
];

const ReportTabs: React.FC<ReportTabsProps> = ({ reportData, details }) => {
  const [activeTab, setActiveTab] = useState<Tab>('thuGom');

  const activeColorClass = details.color.replace('text-', 'bg-');
  const activeBorderColorClass = details.borderColor.replace('border-', 'border-b-2 border-');
  const hoverColorClass = details.color.replace('text-', 'hover:bg-').replace('-600', '-200');


  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-heading font-medium text-base transition-colors ${
                activeTab === tab.id
                  ? `${activeBorderColorClass} ${details.color}`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        <div
          className="prose prose-sm max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: reportData[activeTab] }}
        />
      </div>

      {reportData.huongDan && (
        <div className="mt-2 p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-400">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L10 9.414l.293.293a1 1 0 001.414-1.414l-1-1z" clipRule="evenodd" />
                <path d="M10 4a1 1 0 100-2 1 1 0 000 2zM8 11a1 1 0 112 0v3a1 1 0 11-2 0v-3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-heading font-semibold text-yellow-800">Hướng dẫn & Lưu ý</h3>
              <div
                className="mt-1 text-sm text-yellow-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: reportData.huongDan }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportTabs;