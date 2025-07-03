# MyHealthPlan Application

A comprehensive healthcare authorization management MVP with advanced clinical review features, user personas, and scenario-based workflows.

**🎯 100% Client-Side Application - No backend required!**

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- **No database or server required** - fully static client-side application!

### Setup & Run (2 commands)
```bash
npm run install:all    # Install dependencies
npm start              # Start client application
```

**That's it!** 🎉
- **100% client-side operation** with realistic demo data
- Frontend: http://localhost:3000
- No database, no backend server required

## Tech Stack
- **Frontend**: React 19+ with Tailwind CSS & CSS Modules
- **Data**: Static JSON data with dynamic scenarios and user modes
- **Auth**: Client-side authentication with demo users
- **Build Tools**: Create React App with CRACO for Tailwind integration
- **Routing**: React Router with hash-based deep linking

## Demo Login
All users use the password: **password123**

### Available Demo Users
- **admin@myhealthplan.com** (System Administrator - Can switch personas)
- **maria.hartsell@myhealthplan.com** (Maria Hartsell - UM mode)  
- **elise.tran@myhealthplan.com** (Elise Tran - UM-SNF mode)
- **karen.white@myhealthplan.com** (Karen White - CM mode)
- **john.doe@myhealthplan.com** (John Doe - Standard user)
- **jane.smith@myhealthplan.com** (Jane Smith - Standard user)

### User Modes & Scenarios
The application supports multiple user modes and scenarios for comprehensive testing:

**User Modes:**
- **UM** (Utilization Management): Standard authorization reviews
- **UM-SNF** (Skilled Nursing Facility): Specialized SNF authorization workflows
- **CM** (Case Management): High-priority case management tasks

**Available Scenarios:**
- **Sepsis Scenario**: Simulates urgent sepsis case workflows with:
  - Modified dashboard statistics
  - Special authorization routing (Robert Abbott case)
  - Clinical review modifications
  - Concurrent review requirements

## ✨ New Features & Capabilities

### Advanced Clinical Review System
- **Multi-step clinical review workflow** with 4 distinct phases:
  1. **Guidelines Search & Selection**: Interactive medical guideline selection
  2. **Clinical Indications**: Animated clinical criteria display  
  3. **Care Planning**: Inpatient admission criteria and alternatives
  4. **Goal Length of Stay**: Evidence-based stay duration guidelines

### Interactive Authorization Management
- **Hash-based deep linking**: Direct navigation to specific authorization states
- **Dynamic authorization states**: Request Submitted, Clinical Review, Closed
- **Real-time status updates**: Live scenario-based modifications
- **Document attachments**: Comprehensive attachment management system

### User Persona System
- **Multiple user personas**: Switch between different user contexts
- **Role-based UI modifications**: Different views for different roles
- **Scenario-based data**: Dynamic content based on active scenarios
- **Persistent state management**: User preferences saved across sessions

### Enhanced Member Management
- **Comprehensive member profiles**: Complete demographic and clinical data
- **Multi-tab interface**: Overview, Eligibility, Care Plans, Authorizations, etc.
- **Real-time scenario integration**: Member data adapts to active scenarios
- **Responsive design**: Optimized for desktop and mobile workflows

## Development Features
- ✅ **Hot reload**: React Fast Refresh for instant UI updates
- ✅ **Static data**: All healthcare data included as JSON files
- ✅ **No setup**: No database or backend configuration needed
- ✅ **Cross-platform**: Works on Windows, macOS, Linux
- ✅ **Single command**: Everything starts with `npm start`
- ✅ **Component modularity**: Well-organized React component architecture
- ✅ **CSS Modules**: Scoped styling with CSS Modules and Tailwind CSS
- ✅ **Development tooling**: ESLint, Prettier, and VS Code integration
- ✅ **Client-side auth**: JWT-like authentication without server dependency

## 📁 Project Structure

### Overview
This is a client-side React healthcare management application with static data.

### Root Directory
```
my-health-plan/
├── client/                 # React application (entire project)
├── package.json           # Root package configuration
└── README.md             # Project documentation
```

