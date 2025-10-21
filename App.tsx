
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Classification, MisclassificationReport } from './types';
import { TM_URL, REPORT_DATA, WASTE_TYPES } from './constants';
import WebcamInput from './components/WebcamInput';
import ImageUpload from './components/ImageUpload';
import PredictionResult from './components/PredictionResult';
import ReportTabs from './components/ReportTabs';
import Slider from './components/Slider';
import { CameraIcon, UploadIcon, LogoIcon } from './components/icons';
import DetailedPredictions from './components/DetailedPredictions';
import HistoryChart from './components/HistoryChart';
import CorrectionModal from './components/CorrectionModal';
import MisclassificationReportComponent from './components/MisclassificationReport';


// Declare teachablemachine-image on the window object
declare global {
  interface Window {
    tmImage: any;
  }
}

const App: React.FC = () => {
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState<string>('Đang tải mô hình AI...');
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'webcam' | 'upload'>('webcam');
  const [predictions, setPredictions] = useState<Classification[]>([]);
  const [threshold, setThreshold] = useState<number>(80);
  
  // State for statistics
  const [classificationHistory, setClassificationHistory] = useState<string[]>([]);
  const [misclassificationReports, setMisclassificationReports] = useState<MisclassificationReport[]>([]);
  
  // State for UI control
  const [activeResultTab, setActiveResultTab] = useState<'current' | 'history' | 'errors'>('current');
  const [isReportingModalOpen, setReportingModalOpen] = useState(false);
  const [predictionToReport, setPredictionToReport] = useState<Classification | null>(null);

  const lastPredictionRef = useRef<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setError(null);
        const modelURL = `${TM_URL}model.json`;
        const metadataURL = `${TM_URL}metadata.json`;
        const loadedModel = await window.tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setLoading('');
      } catch (err) {
        console.error("Model loading error:", err);
        setError('Không thể tải mô hình AI. Vui lòng kiểm tra kết nối mạng và thử lại.');
        setLoading('');
      }
    };
    loadModel();
  }, []);

  const handlePrediction = useCallback((newPredictions: Classification[]) => {
    setPredictions(newPredictions);
  }, []);

  const highestPrediction = useMemo(() => {
    if (predictions.length === 0) return null;
    const bestMatch = predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);
    
    if (bestMatch.probability * 100 >= threshold && bestMatch.className !== 'nothing') {
      return bestMatch;
    }
    return null;
  }, [predictions, threshold]);
  
  // Effect to update classification history
  useEffect(() => {
    if (highestPrediction && highestPrediction.className !== lastPredictionRef.current) {
      setClassificationHistory(prev => [...prev, highestPrediction.className]);
      lastPredictionRef.current = highestPrediction.className;
    }
    if (!highestPrediction) {
      lastPredictionRef.current = null;
    }
  }, [highestPrediction]);

  // Handlers for misclassification reporting
  const handleOpenReportModal = () => {
    if (highestPrediction) {
      setPredictionToReport(highestPrediction);
      setReportingModalOpen(true);
    }
  };

  const handleCloseReportModal = () => {
    setReportingModalOpen(false);
    setPredictionToReport(null);
  };

  const handleSubmitReport = (correctClass: string) => {
    if (predictionToReport) {
      const newReport: MisclassificationReport = {
        incorrect: predictionToReport.className,
        correct: correctClass,
      };
      setMisclassificationReports(prev => [...prev, newReport]);
    }
    handleCloseReportModal();
  };


  const wasteTypeDetails = highestPrediction ? WASTE_TYPES[highestPrediction.className as keyof typeof WASTE_TYPES] : null;

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LogoIcon className="h-10 w-10 text-green-600" />
          <h1 className="text-2xl font-heading font-bold text-gray-700">AI Phân Loại Rác Thải</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel: Input */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setInputMode('webcam')}
                className={`flex-1 py-3 text-center font-heading font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${inputMode === 'webcam' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <CameraIcon className="h-5 w-5" />
                <span>Dùng Webcam</span>
              </button>
              <button
                onClick={() => setInputMode('upload')}
                className={`flex-1 py-3 text-center font-heading font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${inputMode === 'upload' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <UploadIcon className="h-5 w-5" />
                <span>Tải Ảnh Lên</span>
              </button>
            </div>

            <div className="flex-grow flex items-center justify-center relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
              {loading && <div className="text-white text-lg font-medium animate-pulse">{loading}</div>}
              {error && <div className="text-red-400 p-4 text-center">{error}</div>}
              {!loading && !error && (
                <>
                  {inputMode === 'webcam' && model && <WebcamInput model={model} onPredict={handlePrediction} />}
                  {inputMode === 'upload' && model && <ImageUpload model={model} onPredict={handlePrediction} />}
                </>
              )}
            </div>
            
            <div className="mt-6">
              <Slider
                label="Ngưỡng tin cậy"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Right Panel: Results */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col">
            <h2 className="text-2xl font-heading font-bold mb-4 text-gray-700">Kết quả Phân loại</h2>
            
            {/* Result Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveResultTab('current')}
                className={`flex-1 py-2 text-center font-heading font-medium text-sm transition-all duration-300 ${activeResultTab === 'current' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Kết quả Hiện tại
              </button>
              <button
                onClick={() => setActiveResultTab('history')}
                className={`flex-1 py-2 text-center font-heading font-medium text-sm transition-all duration-300 ${activeResultTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Thống kê
              </button>
              <button
                onClick={() => setActiveResultTab('errors')}
                className={`flex-1 py-2 text-center font-heading font-medium text-sm transition-all duration-300 ${activeResultTab === 'errors' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Nhận dạng Sai
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-grow">
            {activeResultTab === 'current' && (
              <>
                {predictions.length > 0 ? (
                  <div className="space-y-6">
                    {highestPrediction && wasteTypeDetails ? (
                      <>
                        <PredictionResult prediction={highestPrediction} details={wasteTypeDetails} onReportError={handleOpenReportModal} />
                        <DetailedPredictions predictions={predictions} />
                        <ReportTabs reportData={REPORT_DATA[highestPrediction.className as keyof typeof REPORT_DATA]} details={wasteTypeDetails} />
                      </>
                    ) : (
                      <>
                        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-600">Không có kết quả nào vượt ngưỡng</p>
                          <p className="text-sm text-gray-500 mt-1">Đối tượng không được nhận dạng hoặc có độ tin cậy thấp hơn {threshold}%.</p>
                        </div>
                        <DetailedPredictions predictions={predictions} />
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-50 rounded-lg p-8">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-heading font-semibold">Chưa nhận dạng được rác</h3>
                    <p className="mt-2 max-w-sm">Hãy đưa rác vào trước camera hoặc tải lên một hình ảnh rõ nét để AI có thể phân loại.</p>
                  </div>
                )}
              </>
            )}
            {activeResultTab === 'history' && (
              <HistoryChart history={classificationHistory} wasteTypes={WASTE_TYPES} />
            )}
            {activeResultTab === 'errors' && (
              <MisclassificationReportComponent reports={misclassificationReports} wasteTypes={WASTE_TYPES} />
            )}
            </div>
          </div>
        </div>
      </main>
      
      <CorrectionModal
        isOpen={isReportingModalOpen}
        onClose={handleCloseReportModal}
        onSubmit={handleSubmitReport}
        prediction={predictionToReport}
        wasteTypes={WASTE_TYPES}
      />
    </div>
  );
};

export default App;
