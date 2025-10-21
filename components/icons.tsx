
import React from 'react';

export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M11.92 3.535a.75.75 0 01.16 1.05l-4.25 6.5a.75.75 0 01-1.21-.08L3.5 6.535a.75.75 0 011.05-1.05l2.39 2.39L9.5 3.535a.75.75 0 011.21.08l1.21 2.42 2.39-2.39a.75.75 0 011.05 1.05l-4.25 6.5a.75.75 0 01-1.21-.08L9.5 8.465l-1.21 2.42a.75.75 0 01-1.21-.08l-4.25-6.5a.75.75 0 011.05-1.05l2.39 2.39L9.5 3.535a.75.75 0 011.21.08z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5z" clipRule="evenodd" />
        <path d="M12.75 11.25a.75.75 0 00-1.5 0v2.39l-2.47-2.47a.75.75 0 00-1.06 1.06L10.19 14.7l-2.47 2.47a.75.75 0 101.06 1.06L11.25 15.78v2.39a.75.75 0 001.5 0v-2.39l2.47 2.47a.75.75 0 101.06-1.06L13.81 14.7l2.47-2.47a.75.75 0 00-1.06-1.06L12.75 13.64v-2.39z" />
    </svg>
);
