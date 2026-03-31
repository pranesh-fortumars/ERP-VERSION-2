# ERP PRO: Industrial Command Center

## Project Overview
ERP PRO is a high-performance, professional-grade Enterprise Resource Planning (ERP) application designed for modern industrial environments. It features a "Light White & Blue" industrial aesthetic, focusing on data-dense layouts, real-time telemetry visualizations, and seamless multi-instance management.

## Core Design System
- **Theme**: "Light White & Blue" (Primary: Sky Blue #0284c7, Steel Blue #0369a1; Background: #ffffff / #f8fafc).
- **Aesthetics**: Industrial-grade cards with subtle shadows, 20px - 56px corner radii, and custom utility classes for "blue-glow" interactive states.
- **Typography**: High-contrast, bold uppercase tracking for headers; clean, legible font stacks for data.
- **Iconography**: React Icons (Lucide/Feather) with blue/sky accents.

## Key Features & Modules
1. **Command Center (Dashboard)**: Real-time throughput intelligence, system health monitoring, and incident tracking.
2. **Manufacturing**: Floor intelligence with machine status tracking, work order management, and OEE analytics.
3. **Inventory Management**: Asset ledger with SKU tracking, warehouse capacity allocation, and AI-driven replenishment.
4. **Workflow Orchestration**: BPA pipeline management with visual progress tracking for Lead-to-Cash and Procure-to-Pay cycles.
5. **Client Matrix (CRM)**: Enterprise partner management with engagement velocity tracking and fiscal signature validation.
6. **Billing & Sales**: Professional invoice generation and sales performance matrix.
7. **Multi-Instance Management**: Ability to manage multiple industrial nodes (ERPs) via the Tenant Selector in the primary navigation.

## Recent Changes & Plan
### Completed Changes
- [x] **Global Theme Migration**: Replaced all dark/pink elements with the "Light White & Blue" theme across 12+ modules.
- [x] **Responsive Cards**: Refactored `industrial-card` for consistent behavior across all pages.
- [x] **Functional State**: Implemented local state management for "Add Data" modals in Customers, Dashboard, Inventory, and Manufacturing.

### Current Objectives (Mobile & Multi-Tenant)
1. **Mobile Alignment**: Optimize the Sidebar and Grid layouts for 100% mobile responsiveness (ensure no horizontal overflow and touch-friendly targets).
2. **Multi-ERP Support**: Implement a "Node/Instance Selector" in the top of the sidebar to allow users to switch between different industrial ERP instances (e.g., "North Plant", "South Logistics Hub").
3. **Data Integrity**: Standardize the "Log Transformation" (Add Data) flow across all remaining modules.
4. **Visual Polish**: Add subtle micro-animations for tenant switching and mobile menu transitions.

## Project Structure
- `/src/app`: File-based routing for all ERP modules.
- `/src/components`: Shared UI components (Sidebar, Tooltips, Layout).
- `globals.css`: Single source of truth for the industrial design system.
- `fix_theme.js`: (Maintenance) Script for global theme synchronization.