### Client Structure (React Application)
```
client/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.js & Dashboard.module.css
│   │   ├── Header.js & Header.module.css  
│   │   ├── Login.js & Login.module.css
│   │   ├── Member.js & Member.module.css
│   │   ├── common/       # Reusable components
│   │   │   ├── AuthorizationsTable.js
│   │   │   ├── CMTasksTable.js
│   │   │   ├── DataModeIndicator.js
│   │   │   ├── GroupQueuesChart.js
│   │   │   ├── ModeSwitcher.js & ModeSwitcher.module.css
│   │   │   ├── Pagination.js
│   │   │   ├── StatsCard.js
│   │   │   └── TabNavigation.js
│   │   ├── guards/       # Route guards
│   │   ├── member/       # Member-specific components
│   │   │   ├── authorization/  # Authorization workflow
│   │   │   │   ├── clinical-review-steps/
│   │   │   │   │   ├── ClinicalReviewStep1.js
│   │   │   │   │   ├── ClinicalReviewStep2.js  
│   │   │   │   │   ├── ClinicalReviewStep3.js
│   │   │   │   │   └── ClinicalReviewStep4.js
│   │   │   │   ├── AuthorizationAttachments.js
│   │   │   │   ├── AuthorizationClinicalReview.js
│   │   │   │   ├── AuthorizationClosed.js
│   │   │   │   ├── AuthorizationRequestSubmitted.js
│   │   │   │   ├── AuthorizationSummary.js
│   │   │   │   └── AuthorizationWorkflowTabs.js
│   │   │   ├── CMAlert.js & CMAlert.module.css
│   │   │   ├── CMOverview.js & CMOverview.module.css
│   │   │   ├── MemberHeader.js & MemberHeader.module.css
│   │   │   ├── MemberInfoBar.js
│   │   │   ├── MemberTabs.js & MemberTabs.module.css
│   │   │   └── shared/    # Shared member components
│   │   └── pages/        # Page-level components  
│   ├── constants/        # Application constants & static data
│   │   ├── index.js      # Main constants
│   │   ├── cmData.js     # Case management data
│   │   └── staticUserData.js  # User authentication data
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.js   # Authentication logic
│   │   ├── useMemberActions.js  # Member actions
│   │   └── useUserMode.js       # User mode & scenario management
│   ├── services/        # Data service layer
│   │   ├── apiService.js       # Legacy API interface
│   │   ├── authService.js      # Authentication service
│   │   ├── staticAuthService.js # Client-side auth implementation
│   │   ├── memberService.js    # Member data service
│   │   ├── dataService.js      # General data service
│   │   └── staticDataService.js # Static data provider
│   ├── types/           # TypeScript-style prop definitions
│   │   └── index.js
│   ├── utils/           # Utility functions
│   │   ├── helpers.js
│   │   └── memberUI.js
│   ├── assets/          # Static assets organized by feature
│   │   ├── authorizations/
│   │   ├── dashboard/
│   │   ├── header/
│   │   ├── icons/
│   │   └── login/
│   ├── App.js           # Main App component with routing
│   ├── App.css          # Global styles
│   ├── index.js         # Application entry point
│   └── index.css        # Base styles with Tailwind imports
├── craco.config.js      # CRACO configuration for Tailwind
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Client dependencies
```

## 🏗️ Architecture & Features

### Frontend (React)
- **Modern React**: React 19+ with hooks, functional components, and latest features
- **Styling**: Tailwind CSS + CSS Modules for scoped component styles
- **Data Layer**: Static JSON services with realistic healthcare data
- **Authentication**: Client-side JWT-like authentication with demo users
- **State Management**: Custom hooks for complex state (useAuth, useUserMode, useMemberActions)
- **Deep Linking**: Hash-based routing for bookmarkable authorization states
- **Responsive Design**: Mobile-first design with Tailwind CSS utilities
- **Component Architecture**: Modular components with clear separation of concerns

### Advanced Features
- **User Mode System**: Support for UM, UM-SNF, and CM user types with different dashboards
- **Scenario Management**: Dynamic content based on active clinical scenarios (sepsis)
- **Clinical Review Workflow**: Multi-step authorization review process with animations
- **Persona Switching**: Admin users can switch between different user personas
- **Static Data Services**: Complete healthcare data simulation without backend dependency
- **Real-time Updates**: Live data modifications based on user context and scenarios

## 🔧 Available Scripts

### Root Level Commands
```bash
npm start                    # Start React development server
npm run dev                  # Same as npm start  
npm run install:all          # Install all dependencies
npm run client:dev           # Start the client application
npm run client:build         # Build React app for production
npm run client:build:watch   # Build with watch mode
npm run build                # Production build
npm run test                 # Run client tests
npm run lint                 # Run linting
npm run clean                # Clean build artifacts and node_modules
```

### Client Commands (from client/ directory)
```bash
cd client
npm start                    # Start React development server
npm run build                # Create production build
npm run build:watch          # Build with file watching
npm test                     # Run React tests
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Run tests with coverage report
npm run lint                 # Run ESLint
npm run lint:fix             # Fix ESLint issues automatically
npm run format               # Format code with Prettier
```

## 🌐 Environment Configuration

### Development
- **Frontend:** http://localhost:3000
- **Data:** Static JSON files with realistic healthcare data
- **Authentication:** Client-side demo users

