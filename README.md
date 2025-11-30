# Astra HCM (Human Capital Management) System

## Project Description
Astra HCM is a modern, AI-driven human capital management platform designed for enterprise users. It follows a "No-Code + AI" philosophy, providing a clean, lightweight interface for managing the entire employee lifecycle.

Key features include:
- **Dashboard**: Executive overview with real-time metrics.
- **Organization**: Employee directory with list and grid views.
- **Recruitment**: Trello-style Kanban board for candidate tracking.
- **Analytics**: Data visualization using Recharts.
- **Smart Builder**: aPaaS module for custom apps.
- **Astra AI**: A persistent digital assistant for natural language interaction.
- **Multi-language**: Built-in support for English and Chinese.

## Tech Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## Project Directory Structure

```text
/
├── components/                 # Reusable UI components
│   ├── AIAssistant.tsx        # Floating AI chat widget
│   ├── Sidebar.tsx            # Main navigation sidebar
│   └── TopBar.tsx             # Header with search and profile
├── contexts/                   # Global state management
│   └── LanguageContext.tsx    # Internationalization (i18n) logic
├── pages/                      # Main route views
│   ├── Analytics.tsx          # Data visualization dashboard
│   ├── Dashboard.tsx          # Executive overview
│   ├── OrgManagement.tsx      # Employee directory (Grid/List)
│   ├── Recruitment.tsx        # Kanban board for hiring
│   ├── Settings.tsx           # System preferences & language toggle
│   └── SmartBuilder.tsx       # aPaaS application gallery
├── App.tsx                     # Main layout and routing logic
├── constants.tsx               # Mock data and global constants
├── index.html                  # HTML entry point (Tailwind CDN)
├── index.tsx                   # React entry point
├── metadata.json               # App configuration
└── types.ts                    # TypeScript interface definitions
```

## Core Functionality Implemented
1.  **Sidebar Navigation**: Collapsible, responsive sidebar.
2.  **Dashboard**: Interactive widgets for Headcount, Turnover, and Tasks.
3.  **Org Management**: Switchable view (Grid/List) for employee data.
4.  **Recruitment**: Visual Kanban pipeline.
5.  **AI Assistant**: Floating chat widget simulating AI interactions.
6.  **Localization**: Real-time switching between English and Chinese.
