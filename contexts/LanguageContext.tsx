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
  topbar: {
    search: '搜索功能、员工或数据...',
    role: '全球管理员'
  },
  dashboard: {
    title: '高管仪表盘',
    welcome: '欢迎回来，Eleanor。这是您的每日人力资源简报。',
    updated: '刚刚更新',
    stats: {
      headcount: '员工总数',
      turnover: '离职率',
      positions: '在招职位',
      approvals: '待审批'
    },
    charts: {
        turnover: '离职趋势',
        viewReport: '查看报告'
    },
    tasks: {
        title: '待办事项',
        viewAll: '查看所有'
    },
    promo: {
        title: '新功能：AI 政策助手',
        desc: '使用我们的新数字人助手自动回答人力资源政策问题。',
        btn: '立即试用'
    }
  },
  org: {
    title: '组织管理',
    subtitle: '管理部门、员工和角色权限',
    add: '添加员工',
    searchPlaceholder: '搜索员工、部门...',
    filter: '筛选',
    tabs: {
        directory: '员工名录',
        structure: '组织架构',
        workflows: '工作流',
        contracts: '合同管理',
        permissions: '权限管理'
    },
    structure: {
        viewTree: '树状图',
        viewTile: '平铺视图',
        typeAdmin: '行政架构',
        typeProject: '项目架构',
        typeMatrix: '矩阵架构',
        batch: '批量调整',
        snapshot: '生成快照',
        showLegal: '显示实体',
        dotted: '虚线汇报',
        legalEntity: '法律实体'
    },
    contracts: {
        totalActive: '有效合同总数',
        perm: '长期合同',
        fixed: '固定期限',
        expiring: '即将到期',
        viewList: '查看列表',
        pendingSign: '待签署',
        remindAll: '一键提醒',
        table: {
            employee: '员工',
            type: '类型',
            duration: '期限',
            endDate: '结束日期',
            signature: '签署状态',
            status: '状态',
            actions: '操作'
        },
        status: {
            signed: '已签署',
            pending: '待签署',
            active: '生效中',
            expiring: '即将到期'
        },
        menu: {
            view: '查看',
            renew: '续签',
            terminate: '终止',
            download: '下载 PDF'
        }
    }
  },
  recruitment: {
    title: '招聘管理',
    subtitle: '追踪候选人并管理职位发布',
    add: '添加候选人',
    searchPlaceholder: '搜索候选人...',
    aiMatching: 'AI 匹配已启用',
    tabs: {
        pipeline: '候选人看板',
        jobs: '职位管理',
        interviews: '面试安排',
        pool: '人才库',
        analytics: '招聘分析'
    },
    cols: {
        new: '新申请',
        screening: '筛选中',
        interview: '面试中',
        offer: '已发 Offer'
    }
  },
  analytics: {
    title: '人才分析',
    subtitle: '基于数据驱动的劳动力洞察',
    viewAs: '视角',
    export: '导出报告',
    tabs: {
        dashboard: '仪表盘',
        reports: '标准报表',
        custom: '自定义 BI',
        warnings: '预警中心'
    },
    metrics: {
        timeToHire: '招聘周期',
        costPerHire: '招聘成本',
        enps: 'eNPS 评分',
        risk: '离职风险'
    },
    charts: {
        trend: '关键指标趋势',
        composition: '人员构成'
    }
  },
  apaas: {
    title: '智能应用构建器',
    subtitle: '零代码构建自定义 HR 工作流和微应用',
    create: '创建新应用',
    market: '模板市场',
    viewAll: '查看全部',
    install: '安装',
    blank: '空白应用',
    start: '从头开始',
    banner: {
        title: '构建您自己的 HR 工具',
        desc: '使用我们的低代码构建器，在几分钟内创建自定义表单、工作流和仪表盘。',
        btn: '开始构建'
    },
    templates: {
        storePerf: '门店业绩上报',
        piecework: '计件工资计算',
        inspection: '安全巡检',
        bonus: '奖金分配',
        travel: '差旅申请',
        timesheet: '项目工时表'
    }
  },
  attendance: {
    title: '考勤与工时',
    subtitle: '监控排班、出勤和休假',
    tabs: {
        dashboard: '仪表盘',
        timesheets: '工时表',
        scheduling: '排班管理',
        timeoff: '休假管理',
        overtime: '加班管理'
    },
    stats: {
        present: '出勤',
        late: '迟到',
        leave: '休假',
        absent: '缺勤'
    },
    trends: '出勤趋势'
  },
  payroll: {
    title: '薪酬福利',
    subtitle: '管理薪资、奖金和发放',
    tabs: {
        overview: '概览',
        run: '薪资计算',
        structure: '薪资体系',
        payslips: '工资单'
    },
    run: {
        start: '开始算薪'
    },
    overview: {
        totalDisbursement: '总发放额',
        processingStatus: '2024年3月计算中',
        avgSalary: '平均薪资',
        variance: '预算偏差',
        laborCost: '人力成本趋势',
        actual: '实际',
        budget: '预算'
    }
  },
  performance: {
    title: '绩效管理',
    subtitle: '评估、目标和反馈',
    newCycle: '发起新周期',
    activeReviews: '进行中的评估',
    reviewer: '评估人',
    score: '评分',
    viewDetails: '查看详情',
    stats: {
        completion: '完成率',
        topPerformer: '最佳绩效',
        vsLast: '对比上期',
        avgScore: '平均分',
        reviewsBase: '基于 450 份评估'
    }
  },
  efficiency: {
    title: '组织效能',
    subtitle: '优化劳动力生产力和人才密度',
    tabs: {
        workforce: '劳动力效能',
        talent: '人才效能',
        org: '组织效能'
    },
    metrics: {
        revenue: '人均营收',
        utilization: '人员利用率',
        costRatio: '人事费用率',
        budgetTitle: '编制预算 vs 实际',
        scheduleTitle: '排班合规率',
        matchRate: '技能匹配度',
        deviations: '编制偏差'
    },
    talent: {
        grid: '九宫格人才盘点',
        promote: '晋升',
        action: '需关注',
        potential: '潜力',
        performance: '绩效',
        succession: '继任计划'
    },
    org: {
        okr: 'OKR 追踪',
        incentive: '即时激励',
        cockpit: '管理驾驶舱',
        cockpitDesc: '访问多维管理视图，深入分析各部门的效能指标。',
        launch: '启动驾驶舱'
    }
  },
  settings: {
    title: '系统设置',
    subtitle: '管理您的偏好和账户',
    language: '语言',
    notifications: '通知',
    theme: '主题'
  }
};

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese for this demo as requested

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