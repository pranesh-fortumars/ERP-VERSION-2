# Enterprise ERP & BPA Modernization Blueprint

## Purpose
A professional-grade, industrial Enterprise Resource Planning (ERP) and Business Process Automation (BPA) suite tailored for Indian manufacturing enterprises. The platform focuses on operational intelligence, real-time shop floor control, and automated financial reconciliation.

## Core Characteristics & Style
- **Aesthetic:** Industrial Command Center; crisp, high-contrast, professional-grade.
- **Design System:** Standardized "Industrial Blue" (`blue-600`) palette across all modules.
- **Typography:** Inter (Modern & Technical).
- **UX:** High-density data environments; real-time telemetry; mission-critical feel.
- **Visuals:** CSS-based schematic visualizations for all mechanical and workflow nodes (decommissioned all mock imagery).
- **Themes:** Fully synchronized Light/Dark modes with `localStorage` persistence.
- **Commerce:** Standardized to Indian Rupee (₹), GST-compliant (5%, 12%, 18%, 28%).

## Project Architecture & Modules

### 1. Command Center (Dashboard)
- Real-time OEE (Overall Equipment Effectiveness) monitoring.
- Revenue Intelligence Area Charts (Actual vs Target).
- Operational Risk & Incident Monitoring.
- Infrastructure Status Telemetry (Node Cluster Alpha).

### 2. Shop Floor Operations (Manufacturing)
- Machine health telemetry & maintenance scheduling.
- Real-time work order tracking with priority-coded progress.
- Bill of Materials (BOM) management system with cost roll-ups.
- High-speed assembly line visualization (Robotic Matrix).

### 3. Asset Inventory (Stock Ledger)
- SKU Master Ledger with batch volume tracking.
- Multi-warehouse capacity allocation (Pune, Mumbai, Chennai units).
- AI-driven replenishment forecasting.
- Global stock flow visualization.

### 4. Revenue Pipeline (Sales & Billing)
- Enterprise contract orchestration & dispatch.
- GST-compliant automated invoicing engine.
- Accounts Receivable (AR) settlement tracker.
- Predictive flux matrix for high-intensity contracts.

### 5. Fiscal Ledger (Accounting)
- Enterprise audit ledger & treasury node control.
- Quarterly reconciliation analysis.
- GST reconciliation and tax ledger integration.
- Asset class distribution (Sales, Procurement, Operations, Utilities).

### 6. Process Automation (Workflow & Tasks)
- Business Process Automation (BPA) node visualization.
- Lead-to-Cash (L2C) and Procure-to-Pay (P2P) tracking.
- Operational Execution (Task Registry) with state-coded status tracking.
- Node topology for efficiency optimization.

### 7. Human Capital (Payroll & CRM)
- Employee lifecycle management & disbursement pool.
- Statutory CTC (Cost to Company) with PF/TDS deductions.
- CRM Client Matrix with engagement velocity scores.
- Corporate identity registry and stakeholder intelligence.

## Decommissioned Elements (Legacy Cleanup)
- [x] Experimental "wavy" elements (deprecated).
- [x] Mock imagery (placeholders) replaced by high-fidelity CSS visualizations.
- [x] Indigo gradients replaced by Corporate Industrial Blue (`blue-600`).
- [x] Informal emojis replaced by professional React Icons (Fi).

## Implementation Roadmap

### Phase 1: Foundation (COMPLETED)
- [x] Global layout with sidebar navigation.
- [x] Sophisticated Dark/Light theme system with persistent preferences.
- [x] Responsive boilerplate for all core modules.

### Phase 2: Intelligence & Operations (COMPLETED)
- [x] Executive Dashboard refinement.
- [x] Inventory & SKU Master Ledger.
- [x] Shop Floor (MES) Orchestration.

### Phase 3: Financials & Compliance (COMPLETED)
- [x] Sales & Revenue Pipeline.
- [x] Billing & GST-Compliant Invoicing.
- [x] Fiscal Ledger & Treasury.

### Phase 4: Modernization & Standardization (COMPLETED)
- [x] Unified Corporate "Industrial Blue" design system.
- [x] High-fidelity CSS-based data visualizations.
- [x] Decommissioned all legacy mock imagery and wavy aesthetics.
- [x] Full light/dark theme synchronization across all modules.

## Technical Stack
- **Frontend:** Next.js 16.2.1 (App Router), Tailwind CSS.
- **Interactivity:** Framer Motion (animated transitions).
- **Data Visualization:** Recharts (high-scale charting).
- **Iconography:** React Icons (Fi).
- **Theming:** CSS Variables with `localStorage` persistence.
- **Data Handling:** React State Management (prepped for REST/GraphQL API).

