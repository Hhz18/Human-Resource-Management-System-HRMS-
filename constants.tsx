import { ChartDataPoint, Employee, Candidate, AttendanceRecord, PayrollRecord, PerformanceReview, DepartmentNode, HRProcess, Contract, RolePermission, ShiftDefinition, ScheduleRow, LeaveBalance, LeaveRequest, OvertimeRequest, SalaryBand, PayrollBatch, PayrollAnomaly, JobPosting, Interview, TalentProfile } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Sarah Lin', role: 'Senior UX Designer', department: 'Product', status: 'Active', joinDate: '2022-03-15', avatar: 'https://picsum.photos/200/200?random=1', email: 'sarah.lin@astra.com', phone: '+1 (555) 123-4567', location: 'San Francisco' },
  { id: '2', name: 'Michael Chen', role: 'Engineering Manager', department: 'R&D', status: 'Active', joinDate: '2021-06-01', avatar: 'https://picsum.photos/200/200?random=2', email: 'm.chen@astra.com', phone: '+1 (555) 234-5678', location: 'New York' },
  { id: '3', name: 'Jessica Davis', role: 'HR Specialist', department: 'People Ops', status: 'On Leave', joinDate: '2023-01-10', avatar: 'https://picsum.photos/200/200?random=3', email: 'j.davis@astra.com', phone: '+1 (555) 345-6789', location: 'San Francisco' },
  { id: '4', name: 'David Kim', role: 'Backend Engineer', department: 'R&D', status: 'Active', joinDate: '2023-05-20', avatar: 'https://picsum.photos/200/200?random=4', email: 'd.kim@astra.com', phone: '+1 (555) 456-7890', location: 'Remote' },
  { id: '5', name: 'Amanda Lo', role: 'Sales Director', department: 'Sales', status: 'Active', joinDate: '2020-11-11', avatar: 'https://picsum.photos/200/200?random=5', email: 'a.lo@astra.com', phone: '+1 (555) 567-8901', location: 'Chicago' },
];

export const MOCK_CANDIDATES: Candidate[] = [
  { id: 'c1', name: 'Alex Johnson', role: 'Product Manager', stage: 'Screening', rating: 4, source: 'LinkedIn', matchScore: 92, appliedDate: '2024-03-15' },
  { id: 'c2', name: 'Sam Smith', role: 'Frontend Dev', stage: 'New', rating: 0, source: 'Referral', matchScore: 45, appliedDate: '2024-03-18' },
  { id: 'c3', name: 'Maria Garcia', role: 'Product Manager', stage: 'Interview', rating: 5, source: 'Indeed', matchScore: 98, appliedDate: '2024-03-10' },
  { id: 'c4', name: 'Robert Ford', role: 'Data Scientist', stage: 'Offer', rating: 4.5, source: 'Agency', matchScore: 88, appliedDate: '2024-03-01' },
  { id: 'c5', name: 'Linda Wu', role: 'Frontend Dev', stage: 'New', rating: 3, source: 'Website', matchScore: 65, appliedDate: '2024-03-19' },
];

export const TURNOVER_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 2.1 },
  { name: 'Feb', value: 1.8 },
  { name: 'Mar', value: 2.5 },
  { name: 'Apr', value: 1.5 },
  { name: 'May', value: 1.2 },
  { name: 'Jun', value: 1.0 },
];

