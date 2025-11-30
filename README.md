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

## Tech Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## Project Structure
- `index.html`: Entry point, loads Tailwind via CDN.
- `App.tsx`: Main layout controller and state-based router.
- `types.ts`: Global type definitions.
- `constants.tsx`: Mock data for development.
- `components/`: Reusable UI components (Sidebar, TopBar, AIAssistant).
- `pages/`: Individual module views (Dashboard, OrgManagement, Recruitment, etc.).

## Core Functionality Implemented
1.  **Sidebar Navigation**: Collapsible, responsive sidebar.
2.  **Dashboard**: Interactive widgets for Headcount, Turnover, and Tasks.
3.  **Org Management**: Switchable view (Grid/List) for employee data.
4.  **Recruitment**: Visual Kanban pipeline.
5.  **AI Assistant**: Floating chat widget simulating AI interactions.
