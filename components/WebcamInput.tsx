
import React, { useRef, useEffect, useCallback } from 'react';
import type { Classification } from '../types';

interface WebcamInputProps {
  model: any;
  onPredict: (predictions: Classification[]) => void;
}

const WebcamInput: React.FC<WebcamInputProps> = ({ model, onPredict }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameId = useRef<number>();

  const predictLoop = useCallback(async () => {
    if (model && videoRef.current) {
      const predictions = await model.predict(videoRef.current);
      onPredict(predictions);
      animationFrameId.current = requestAnimationFrame(predictLoop);
    }
  }, [model, onPredict]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const setupWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadeddata', () => {
            animationFrameId.current = requestAnimationFrame(predictLoop);
          });
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    
    if (model) {
      setupWebcam();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [model, predictLoop]);

  return <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />;
};

export default WebcamInput;