export const HEADCOUNT_DATA: ChartDataPoint[] = [
  { name: 'R&D', value: 45 },
  { name: 'Sales', value: 30 },
  { name: 'Product', value: 15 },
  { name: 'HR', value: 8 },
  { name: 'Finance', value: 6 },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', employeeName: 'Sarah Lin', date: '2024-03-20', checkIn: '08:55', checkOut: '18:05', status: 'On Time', workHours: 9.1, location: 'Office HQ', device: 'Face ID' },
  { id: 'a2', employeeName: 'Michael Chen', date: '2024-03-20', checkIn: '09:15', checkOut: '18:30', status: 'Late', workHours: 9.2, location: 'Office HQ', device: 'Card' },
  { id: 'a3', employeeName: 'David Kim', date: '2024-03-20', checkIn: '08:45', checkOut: '17:50', status: 'On Time', workHours: 9.0, location: 'Remote', device: 'Web' },
  { id: 'a4', employeeName: 'Amanda Lo', date: '2024-03-20', checkIn: '-', checkOut: '-', status: 'Absent', workHours: 0, location: '-', device: '-' },
  { id: 'a5', employeeName: 'Jessica Davis', date: '2024-03-20', checkIn: '09:00', checkOut: '15:00', status: 'Early Leave', workHours: 6.0, location: 'Office HQ', device: 'Face ID' },
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  { id: 'p1', employeeName: 'Sarah Lin', role: 'Senior UX Designer', baseSalary: 8500, bonus: 500, deductions: 1200, netPay: 7800, status: 'Paid', payPeriod: 'Mar 2024' },
  { id: 'p2', employeeName: 'Michael Chen', role: 'Engineering Manager', baseSalary: 12000, bonus: 2000, deductions: 2500, netPay: 11500, status: 'Paid', payPeriod: 'Mar 2024' },
  { id: 'p3', employeeName: 'David Kim', role: 'Backend Engineer', baseSalary: 7500, bonus: 200, deductions: 1100, netPay: 6600, status: 'Processing', payPeriod: 'Mar 2024' },
  { id: 'p4', employeeName: 'Amanda Lo', role: 'Sales Director', baseSalary: 10000, bonus: 4000, deductions: 2000, netPay: 12000, status: 'Pending', payPeriod: 'Mar 2024' },
];

export const MOCK_PERFORMANCE: PerformanceReview[] = [
  { id: 'pf1', employeeName: 'Sarah Lin', reviewer: 'Michael Chen', cycle: 'Q1 2024', score: 92, status: 'Completed', feedback: 'Exceptional design leadership.' },
  { id: 'pf2', employeeName: 'David Kim', reviewer: 'Michael Chen', cycle: 'Q1 2024', score: 85, status: 'Completed', feedback: 'Solid code quality, needs more communication.' },
  { id: 'pf3', employeeName: 'Amanda Lo', reviewer: 'CEO', cycle: 'Q1 2024', score: 0, status: 'In Progress', feedback: 'Pending sales target review.' },
];

export const MOCK_ORG_TREE: DepartmentNode[] = [
  {
    id: 'd1', name: 'CEO Office', manager: 'Eleanor Pena', headcount: 120, type: 'Business',
    children: [
      {
        id: 'd2', name: 'Product & Engineering', manager: 'Michael Chen', headcount: 60, type: 'Business',
        children: [
            { id: 'd2-1', name: 'Product Design', manager: 'Sarah Lin', headcount: 12, type: 'Business' },
            { id: 'd2-2', name: 'Backend Dev', manager: 'David Kim', headcount: 24, type: 'Business' },
            { id: 'd2-3', name: 'Frontend Dev', manager: 'Sam Smith', headcount: 18, type: 'Business' },
        ]
      },
      {
        id: 'd3', name: 'Sales & Marketing', manager: 'Amanda Lo', headcount: 45, type: 'Business',
        children: [
            { id: 'd3-1', name: 'Enterprise Sales', manager: 'John Doe', headcount: 20, type: 'Business' },
            { id: 'd3-2', name: 'Growth Marketing', manager: 'Jane Doe', headcount: 15, type: 'Business' },
        ]
      },
      {
        id: 'd4', name: 'Operations', manager: 'Jessica Davis', headcount: 15, type: 'Admin',
        children: [
            { id: 'd4-1', name: 'People Ops (HR)', manager: 'Jessica Davis', headcount: 8, type: 'Admin' },
            { id: 'd4-2', name: 'Finance', manager: 'Robert Fox', headcount: 7, type: 'Admin' },
        ]
      }
    ]
  }
];

export const MOCK_HR_PROCESSES: HRProcess[] = [
    { id: 'pr1', type: 'Onboarding', employeeName: 'Alice Wang', department: 'Product Design', requestDate: '2024-03-20', status: 'Pending', currentStep: 'IT Equipment' },
    { id: 'pr2', type: 'Promotion', employeeName: 'David Kim', department: 'R&D', requestDate: '2024-03-18', status: 'Approved', currentStep: 'Completed' },
    { id: 'pr3', type: 'Transfer', employeeName: 'Tom Wilson', department: 'Sales', requestDate: '2024-03-19', status: 'Processing', currentStep: 'Department Head Review' },
    { id: 'pr4', type: 'Resignation', employeeName: 'Emily Clark', department: 'Marketing', requestDate: '2024-03-15', status: 'Pending', currentStep: 'Exit Interview' },
];

