export type ViewState = 
  | 'dashboard' 
  | 'org' 
  | 'attendance' 
  | 'payroll' 
  | 'recruitment' 
  | 'performance' 
  | 'analytics' 
  | 'apaas'
  | 'settings';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  avatar: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired';
  rating: number; // 1-5
  source: string;
}

export interface KpiMetric {
  label: string;
  value: string;
  trend: number; // percentage
  trendDirection: 'up' | 'down';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}