### Production
- **Build:** Optimized React production build
- **Deployment:** Static hosting compatible (Vercel, Netlify, GitHub Pages)
- **No environment variables required** - all configuration is client-side

## 🔒 Security Features
- Client-side password hashing with bcrypt-like implementation
- JWT-like tokens for session management (demo purposes)
- Role-based access control (UM, UM-SNF, CM)
- Input validation and sanitization
- No sensitive data transmission (all client-side)
- Secure demo environment for healthcare workflow testing

## � Data Architecture

### Static Data Structure
- **Users**: 6 demo users with different roles and access levels
- **Members**: Comprehensive healthcare plan member profiles
- **Authorizations**: Healthcare authorization requests with full workflow states
- **Providers**: Healthcare facilities and provider networks
- **Clinical Data**: Diagnoses, procedures, and medical codes
- **Dashboard Statistics**: Pre-calculated metrics for different user types

### User Roles & Data Access
- **UM (Utilization Management)**: Standard authorization reviews and sepsis scenarios
- **UM-SNF (Skilled Nursing)**: Specialized SNF authorization workflows  
- **CM (Case Management)**: High-priority case management tasks and member alerts
- **Admin**: Full access with persona switching capabilities

### Scenario System
- **Sepsis Scenario**: Modifies dashboard data and member information for UM users
- **User Mode Switching**: Different data views based on active user role
- **Dynamic Statistics**: Real-time calculation based on scenarios and user context

## 🧪 Testing & Quality
- **Component Testing**: Individual React component functionality verification
- **User Workflow Testing**: End-to-end testing of healthcare authorization workflows
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge compatibility
- **Responsive Testing**: Mobile, tablet, and desktop layouts
- **Static Data Validation**: Ensuring data consistency across scenarios
- **Performance Testing**: Client-side rendering and state management optimization
- **Accessibility Testing**: WCAG compliance for healthcare applications

## 🚢 Deployment

### Static Hosting Deployment
- **Build Process**: Optimized production build with code splitting and tree shaking
- **Hosting Options**: Vercel, Netlify, GitHub Pages, or any static hosting provider
- **Zero Configuration**: No environment variables or server setup required
- **CDN Ready**: Automatic asset optimization and caching

### Build Commands
```bash
npm run build                # Create production build
npm run client:build         # Alternative build command
```

### Deployment Platforms
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag-and-drop build folder or connect repository  
- **GitHub Pages**: Use existing deploy-client.yml workflow
- **Custom Hosting**: Upload build folder contents to any web server

## Development Workflow
1. **Feature Development**: Edit files in `client/src/` directory
2. **Hot Reload**: Changes trigger instant recompilation and browser refresh
3. **Static Data**: Modify JSON data in `client/src/constants/` and services
4. **Component Development**: Create modular components with CSS Modules
5. **State Management**: Use custom hooks for complex application state
6. **User Testing**: Switch between personas and scenarios to test workflows
7. **Build Testing**: Test production builds before deployment

## Troubleshooting

**Development server won't start?**
- Ensure Node.js v18+ is installed
- Clear cache: `npm run clean`
- Reinstall dependencies: `npm run install:all`
- Check port 3000 is available

**Hot reload not working?**
- Save files (Ctrl+S)
- Check terminal for compilation errors
- Restart development server: Ctrl+C then `npm start`

**CSS/Styling issues?**
- Check Tailwind CSS configuration in `tailwind.config.js`
- Verify PostCSS setup in `postcss.config.js`
- Ensure CSS Modules are properly imported

**Authentication issues?**
- Clear browser localStorage
- Check demo user credentials (password: `password123`)
- Verify static user data in `constants/staticUserData.js`

**Persona switching not working?**
- Use admin@myhealthplan.com to access persona switching
- Check browser console for JavaScript errors
- Verify persona data in authentication service

**Build failures?**
- Clear `client/build` directory
- Check for JavaScript syntax errors
- Ensure all imports have valid file paths

## Password Management

### 🔒 Simple Demo Authentication
All demo users share the same password: **`password123`**

### � Available Demo Users
- **admin@myhealthplan.com** - Full admin access with persona switching
- **maria.hartsell@myhealthplan.com** - UM role with sepsis scenario access
- **elise.tran@myhealthplan.com** - UM-SNF role for skilled nursing workflows
- **karen.white@myhealthplan.com** - CM role for case management
- **john.doe@myhealthplan.com** - Standard user
- **jane.smith@myhealthplan.com** - Standard user

### 🔧 Customizing Authentication
To modify users or authentication:
1. Edit `client/src/constants/staticUserData.js`
2. Update user roles, names, or credentials
3. Restart development server

---
**Created**: December 2024 | **Updated**: June 30, 2025 | Optimized for enterprise healthcare workflows and developer experience
