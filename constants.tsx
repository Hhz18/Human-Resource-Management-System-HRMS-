import { DepartmentNode, HRProcess, Employee, Contract, RolePermission, Candidate, JobPosting, Interview, TalentProfile, ShiftDefinition, PayrollRecord, PerformanceReview } from './types';

export const MOCK_ORG_TREE: DepartmentNode[] = [
  {
    id: 'd1', name: 'CEO Office', manager: 'Eleanor Pena', headcount: 120, type: 'Business', isLegalEntity: true, entityCode: 'LE-001',
    children: [
      {
        id: 'd2', name: 'Product & Engineering', manager: 'Michael Chen', headcount: 60, type: 'Business', isLegalEntity: false,
        children: [
            { id: 'd2-1', name: 'Product Design', manager: 'Sarah Lin', headcount: 12, type: 'Business' },
            { id: 'd2-2', name: 'Backend Dev', manager: 'David Kim', headcount: 24, type: 'Business', secondaryManager: 'VP Infrastructure' },
            { id: 'd2-3', name: 'Frontend Dev', manager: 'Sam Smith', headcount: 18, type: 'Business' },
        ]
      },
      {
        id: 'd3', name: 'Sales & Marketing', manager: 'Amanda Lo', headcount: 45, type: 'Business', isLegalEntity: true, entityCode: 'LE-002',
        children: [
            { id: 'd3-1', name: 'Enterprise Sales', manager: 'John Doe', headcount: 20, type: 'Business' },
            { id: 'd3-2', name: 'Growth Marketing', manager: 'Jane Doe', headcount: 15, type: 'Business', secondaryManager: 'Global Brand Lead' },
        ]
      },
      {
        id: 'd4', name: 'Operations', manager: 'Jessica Davis', headcount: 15, type: 'Admin',
        children: [
            { id: 'd4-1', name: 'People Ops (HR)', manager: 'Jessica Davis', headcount: 8, type: 'Admin' },
            { id: 'd4-2', name: 'Finance', manager: 'Robert Fox', headcount: 7, type: 'Admin', isLegalEntity: true, entityCode: 'LE-FIN' },
        ]
      }
    ]
  }
];

export const MOCK_PROJECT_ORG_TREE: DepartmentNode[] = [
    {
      id: 'p1', name: 'Project Apollo (AI)', manager: 'Michael Chen', headcount: 45, type: 'Project',
      children: [
        { id: 'p1-1', name: 'Core Algorithms', manager: 'David Kim', headcount: 15, type: 'Project' },
        { id: 'p1-2', name: 'UI/UX Taskforce', manager: 'Sarah Lin', headcount: 8, type: 'Project' },
        { id: 'p1-3', name: 'Go-To-Market Squad', manager: 'Amanda Lo', headcount: 12, type: 'Project' },
      ]
    },
    {
      id: 'p2', name: 'Project Gemini (Mobile)', manager: 'Sam Smith', headcount: 30, type: 'Project',
      children: [
          { id: 'p2-1', name: 'iOS Team', manager: 'John Appleseed', headcount: 12, type: 'Project' },
          { id: 'p2-2', name: 'Android Team', manager: 'Jane Robot', headcount: 12, type: 'Project' },
      ]
    }
];

export const MOCK_HR_PROCESSES: HRProcess[] = [
    { id: 'p1', name: 'Onboarding Flow', owner: 'Jessica Davis', status: 'Active', steps: 12, lastUpdated: '2 days ago' },
    { id: 'p2', name: 'Performance Review Q1', owner: 'Michael Chen', status: 'Draft', steps: 8, lastUpdated: '1 week ago' },
    { id: 'p3', name: 'Offboarding', owner: 'Jessica Davis', status: 'Active', steps: 5, lastUpdated: '1 month ago' },
];

export const MOCK_EMPLOYEES: Employee[] = [
    { id: 'e1', name: 'Eleanor Pena', role: 'CEO', department: 'CEO Office', status: 'Active', joinDate: '2020-01-15', avatar: 'https://i.pravatar.cc/150?u=e1', email: 'eleanor@astra.com', location: 'New York' },
    { id: 'e2', name: 'Michael Chen', role: 'CTO', department: 'Product & Engineering', status: 'Active', joinDate: '2020-02-01', avatar: 'https://i.pravatar.cc/150?u=e2', email: 'michael@astra.com', location: 'San Francisco' },
    { id: 'e3', name: 'Sarah Lin', role: 'Head of Design', department: 'Product Design', status: 'Active', joinDate: '2020-05-10', avatar: 'https://i.pravatar.cc/150?u=e3', email: 'sarah@astra.com', location: 'Remote' },
    { id: 'e4', name: 'David Kim', role: 'Lead Engineer', department: 'Backend Dev', status: 'Active', joinDate: '2021-03-20', avatar: 'https://i.pravatar.cc/150?u=e4', email: 'david@astra.com', location: 'London' },
    { id: 'e5', name: 'Amanda Lo', role: 'VP Sales', department: 'Sales & Marketing', status: 'Active', joinDate: '2020-04-15', avatar: 'https://i.pravatar.cc/150?u=e5', email: 'amanda@astra.com', location: 'New York' },
];

