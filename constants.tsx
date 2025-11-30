import { ChartDataPoint, Employee, Candidate } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Sarah Lin', role: 'Senior UX Designer', department: 'Product', status: 'Active', joinDate: '2022-03-15', avatar: 'https://picsum.photos/200/200?random=1' },
  { id: '2', name: 'Michael Chen', role: 'Engineering Manager', department: 'R&D', status: 'Active', joinDate: '2021-06-01', avatar: 'https://picsum.photos/200/200?random=2' },
  { id: '3', name: 'Jessica Davis', role: 'HR Specialist', department: 'People Ops', status: 'On Leave', joinDate: '2023-01-10', avatar: 'https://picsum.photos/200/200?random=3' },
  { id: '4', name: 'David Kim', role: 'Backend Engineer', department: 'R&D', status: 'Active', joinDate: '2023-05-20', avatar: 'https://picsum.photos/200/200?random=4' },
  { id: '5', name: 'Amanda Lo', role: 'Sales Director', department: 'Sales', status: 'Active', joinDate: '2020-11-11', avatar: 'https://picsum.photos/200/200?random=5' },
];

export const MOCK_CANDIDATES: Candidate[] = [
  { id: 'c1', name: 'Alex Johnson', role: 'Product Manager', stage: 'Screening', rating: 4, source: 'LinkedIn' },
  { id: 'c2', name: 'Sam Smith', role: 'Frontend Dev', stage: 'New', rating: 0, source: 'Referral' },
  { id: 'c3', name: 'Maria Garcia', role: 'Product Manager', stage: 'Interview', rating: 5, source: 'Indeed' },
  { id: 'c4', name: 'Robert Ford', role: 'Data Scientist', stage: 'Offer', rating: 4.5, source: 'Agency' },
  { id: 'c5', name: 'Linda Wu', role: 'Frontend Dev', stage: 'New', rating: 3, source: 'Website' },
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