export const MOCK_CONTRACTS: Contract[] = [
    { id: 'ct1', employeeName: 'Sarah Lin', contractType: 'Permanent', startDate: '2022-03-15', endDate: '2025-03-15', status: 'Active', digitalSignature: true },
    { id: 'ct2', employeeName: 'Michael Chen', contractType: 'Permanent', startDate: '2021-06-01', endDate: '2024-06-01', status: 'Expiring Soon', digitalSignature: true },
    { id: 'ct3', employeeName: 'Intern #24', contractType: 'Internship', startDate: '2024-01-01', endDate: '2024-04-01', status: 'Expiring Soon', digitalSignature: false },
    { id: 'ct4', employeeName: 'Amanda Lo', contractType: 'Permanent', startDate: '2020-11-11', endDate: '2026-11-11', status: 'Active', digitalSignature: true },
];

export const MOCK_ROLES: RolePermission[] = [
    { id: 'r1', roleName: 'Super Admin', usersCount: 3, description: 'Full system access', accessLevel: 'Full' },
    { id: 'r2', roleName: 'HR Manager', usersCount: 5, description: 'Manage employees, payroll, and recruiting', accessLevel: 'Read/Write' },
    { id: 'r3', roleName: 'Department Head', usersCount: 12, description: 'View and manage direct reports', accessLevel: 'Read/Write' },
    { id: 'r4', roleName: 'Employee', usersCount: 120, description: 'Self-service portal access only', accessLevel: 'Read Only' },
];

export const SHIFT_DEFINITIONS: ShiftDefinition[] = [
    { id: 's1', code: 'D', name: 'Day Shift', time: '09:00 - 18:00', color: 'bg-blue-100 text-blue-700' },
    { id: 's2', code: 'N', name: 'Night Shift', time: '20:00 - 05:00', color: 'bg-indigo-100 text-indigo-700' },
    { id: 's3', code: 'X', name: 'Rest Day', time: '-', color: 'bg-slate-100 text-slate-500' },
    { id: 's4', code: 'H', name: 'Holiday', time: '-', color: 'bg-emerald-100 text-emerald-700' },
];

export const SCHEDULE_DATA: ScheduleRow[] = [
    { 
        employeeId: '1', employeeName: 'Sarah Lin', role: 'Designer', avatar: 'https://picsum.photos/200/200?random=1',
        shifts: { '01': 's1', '02': 's1', '03': 's1', '04': 's1', '05': 's1', '06': 's3', '07': 's3' }
    },
    { 
        employeeId: '2', employeeName: 'Michael Chen', role: 'Manager', avatar: 'https://picsum.photos/200/200?random=2',
        shifts: { '01': 's1', '02': 's1', '03': 's1', '04': 's1', '05': 's1', '06': 's1', '07': 's3' }
    },
    { 
        employeeId: '4', employeeName: 'David Kim', role: 'Engineer', avatar: 'https://picsum.photos/200/200?random=4',
        shifts: { '01': 's2', '02': 's2', '03': 's2', '04': 's2', '05': 's2', '06': 's3', '07': 's3' }
    },
];

export const LEAVE_BALANCES: LeaveBalance[] = [
    { type: 'Annual Leave', total: 15, used: 5, unit: 'Days', color: 'bg-blue-500' },
    { type: 'Sick Leave', total: 10, used: 2, unit: 'Days', color: 'bg-emerald-500' },
    { type: 'Compensatory', total: 40, used: 0, unit: 'Hours', color: 'bg-orange-500' },
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
    { id: 'lr1', employeeName: 'Sarah Lin', type: 'Annual Leave', startDate: '2024-04-01', endDate: '2024-04-05', days: 5, status: 'Pending', reason: 'Family vacation' },
    { id: 'lr2', employeeName: 'David Kim', type: 'Sick Leave', startDate: '2024-03-10', endDate: '2024-03-10', days: 1, status: 'Approved', reason: 'Flu' },
];

export const OVERTIME_REQUESTS: OvertimeRequest[] = [
    { id: 'or1', employeeName: 'Michael Chen', date: '2024-03-15', hours: 4, compensation: 'Paid', status: 'Approved', project: 'Q1 Release' },
    { id: 'or2', employeeName: 'David Kim', date: '2024-03-18', hours: 3, compensation: 'Time Off', status: 'Pending', project: 'Server Maintenance' },
];