export const MOCK_CONTRACTS: Contract[] = [
    { id: 'c1', employeeName: 'Michael Chen', type: 'Permanent', status: 'Active', startDate: '2020-02-01' },
    { id: 'c2', employeeName: 'Sarah Lin', type: 'Permanent', status: 'Active', startDate: '2020-05-10' },
    { id: 'c3', employeeName: 'David Kim', type: 'Fixed Term', status: 'Expiring', startDate: '2021-03-20', endDate: '2024-03-20' },
    { id: 'c4', employeeName: 'Contractor A', type: 'Contractor', status: 'Pending', startDate: '2024-04-01' },
];

export const MOCK_ROLES: RolePermission[] = [
    { id: 'r1', role: 'Admin', usersCount: 3, modules: ['All Access'] },
    { id: 'r2', role: 'HR Manager', usersCount: 5, modules: ['Org', 'Recruitment', 'Payroll', 'Performance'] },
    { id: 'r3', role: 'Employee', usersCount: 1200, modules: ['Self Service', 'Attendance'] },
];

export const MOCK_CANDIDATES: Candidate[] = [
    { id: 'ca1', name: 'Alice Johnson', role: 'Senior Product Manager', stage: 'Interview', matchScore: 88, rating: 4, source: 'LinkedIn', appliedDate: '2024-03-01' },
    { id: 'ca2', name: 'Bob Smith', role: 'Frontend Engineer', stage: 'Screening', matchScore: 75, rating: 3, source: 'Referral', appliedDate: '2024-03-10' },
    { id: 'ca3', name: 'Charlie Brown', role: 'Sales Director', stage: 'New', matchScore: 60, rating: 0, source: 'Indeed', appliedDate: '2024-03-14' },
    { id: 'ca4', name: 'Diana Prince', role: 'UX Designer', stage: 'Offer', matchScore: 95, rating: 5, source: 'Website', appliedDate: '2024-02-25' },
];

export const MOCK_JOBS: JobPosting[] = [
    { id: 'j1', title: 'Senior Product Manager', department: 'Product', location: 'New York', type: 'Full-time', postedDate: '10 days ago', applicantsCount: 45, status: 'Published', channels: ['LinkedIn', 'Indeed'] },
    { id: 'j2', title: 'Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', postedDate: '5 days ago', applicantsCount: 22, status: 'Published', channels: ['LinkedIn'] },
    { id: 'j3', title: 'Sales Director', department: 'Sales', location: 'London', type: 'Full-time', postedDate: '2 weeks ago', applicantsCount: 15, status: 'Draft', channels: [] },
];

export const MOCK_INTERVIEWS: Interview[] = [
    { id: 'i1', candidateName: 'Alice Johnson', jobTitle: 'Senior PM', date: '2024-03-20', time: '10:00 AM', interviewer: 'Michael Chen', type: 'Video', meetingLink: 'https://meet.google.com' },
    { id: 'i2', candidateName: 'Bob Smith', jobTitle: 'Frontend Eng', date: '2024-03-21', time: '02:00 PM', interviewer: 'Sarah Lin', type: 'On-site' },
];

export const MOCK_TALENT_POOL: TalentProfile[] = [
    { id: 't1', name: 'Evan Wright', role: 'Full Stack Dev', skills: ['React', 'Node.js', 'AWS'], experience: 5, location: 'San Francisco', lastContact: '2 months ago', aiActivationScore: 85, tags: ['Silver Medalist'] },
    { id: 't2', name: 'Fiona Gallagher', role: 'Marketing Manager', skills: ['SEO', 'Content Strategy'], experience: 7, location: 'New York', lastContact: '1 year ago', aiActivationScore: 92, tags: ['Alumni'] },
];

export const HEADCOUNT_DATA = [
    { name: 'Engineering', value: 400 },
    { name: 'Sales', value: 300 },
    { name: 'Product', value: 150 },
    { name: 'Marketing', value: 100 },
    { name: 'Ops', value: 298 },
];

export const TURNOVER_DATA = [
    { name: 'Jan', value: 2.1 },
    { name: 'Feb', value: 1.8 },
    { name: 'Mar', value: 1.2 },
    { name: 'Apr', value: 1.5 },
    { name: 'May', value: 1.1 },
    { name: 'Jun', value: 1.0 },
];

export const MOCK_ATTENDANCE = [
    { id: 'at1', employeeName: 'David Kim', date: 'Mar 15, 2024', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: 9, location: 'Office', device: 'Biometric', status: 'On Time' },
    { id: 'at2', employeeName: 'Sarah Lin', date: 'Mar 15, 2024', checkIn: '09:15 AM', checkOut: '06:15 PM', workHours: 9, location: 'Remote', device: 'Web', status: 'Late' },
];

