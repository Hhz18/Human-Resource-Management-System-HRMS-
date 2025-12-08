export type ViewState = 'dashboard' | 'org' | 'recruitment' | 'analytics' | 'efficiency' | 'apaas' | 'attendance' | 'payroll' | 'performance' | 'settings';

export interface DepartmentNode {
  id: string;
  name: string;
  manager: string;
  headcount: number;
  type: 'Business' | 'Admin' | 'Project';
  children?: DepartmentNode[];
  collapsed?: boolean;
  secondaryManager?: string;
  isLegalEntity?: boolean;
  entityCode?: string;
}

export interface HRProcess {
  id: string;
  name: string;
  owner: string;
  status: 'Active' | 'Draft' | 'Archived';
  steps: number;
  lastUpdated: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'ai';
  type: 'text' | 'grid-9box' | 'chart-turnover' | 'jd-draft';
  content: string;
  timestamp: string;
  data?: any;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  avatar: string;
  email: string;
  location: string;
}

export interface Contract {
  id: string;
  employeeName: string;
  type: 'Permanent' | 'Fixed Term' | 'Contractor';
  status: 'Active' | 'Expiring' | 'Pending' | 'Signed';
  startDate: string;
  endDate?: string;
}

export interface RolePermission {
  id: string;
  role: string;
  usersCount: number;
  modules: string[];
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired';
  matchScore?: number;
  rating: number;
  source: string;
  appliedDate: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  applicantsCount: number;
  status: 'Published' | 'Draft' | 'Closed';
  channels: string[];
}

export interface Interview {
  id: string;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  interviewer: string;
  type: 'Video' | 'On-site';
  meetingLink?: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: number;
  location: string;
  lastContact: string;
  aiActivationScore: number;
  tags: string[];
}

export interface ShiftDefinition {
  id: string;
  name: string;
  code: string;
  color: string;
  startTime: string;
  endTime: string;
}

export interface PayrollRecord {
  id: string;
  employeeName: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'Calculated' | 'Pending';
}

export interface PerformanceReview {
  id: string;
  employeeName: string;
  reviewer: string;
  score: number;
  status: 'Completed' | 'In Progress' | 'Pending';
  feedback: string;
  cycle: string;
}
