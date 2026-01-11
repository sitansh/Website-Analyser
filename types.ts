
export interface AnalysisResult {
  performanceScore: number;
  fcp: string;
  lcp: string;
  tbt: string;
  speedIndex: string;
  timestamp: string;
  url: string;
  advice: string;
}

export interface PythonFile {
  name: string;
  content: string;
  language: string;
  description: string;
}

export enum TabType {
  PROJECT_INFO = 'PROJECT_INFO',
  SOURCE_CODE = 'SOURCE_CODE',
  SIMULATOR = 'SIMULATOR',
  VIVA_PREP = 'VIVA_PREP',
  PRESENTATION = 'PRESENTATION'
}
