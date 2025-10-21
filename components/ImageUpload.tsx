
import React, { useState, useRef, useCallback } from 'react';
import type { Classification } from '../types';
import { UploadIcon } from './icons';

interface ImageUploadProps {
  model: any;
  onPredict: (predictions: Classification[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ model, onPredict }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  }, []);

  const handleImageLoad = useCallback(async () => {
    if (imageRef.current && model) {
      const predictions = await model.predict(imageRef.current);
      onPredict(predictions);
    }
  }, [model, onPredict]);

  const triggerFileUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={triggerFileUpload}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {imageSrc ? (
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Preview"
          onLoad={handleImageLoad}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="text-center text-gray-400 p-8 border-2 border-dashed border-gray-600 rounded-lg">
          <UploadIcon className="h-12 w-12 mx-auto mb-2" />
          <p className="font-semibold">Nhấn để tải ảnh lên</p>
          <p className="text-sm">Hoặc kéo và thả ảnh vào đây</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