export const MOCK_SALARY_BANDS: SalaryBand[] = [
    { id: 'sb1', level: 'L1 - Entry', min: 45000, mid: 55000, max: 65000, currency: 'USD' },
    { id: 'sb2', level: 'L2 - Junior', min: 60000, mid: 75000, max: 90000, currency: 'USD' },
    { id: 'sb3', level: 'L3 - Senior', min: 90000, mid: 110000, max: 130000, currency: 'USD' },
    { id: 'sb4', level: 'L4 - Lead', min: 120000, mid: 145000, max: 170000, currency: 'USD' },
];

export const MOCK_PAYROLL_BATCHES: PayrollBatch[] = [
    { id: 'pb1', period: 'Mar 2024', totalCost: 342850, status: 'Processing', employeesCount: 128, runDate: '2024-03-25' },
    { id: 'pb2', period: 'Feb 2024', totalCost: 338100, status: 'Distributed', employeesCount: 126, runDate: '2024-02-25' },
];

export const MOCK_PAYROLL_ANOMALIES: PayrollAnomaly[] = [
    { id: 'pa1', employeeId: '1', employeeName: 'Sarah Lin', type: 'High Variance', description: 'Bonus exceeds 50% of base salary', severity: 'Medium' },
    { id: 'pa2', employeeId: '4', employeeName: 'David Kim', type: 'Missing Data', description: 'Tax ID verification pending', severity: 'High' },
];

// --- Recruitment 4.4 Mock Data ---

export const MOCK_JOBS: JobPosting[] = [
    { id: 'j1', title: 'Senior UX Designer', department: 'Product', location: 'San Francisco', type: 'Full-time', status: 'Published', applicantsCount: 45, postedDate: '2024-03-01', channels: ['LinkedIn', 'Glassdoor'], hiringManager: 'Michael Chen' },
    { id: 'j2', title: 'Backend Engineer (Go)', department: 'R&D', location: 'Remote', type: 'Full-time', status: 'Published', applicantsCount: 128, postedDate: '2024-03-05', channels: ['LinkedIn', 'Indeed', 'StackOverflow'], hiringManager: 'David Kim' },
    { id: 'j3', title: 'Marketing Specialist', department: 'Marketing', location: 'New York', type: 'Contract', status: 'Draft', applicantsCount: 0, postedDate: '-', channels: [], hiringManager: 'Amanda Lo' },
];

export const MOCK_INTERVIEWS: Interview[] = [
    { id: 'i1', candidateId: 'c3', candidateName: 'Maria Garcia', jobTitle: 'Product Manager', date: '2024-03-22', time: '10:00 AM', type: 'Video', interviewer: 'Michael Chen', status: 'Scheduled', meetingLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 'i2', candidateId: 'c1', candidateName: 'Alex Johnson', jobTitle: 'Product Manager', date: '2024-03-21', time: '14:00 PM', type: 'On-site', interviewer: 'Sarah Lin', status: 'Completed' },
];

export const MOCK_TALENT_POOL: TalentProfile[] = [
    { id: 'tp1', name: 'Emily Zhang', role: 'UX Researcher', skills: ['Figma', 'User Testing', 'Psychology'], experience: 5, lastContact: '2023-11-15', status: 'Passive', aiActivationScore: 85, tags: ['Silver Medalist'], location: 'San Francisco' },
    { id: 'tp2', name: 'Markus Weber', role: 'DevOps Engineer', skills: ['Docker', 'K8s', 'AWS'], experience: 8, lastContact: '2023-09-01', status: 'Active', aiActivationScore: 92, tags: ['Alumni'], location: 'Berlin (Remote)' },
    { id: 'tp3', name: 'Anita Patel', role: 'Data Analyst', skills: ['Python', 'Tableau', 'SQL'], experience: 3, lastContact: '2024-01-20', status: 'Passive', aiActivationScore: 45, tags: [], location: 'New York' },
    { id: 'tp4', name: 'John Doe', role: 'Frontend Developer', skills: ['React', 'TypeScript', 'Tailwind'], experience: 4, lastContact: '2023-12-10', status: 'Active', aiActivationScore: 78, tags: ['Silver Medalist'], location: 'Remote' },
];