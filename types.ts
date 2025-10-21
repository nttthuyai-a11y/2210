
export interface Classification {
  className: string;
  probability: number;
}

export interface ReportContent {
  thuGom: string;
  tacHai: string;
  taiSuDung: string;
  huongDan: string;
}

export interface WasteTypeDetails {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export type ReportData = {
  [key in 'taiche' | 'huuco' | 'voco' | 'honhop']: ReportContent;
};

export type WasteTypes = {
  [key in 'taiche' | 'huuco' | 'voco' | 'honhop']: WasteTypeDetails;
};

export interface MisclassificationReport {
  incorrect: string;
  correct: string;
}
