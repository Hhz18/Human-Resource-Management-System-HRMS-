import React, { createContext, useContext, useState, ReactNode } from 'react';

const en = {
  sidebar: {
    dashboard: 'Dashboard',
    org: 'Organization',
    attendance: 'Attendance',
    payroll: 'Payroll',
    recruitment: 'Recruitment',
    performance: 'Performance',
    efficiency: 'Efficiency',
    analytics: 'Analytics',
    apaas: 'Smart Builder',
    settings: 'Settings'
  },
  topbar: {
    search: 'Search anything...',
    role: 'Global Admin'
  },
  dashboard: {
    title: 'Executive Dashboard',
    welcome: 'Welcome back, Eleanor. Here is your daily HR briefing.',
    updated: 'Updated 5 min ago',
    stats: {
      headcount: 'Total Headcount',
      turnover: 'Turnover Rate',
      positions: 'Open Positions',
      approvals: 'Pending Approvals'
    },
    charts: {
        turnover: 'Turnover Trend',
        viewReport: 'View Report'
    },
    tasks: {
        title: 'Pending Tasks',
        viewAll: 'View All Tasks'
    },
    promo: {
        title: 'New: AI Policy Assistant',
        desc: 'Automate your HR policy Q&A with our new digital human assistant.',
        btn: 'Try Now'
    }
  },
  org: {
    title: 'Organization Management',
    subtitle: 'Manage departments, employees, and roles',
    add: 'Add Employee',
    searchPlaceholder: 'Search employees, departments...',
    filter: 'Filter',
    tabs: {
        directory: 'Directory',
        structure: 'Structure',
        workflows: 'Workflows',
        contracts: 'Contracts',
        permissions: 'Permissions'
    },
    structure: {
        viewTree: 'Tree View',
        viewTile: 'Tile View',
        typeAdmin: 'Admin Structure',
        typeProject: 'Project Structure',
        typeMatrix: 'Matrix Structure',
        batch: 'Batch Update',
        snapshot: 'Save Snapshot',
        showLegal: 'Show Legal Entities',
        dotted: 'Dotted Line',
        legalEntity: 'Legal Entity'
    },
    contracts: {
        totalActive: 'Total Active',
        perm: 'Permanent',
        fixed: 'Fixed Term',
        expiring: 'Expiring Soon',
        viewList: 'View List',
        pendingSign: 'Pending Signature',
        remindAll: 'Remind All',
        table: {
            employee: 'Employee',
            type: 'Type',
            duration: 'Duration',
            endDate: 'End Date',
            signature: 'Signature',
            status: 'Status',
            actions: 'Actions'
        },
        status: {
            signed: 'Signed',
            pending: 'Pending',
            active: 'Active',
            expiring: 'Expiring'
        },
        menu: {
            view: 'View',
            renew: 'Renew',
            terminate: 'Terminate',
            download: 'Download PDF'
        }
    }
  },
  recruitment: {
    title: 'Recruitment',
    subtitle: 'Track candidates and manage job postings',
    add: 'Add Candidate',
    searchPlaceholder: 'Search candidates...',
    aiMatching: 'AI Matching Active',
    tabs: {
        pipeline: 'Pipeline',
        jobs: 'Jobs',
        interviews: 'Interviews',
        pool: 'Talent Pool',
        analytics: 'Analytics'
    },
    cols: {
        new: 'New Applied',
        screening: 'Screening',
        interview: 'Interview',
        offer: 'Offer Sent'
    }
  },
  analytics: {
    title: 'People Analytics',
    subtitle: 'Data-driven insights for your workforce',
    viewAs: 'View as',
    export: 'Export Report',
    tabs: {
        dashboard: 'Dashboard',
        reports: 'Reports',
        custom: 'Custom BI',
        warnings: 'Warnings'
    },
    metrics: {
        timeToHire: 'Time to Hire',
        costPerHire: 'Cost per Hire',
        enps: 'eNPS Score',
        risk: 'Retention Risk'
    },
    charts: {
        trend: 'Key Metric Trends',
        composition: 'Headcount Composition'
    }
  },
  apaas: {
    title: 'Smart App Builder',
    subtitle: 'Create custom HR workflows and mini-apps',
    create: 'Create New App',
    market: 'Template Marketplace',
    viewAll: 'View All',
    install: 'Install',
    blank: 'Blank App',
    start: 'Start from scratch',
    banner: {
        title: 'Build your own HR tools',
        desc: 'Use our low-code builder to create custom forms, workflows, and dashboards in minutes.',
        btn: 'Start Building'
    },
    templates: {
        storePerf: 'Store Performance',
        piecework: 'Piecework Calc',
        inspection: 'Safety Inspection',
        bonus: 'Bonus Allocation',
        travel: 'Travel Request',
        timesheet: 'Project Timesheet'
    }
  },
  attendance: {
    title: 'Attendance & Time',
    subtitle: 'Monitor shifts, attendance, and leaves',
    tabs: {
        dashboard: 'Dashboard',
        timesheets: 'Timesheets',
        scheduling: 'Scheduling',
        timeoff: 'Time Off',
        overtime: 'Overtime'
    },
    stats: {
        present: 'Present',
        late: 'Late',
        leave: 'On Leave',
        absent: 'Absent'
    },
    trends: 'Attendance Trends'
  },
  payroll: {
    title: 'Payroll & Compensation',
    subtitle: 'Manage salaries, bonuses, and payouts',
    tabs: {
        overview: 'Overview',
        run: 'Payroll Run',
        structure: 'Salary Structure',
        payslips: 'Payslips'
    },
    run: {
        start: 'Start Payroll Run'
    },
    overview: {
        totalDisbursement: 'Total Disbursement',
        processingStatus: 'Processing for March 2024',
        avgSalary: 'Avg. Salary',
        variance: 'Budget Variance',
        laborCost: 'Labor Cost Trend',
        actual: 'Actual',
        budget: 'Budget'
    }
  },
  performance: {
    title: 'Performance Management',
    subtitle: 'Reviews, goals, and feedback',
    newCycle: 'Start New Cycle',
    activeReviews: 'Active Reviews',
    reviewer: 'Reviewer',
    score: 'Score',
    viewDetails: 'View Details',
    stats: {
        completion: 'Completion Rate',
        topPerformer: 'Top Performer',
        vsLast: 'vs Last Cycle',
        avgScore: 'Average Score',
        reviewsBase: 'Based on 450 reviews'
    }
  },
  efficiency: {
    title: 'Organizational Efficiency',
    subtitle: 'Optimize workforce productivity and talent',
    tabs: {
        workforce: 'Workforce',
        talent: 'Talent',
        org: 'Organization'
    },
    metrics: {
        revenue: 'Revenue per Employee',
        utilization: 'Workforce Utilization',
        costRatio: 'Labor Cost Ratio',
        budgetTitle: 'Headcount Budget vs Actual',
        scheduleTitle: 'Schedule Adherence',
        matchRate: 'Skill Match Rate',
        deviations: 'Headcount Deviations'
    },
    talent: {
        grid: '9-Box Talent Grid',
        promote: 'Promote',
        action: 'Action Needed',
        potential: 'Potential',
        performance: 'Performance',
        succession: 'Succession Planning'
    },
    org: {
        okr: 'OKR Tracking',
        incentive: 'Instant Incentives',
        cockpit: 'Command Cockpit',
        cockpitDesc: 'Access the multi-dimensional management view to drill down into efficiency metrics across all departments.',
        launch: 'Launch Cockpit'
    }
  },
  settings: {
    title: 'Settings',
    subtitle: 'Manage your preferences and account',
    language: 'Language',
    notifications: 'Notifications',
    theme: 'Theme'
  }
};

const zh = {
  ...en,
  sidebar: {
    dashboard: '仪表盘',
    org: '组织管理',
    attendance: '考勤管理',
    payroll: '薪资福利',
    recruitment: '招聘管理',
    performance: '绩效管理',
    efficiency: '效能分析',
    analytics: '数据分析',
    apaas: '智能搭建',
    settings: '设置'
  },
  // Simplified Chinese fallback for demo
};

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = language === 'en' ? en : zh;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