export const SHIFT_DEFINITIONS: ShiftDefinition[] = [
    { id: 's1', name: 'Morning Shift', code: 'M', color: 'text-orange-500 bg-orange-100', startTime: '09:00', endTime: '18:00' },
    { id: 's2', name: 'Evening Shift', code: 'E', color: 'text-indigo-500 bg-indigo-100', startTime: '14:00', endTime: '23:00' },
    { id: 's3', name: 'Night Shift', code: 'N', color: 'text-purple-500 bg-purple-100', startTime: '22:00', endTime: '07:00' },
];

export const SCHEDULE_DATA = [
    { employeeId: 'e4', employeeName: 'David Kim', role: 'Engineer', avatar: 'https://i.pravatar.cc/150?u=e4', shifts: { '01': 's1', '02': 's1', '03': 's1', '04': 's1', '05': 's1', '06': '', '07': '' } },
    { employeeId: 'e3', employeeName: 'Sarah Lin', role: 'Designer', avatar: 'https://i.pravatar.cc/150?u=e3', shifts: { '01': 's2', '02': 's2', '03': 's2', '04': 's2', '05': 's2', '06': '', '07': '' } },
];

export const LEAVE_BALANCES = [
    { type: 'Annual Leave', total: 20, used: 5, unit: 'Days', color: 'bg-green-500' },
    { type: 'Sick Leave', total: 10, used: 2, unit: 'Days', color: 'bg-blue-500' },
    { type: 'Remote Work', total: 50, used: 12, unit: 'Days', color: 'bg-purple-500' },
];

export const LEAVE_REQUESTS = [
    { id: 'lr1', employeeName: 'Michael Chen', type: 'Annual Leave', days: 5, startDate: 'Apr 10', endDate: 'Apr 15', reason: 'Family trip', status: 'Pending' },
    { id: 'lr2', employeeName: 'David Kim', type: 'Sick Leave', days: 1, startDate: 'Mar 10', endDate: 'Mar 10', reason: 'Flu', status: 'Approved' },
];

export const OVERTIME_REQUESTS = [
    { id: 'ot1', employeeName: 'David Kim', date: 'Mar 12', hours: 4, project: 'Project Apollo', compensation: 'Paid', status: 'Pending' },
    { id: 'ot2', employeeName: 'Sarah Lin', date: 'Mar 11', hours: 2, project: 'UI Fixes', compensation: 'Time-off', status: 'Approved' },
];

export const MOCK_PAYROLL: PayrollRecord[] = [
    { id: 'pr1', employeeName: 'Eleanor Pena', baseSalary: 15000, bonus: 2000, deductions: 4500, netPay: 12500, status: 'Calculated' },
    { id: 'pr2', employeeName: 'Michael Chen', baseSalary: 12000, bonus: 1500, deductions: 3600, netPay: 9900, status: 'Calculated' },
];

export const MOCK_SALARY_BANDS = [
    { id: 'sb1', level: 'L1 - Junior', min: 40000, mid: 55000, max: 70000 },
    { id: 'sb2', level: 'L2 - Mid', min: 60000, mid: 80000, max: 100000 },
    { id: 'sb3', level: 'L3 - Senior', min: 90000, mid: 120000, max: 150000 },
];

export const MOCK_PAYROLL_BATCHES = [
    { id: 'pb1', period: 'Mar 2024', runDate: 'Mar 25', totalCost: 342850, employeesCount: 1248, status: 'Processing' },
    { id: 'pb2', period: 'Feb 2024', runDate: 'Feb 25', totalCost: 338100, employeesCount: 1242, status: 'Distributed' },
];

export const MOCK_PAYROLL_ANOMALIES = [
    { id: 'pa1', employeeName: 'David Kim', type: 'High Overtime', severity: 'High', description: 'Overtime exceeds 40% of base pay.' },
    { id: 'pa2', employeeName: 'Jane Doe', type: 'Missing Tax ID', severity: 'Medium', description: 'Tax documentation incomplete.' },
];

export const MOCK_PERFORMANCE: PerformanceReview[] = [
    { id: 'rev1', employeeName: 'David Kim', reviewer: 'Michael Chen', score: 85, status: 'Completed', feedback: 'Great technical leadership.', cycle: 'Q1 2024' },
    { id: 'rev2', employeeName: 'Sarah Lin', reviewer: 'Michael Chen', score: 92, status: 'Completed', feedback: 'Outstanding design contributions.', cycle: 'Q1 2024' },
    { id: 'rev3', employeeName: 'John Doe', reviewer: 'Amanda Lo', score: 72, status: 'In Progress', feedback: 'Needs to improve closing rate.', cycle: 'Q1 2024' },
];
