export type ViewState = 
  | 'dashboard' 
  | 'org' 
  | 'attendance' 
  | 'payroll' 
  | 'recruitment' 
  | 'performance' 
  | 'analytics' 
  | 'efficiency'
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
  email?: string;
  phone?: string;
  location?: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired';
  rating: number; // 1-5
  source: string;
  matchScore?: number; // AI Match Score (0-100)
  appliedDate?: string;
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
  [key: string]: any;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'On Time' | 'Late' | 'Early Leave' | 'Absent';
  workHours: number;
  location?: string;
  device?: string;
}

export interface PayrollRecord {
  id: string;
  employeeName: string;
  role: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Pending' | 'Processing';
  payPeriod: string;
}

export interface PerformanceReview {
  id: string;
  employeeName: string;
  reviewer: string;
  cycle: string; // e.g., "Q1 2024"
  score: number; // 0-100
  status: 'Completed' | 'In Progress' | 'Not Started';
  feedback: string;
}

export interface DepartmentNode {
  id: string;
  name: string;
  manager: string;
  headcount: number;
  type: 'Business' | 'Admin' | 'Project';
  children?: DepartmentNode[];
  collapsed?: boolean;
}

export interface HRProcess {
  id: string;
  type: 'Onboarding' | 'Transfer' | 'Promotion' | 'Resignation';
  employeeName: string;
  department: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processing';
  currentStep: string;
}

export interface Contract {
  id: string;
  employeeName: string;
  contractType: 'Fixed Term' | 'Permanent' | 'Internship';
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  digitalSignature: boolean;
}

export interface RolePermission {
  id: string;
  roleName: string;
  usersCount: number;
  description: string;
  accessLevel: 'Full' | 'Read/Write' | 'Read Only';
}

export interface ShiftDefinition {
  id: string;
  code: string;
  name: string;
  time: string;
  color: string; // Tailwind color class for badge
}

export interface ScheduleRow {
  employeeId: string;
  employeeName: string;
  avatar: string;
  role: string;
  // Key is date string (e.g., '2024-03-01'), Value is ShiftDefinition ID
  shifts: { [key: string]: string }; 
}

export interface LeaveBalance {
  type: string; // Annual, Sick, Parental, etc.
  total: number;
  used: number;
  unit: 'Days' | 'Hours';
  color: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

export interface OvertimeRequest {
  id: string;
  employeeName: string;
  date: string;
  hours: number;
  compensation: 'Paid' | 'Time Off';
  status: 'Pending' | 'Approved';
  project: string;
}

export interface SalaryBand {
  id: string;
  level: string; // e.g., "L1 - Junior"
  min: number;
  mid: number;
  max: number;
  currency: string;
}

export interface PayrollBatch {
  id: string;
  period: string; // "Mar 2024"
  totalCost: number;
  status: 'Draft' | 'Processing' | 'Approved' | 'Distributed';
  employeesCount: number;
  runDate: string;
}

export interface PayrollAnomaly {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'High Variance' | 'Missing Data' | 'Tax Error';
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Published' | 'Draft' | 'Closed';
  applicantsCount: number;
  postedDate: string;
  channels: string[]; // ['LinkedIn', 'Indeed', 'Internal']
  hiringManager: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  type: 'Video' | 'On-site' | 'Phone';
  interviewer: string;
  status: 'Scheduled' | 'Completed' | 'Feedback Pending';
  meetingLink?: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: number; // years
  lastContact: string;
  status: 'Active' | 'Passive' | 'Blacklisted';
  aiActivationScore: number; // 0-100 likelihood to engage
  tags: string[]; // e.g., "Silver Medalist", "Alumni"
  location: string;
}

// --- Digital Human AI Types ---

export interface AIMessage {
  id: string;
  role: 'ai' | 'user';
  type: 'text' | 'grid-9box' | 'chart-turnover' | 'jd-draft' | 'options';
  content: string;
  timestamp: string;
  data?: any; // For rich content like charts or grids
}