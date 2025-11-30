import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    sidebar: {
      dashboard: 'Dashboard',
      org: 'Organization',
      attendance: 'Attendance',
      payroll: 'Payroll',
      recruitment: 'Recruitment',
      performance: 'Performance',
      analytics: 'Smart Analytics',
      apaas: 'Smart Builder',
      settings: 'Settings',
    },
    topbar: {
      search: 'Ask Astra AI or search for employees...',
      role: 'HR Director',
    },
    dashboard: {
      title: 'Executive Overview',
      welcome: "Welcome back, Eleanor. Here's what's happening today.",
      updated: 'Last updated: Just now',
      stats: {
        headcount: 'Total Headcount',
        turnover: 'Avg. Turnover',
        positions: 'Open Positions',
        approvals: 'Pending Approvals',
      },
      charts: {
        turnover: 'Turnover Trends (6 Months)',
        viewReport: 'View Report',
      },
      tasks: {
        title: 'Pending Tasks',
        viewAll: 'View All Tasks',
      },
      promo: {
        title: 'Talent Review 2024',
        desc: 'The quarterly performance cycle is starting. Initiate the 360 review process now.',
        btn: 'Start Cycle',
      }
    },
    org: {
      title: 'Organization',
      subtitle: 'Manage employees, departments, and hierarchy.',
      filter: 'Filter',
      add: 'Add Employee',
      hire: 'Hire New Employee',
    },
    recruitment: {
      title: 'Recruitment Pipeline',
      subtitle: 'Track candidates from application to offer.',
      job: 'Job: Sr. Designer',
      add: 'Add Candidate',
      cols: {
        new: 'New Applied',
        screening: 'Screening',
        interview: 'Interview',
        offer: 'Offer Sent',
      }
    },
    analytics: {
      title: 'Smart Analytics',
      subtitle: 'Data-driven insights for workforce planning.',
      export: 'Export Report',
      dist: 'Headcount Distribution',
      retention: 'Retention Rate (Last 6 Months)',
      insight: 'AI Insight',
      insightText: 'Based on current trends, the Sales Department is at risk of under-staffing next quarter.',
    },
    apaas: {
      title: 'Smart Builder (aPaaS)',
      subtitle: 'Build custom apps and workflows without code.',
      create: 'Create App',
      blank: 'Blank Application',
      start: 'Start from scratch',
    },
    settings: {
      title: 'System Settings',
      subtitle: 'Manage your preferences and system configurations.',
      language: 'Language / 语言',
      theme: 'Theme',
      notifications: 'Notifications',
    }
  },
  zh: {
    sidebar: {
      dashboard: '首页',
      org: '组织人事',
      attendance: '考勤假期',
      payroll: '薪酬福利',
      recruitment: '招聘管理',
      performance: '绩效管理',
      analytics: '智数分析',
      apaas: '智搭云',
      settings: '系统设置',
    },
    topbar: {
      search: '询问 Astra AI 或搜索员工...',
      role: '人力资源总监',
    },
    dashboard: {
      title: '高管总览',
      welcome: '欢迎回来，Eleanor。这是今天的概况。',
      updated: '最后更新：刚刚',
      stats: {
        headcount: '总人数',
        turnover: '平均离职率',
        positions: '在招职位',
        approvals: '待审批',
      },
      charts: {
        turnover: '离职率趋势（近6个月）',
        viewReport: '查看报告',
      },
      tasks: {
        title: '待办事项',
        viewAll: '查看所有',
      },
      promo: {
        title: '2024 人才盘点',
        desc: '季度绩效周期即将开始。立即启动 360 评估流程。',
        btn: '开始周期',
      }
    },
    org: {
      title: '组织管理',
      subtitle: '管理员工、部门和汇报关系。',
      filter: '筛选',
      add: '添加员工',
      hire: '录用新员工',
    },
    recruitment: {
      title: '招聘流程',
      subtitle: '追踪候选人从申请到录用的全过程。',
      job: '职位：高级设计师',
      add: '添加候选人',
      cols: {
        new: '新申请',
        screening: '筛选中',
        interview: '面试中',
        offer: '已发Offer',
      }
    },
    analytics: {
      title: '智数分析',
      subtitle: '数据驱动的人力规划洞察。',
      export: '导出报告',
      dist: '人员分布',
      retention: '留存率（近6个月）',
      insight: 'AI 洞察',
      insightText: '基于当前趋势，销售部门下季度可能面临人手不足风险。',
    },
    apaas: {
      title: '智搭云 (aPaaS)',
      subtitle: '零代码构建自定义应用和工作流。',
      create: '创建应用',
      blank: '空白应用',
      start: '从头开始',
    },
    settings: {
      title: '系统设置',
      subtitle: '管理您的偏好和系统配置。',
      language: '语言 / Language',
      theme: '主题',
      notifications: '通知',
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};