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
      efficiency: 'Efficiency Cloud',
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
      searchPlaceholder: 'Search by name, ID, or role...',
      tabs: {
        directory: 'Employee Directory',
        structure: 'Org Structure',
        workflows: 'Process Center',
        contracts: 'Contracts',
        permissions: 'Permissions',
      }
    },
    recruitment: {
      title: 'Recruitment Pipeline',
      subtitle: 'End-to-end talent acquisition platform',
      job: 'Job: Sr. Designer',
      add: 'Add Candidate',
      searchPlaceholder: 'Search candidates...',
      aiMatching: 'AI Matching Enabled',
      tabs: {
        pipeline: 'Pipeline',
        jobs: 'Jobs & JDs',
        interviews: 'Interviews',
        pool: 'Talent Pool',
        analytics: 'Analytics',
      },
      cols: {
        new: 'New Applied',
        screening: 'Screening',
        interview: 'Interview',
        offer: 'Offer Sent',
      }
    },
    attendance: {
      title: 'Attendance',
      subtitle: 'Smart workforce scheduling & time tracking',
      tabs: {
        dashboard: 'Dashboard',
        scheduling: 'Smart Scheduling',
        timesheets: 'Timesheets',
        timeoff: 'Time Off',
        overtime: 'Overtime',
      },
      stats: {
        present: 'Present',
        late: 'Late Arrival',
        leave: 'On Leave',
        absent: 'Absent',
      },
      trends: 'Weekly Attendance Trends',
    },
    payroll: {
      title: 'Payroll',
      subtitle: 'Intelligent compensation & benefits management',
      tabs: {
        overview: 'Overview & Analysis',
        run: 'Smart Calculation',
        structure: 'Structure & Bands',
        payslips: 'Payslips',
      },
      overview: {
        totalDisbursement: 'Total Disbursement (Mar)',
        processingStatus: 'Processing • Scheduled for Mar 31',
        avgSalary: 'Avg. Salary',
        variance: 'Variance',
        laborCost: 'Labor Cost vs Budget',
        actual: 'Actual',
        budget: 'Budget',
      },
      run: {
        start: 'Start Calculation'
      }
    },
    performance: {
      title: 'Performance',
      subtitle: 'Goals, OKRs and 360 Reviews',
      newCycle: 'New Review Cycle',
      stats: {
        completion: 'Completion Rate',
        topPerformer: 'Top Performer',
        avgScore: 'Avg. Score',
        reviewsBase: 'Based on 124 reviews',
        vsLast: '+12% vs last quarter'
      },
      activeReviews: 'Active Reviews (Q1 2024)',
      viewDetails: 'View Details',
      reviewer: 'Reviewer',
      score: 'Score'
    },
    analytics: {
      title: 'Smart Analytics',
      subtitle: 'Intelligent Data Center & BI Platform',
      export: 'Export Report',
      dist: 'Headcount Distribution',
      retention: 'Retention Rate (Last 6 Months)',
      insight: 'AI Insight',
      insightText: 'Based on current trends, the Sales Department is at risk of under-staffing next quarter.',
      tabs: {
        dashboard: 'Dashboard',
        reports: 'Standard Reports',
        custom: 'Custom BI',
        warnings: 'Warning Center',
      },
      viewAs: 'View as',
      metrics: {
        timeToHire: 'Time to Hire',
        costPerHire: 'Cost Per Hire',
        enps: 'eNPS Score',
        risk: 'Attrition Risk',
      },
      charts: {
        trend: 'Recruitment & Turnover Trend',
        composition: 'Org Composition',
      }
    },
    efficiency: {
      title: 'Workforce Efficiency Cloud',
      subtitle: 'Maximize productivity, talent density, and organizational health.',
      tabs: {
        workforce: 'Workforce Efficiency',
        talent: 'Talent Efficiency',
        org: 'Org Efficiency',
      },
      metrics: {
        revenue: 'Revenue Per Employee',
        utilization: 'Headcount Utilization',
        costRatio: 'Labor Cost Ratio',
        budgetTitle: 'Establishment Management (Budget vs Actual)',
        scheduleTitle: 'Smart Scheduling Adherence',
        matchRate: 'Schedule Match Rate',
        deviations: 'Top Deviations by Dept'
      },
      talent: {
        grid: 'Talent Review (9-Box Grid)',
        succession: 'Succession Plan',
        promote: 'Ready for Promotion',
        action: 'Action Needed',
        potential: 'Potential',
        performance: 'Performance'
      },
      org: {
        okr: 'Strategic Goals (OKRs)',
        incentive: 'Instant Incentives',
        cockpit: 'CEO Cockpit View',
        cockpitDesc: 'Switch to the immersive 3D data visualization mode to see the pulse of your organization in real-time.',
        launch: 'Launch Cockpit'
      }
    },
    apaas: {
      title: 'Smart Builder (aPaaS)',
      subtitle: 'Build custom apps and workflows without code.',
      create: 'Create App',
      blank: 'Blank Application',
      start: 'Start from scratch',
      templates: {
        storePerf: 'Store Performance',
        piecework: 'Piecework Wages',
        inspection: 'Store Inspection',
        bonus: 'Team Bonus',
        travel: 'Travel Expenses',
        timesheet: 'Project Timesheet'
      },
      banner: {
        title: 'Build without limits',
        desc: 'Drag and drop components to create powerful HR applications. Connect data, automate workflows, and deploy in minutes.',
        btn: 'Open Studio'
      },
      market: 'Marketplace Templates',
      viewAll: 'View All',
      install: 'Install'
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
      efficiency: '人效云',
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
      searchPlaceholder: '搜索姓名、工号或职位...',
      tabs: {
        directory: '员工名录',
        structure: '组织架构',
        workflows: '流程中心',
        contracts: '合同管理',
        permissions: '权限管理',
      }
    },
    recruitment: {
      title: '招聘流程',
      subtitle: '追踪候选人从申请到录用的全过程。',
      job: '职位：高级设计师',
      add: '添加候选人',
      searchPlaceholder: '搜索候选人...',
      aiMatching: 'AI 匹配已启用',
      tabs: {
        pipeline: '候选人看板',
        jobs: '职位管理',
        interviews: '面试安排',
        pool: '人才库',
        analytics: '招聘分析',
      },
      cols: {
        new: '新申请',
        screening: '筛选中',
        interview: '面试中',
        offer: '已发Offer',
      }
    },
    attendance: {
      title: '考勤假期',
      subtitle: '智能排班与考勤追踪',
      tabs: {
        dashboard: '仪表盘',
        scheduling: '智能排班',
        timesheets: '工时表',
        timeoff: '休假管理',
        overtime: '加班管理',
      },
      stats: {
        present: '出勤',
        late: '迟到',
        leave: '休假',
        absent: '缺勤',
      },
      trends: '周出勤趋势',
    },
    payroll: {
      title: '薪酬福利',
      subtitle: '智能薪酬与福利管理',
      tabs: {
        overview: '概览分析',
        run: '智能算薪',
        structure: '薪资体系',
        payslips: '工资单',
      },
      overview: {
        totalDisbursement: '本月实发总额 (3月)',
        processingStatus: '计算中 • 预计3月31日发放',
        avgSalary: '平均薪资',
        variance: '环比波动',
        laborCost: '人力成本 vs 预算',
        actual: '实际',
        budget: '预算',
      },
      run: {
        start: '开始计算'
      }
    },
    performance: {
      title: '绩效管理',
      subtitle: '目标、OKR 与 360 评估',
      newCycle: '发起新绩效周期',
      stats: {
        completion: '完成率',
        topPerformer: '最佳绩效团队',
        avgScore: '平均评分',
        reviewsBase: '基于 124 份评估',
        vsLast: '环比上季度 +12%'
      },
      activeReviews: '进行中的评估 (2024 Q1)',
      viewDetails: '查看详情',
      reviewer: '评估人',
      score: '评分'
    },
    analytics: {
      title: '智数分析',
      subtitle: '智能数据中心与 BI 平台',
      export: '导出报告',
      dist: '人员分布',
      retention: '留存率（近6个月）',
      insight: 'AI 洞察',
      insightText: '基于当前趋势，销售部门下季度可能面临人手不足风险。',
      tabs: {
        dashboard: '仪表盘',
        reports: '标准报表',
        custom: '自定义报表',
        warnings: '预警中心',
      },
      viewAs: '视角',
      metrics: {
        timeToHire: '招聘周期',
        costPerHire: '招聘成本',
        enps: 'eNPS 评分',
        risk: '离职风险',
      },
      charts: {
        trend: '招聘与离职趋势',
        composition: '组织构成',
      }
    },
    efficiency: {
      title: '人效云',
      subtitle: '最大化劳动力效能、人才密度和组织健康度。',
      tabs: {
        workforce: '劳动力效能',
        talent: '人才效能',
        org: '组织效能',
      },
      metrics: {
        revenue: '人均营收',
        utilization: '人力编制利用率',
        costRatio: '人事费用率',
        budgetTitle: '编制管理 (预算 vs 实际)',
        scheduleTitle: '智能排班合规率',
        matchRate: '排班匹配度',
        deviations: '部门差异排行'
      },
      talent: {
        grid: '人才盘点 (九宫格)',
        succession: '继任计划',
        promote: '准备晋升',
        action: '需要关注',
        potential: '潜力',
        performance: '绩效'
      },
      org: {
        okr: '战略目标 (OKRs)',
        incentive: '即时激励',
        cockpit: 'CEO 驾驶舱',
        cockpitDesc: '切换至沉浸式 3D 数据可视化模式，实时感知组织脉搏，分析跨部门效能流向。',
        launch: '启动驾驶舱'
      }
    },
    apaas: {
      title: '智搭云 (aPaaS)',
      subtitle: '零代码构建自定义应用和工作流。',
      create: '创建应用',
      blank: '空白应用',
      start: '从头开始',
      templates: {
        storePerf: '门店业绩上报',
        piecework: '计时计件工资',
        inspection: '巡店管理',
        bonus: '团队奖金分配',
        travel: '出差费用申请',
        timesheet: '项目工时拆分'
      },
      banner: {
        title: '构建无界限',
        desc: '通过拖拽组件创建强大的人力资源应用。连接数据，自动化工作流，并在此分钟内发布。',
        btn: '打开工作室'
      },
      market: '模板市场',
      viewAll: '查看全部',
      install: '安装'
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
  const [language, setLanguage] = useState<Language>('zh');

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