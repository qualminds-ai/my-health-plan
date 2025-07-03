# MyHealthPlan Application

A comprehensive healthcare authorization management MVP with advanced clinical review features, user personas, and scenario-based workflows.

**🎯 Now running in Static Data Mode - No backend required!**

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- **No database required** - all data is now static!

### Setup & Run (2 commands)
```bash
npm run install:all    # Install dependencies
npm run client:dev     # Start frontend only (static mode)
```

**That's it!** 🎉
- No database setup needed - all data is hardcoded in the client
- Frontend: http://localhost:3000
- **100% client-side operation** with realistic demo data

## Tech Stack
- **Frontend**: React 19+ with Tailwind CSS & CSS Modules
- **Data**: Static JSON data with dynamic scenarios
- **Auth**: Client-side authentication with demo users
- **Build Tools**: Create React App with CRACO for Tailwind integration

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
- ✅ **Auto-reload**: Both frontend and backend restart on file changes
- ✅ **Hot reload**: React Fast Refresh for instant UI updates
- ✅ **Auto-setup**: Database automatically created and seeded on first run
- ✅ **Migration System**: Versioned database schema management
- ✅ **Health check**: `/api/health` endpoint with DB connectivity test
- ✅ **Cross-platform**: Works on Windows, macOS, Linux
- ✅ **Single command**: Everything starts with `npm start`
- ✅ **Component modularity**: Well-organized React component architecture
- ✅ **CSS Modules**: Scoped styling with CSS Modules and Tailwind CSS
- ✅ **Development tooling**: ESLint, Prettier, and VS Code integration

## Database Migration System

This project uses a **lightweight, SQL-based migration system** for reliable database management without external dependencies.

### Key Features
- ✅ **Lightweight**: Pure SQL migrations, no complex ORMs
- ✅ **Versioned**: Timestamp-based migration versioning
- ✅ **Trackable**: Migration history stored in database
- ✅ **Transactional**: Each migration runs in a transaction
- ✅ **CI/CD Ready**: Automatic deployment integration

### Quick Commands
```bash
# Database setup (first time)
npm run db:setup         # Creates DB + runs migrations + seeds

# Daily development
npm run db:status        # Check migration status
npm run db:migrate       # Run pending migrations
cd server && npm run db:create "description"  # Create new migration

# Production (runs automatically in CI/CD)
npm run db:migrate       # Safe for production deployment
```

### Migration Workflow

1. **Create a migration:**
   ```bash
   cd server
   npm run db:create "add_user_preferences"
   ```

2. **Edit the generated file:**
   ```sql
   -- server/db/migrations/20241217120000_add_user_preferences.sql
   CREATE TABLE user_preferences (
       id SERIAL PRIMARY KEY,
       user_id INTEGER NOT NULL,
       preference_key VARCHAR(100) NOT NULL,
       preference_value TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

3. **Run the migration:**
   ```bash
   npm run db:migrate
   ```

### Migration System Structure
```
server/
├── scripts/
│   └── db.js                            # Database Management CLI (migration engine)
└── db/
    ├── connection.js                    # Database connection pool
    ├── migrations/
    │   └── YYYYMMDDHHMMSS_description.sql   # Migration files
    └── seeds/
        └── 001_initial_data.sql         # Seed data
```

### Environment Variables
```env
# Development (.env file)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=my_health_plan
DB_USER=postgres
DB_PASSWORD=your_password

# Production (Railway/Heroku)
DATABASE_URL=postgresql://user:pass@host:port/db
```

### Production Deployment
Migrations run **automatically** in GitHub Actions:
- ✅ Zero-downtime deployments
- ✅ Automatic rollback on failure
- ✅ Transaction safety
- ✅ No manual intervention needed

## Environment Setup
Create `server/.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=my_health_plan
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
```

## 📁 Project Structure

### Overview
This is a full-stack healthcare management application with a React frontend and Node.js/Express backend.

### Root Directory
```
my-health-plan/
├── client/                 # React frontend application
├── server/                 # Node.js backend application
├── package.json           # Root package configuration
└── README.md             # Project documentation
```

### Client Structure (React Frontend)
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
│   ├── constants/        # Application constants
│   │   ├── index.js      # Main constants
│   │   └── cmData.js     # Case management data
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.js   # Authentication logic
│   │   ├── useMemberActions.js  # Member actions
│   │   └── useUserMode.js       # User mode & scenario management
│   ├── services/        # API service layer
│   │   ├── apiService.js
│   │   ├── authService.js
│   │   └── memberService.js
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
│   ├── App.js           # Main App component
│   ├── App.css          # Global styles
│   ├── index.js         # Application entry point
│   └── index.css        # Base styles with Tailwind imports
├── craco.config.js      # CRACO configuration for Tailwind
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Client dependencies
```

### Server Structure (Node.js Backend)
```
server/
├── controllers/         # Request handlers (organized by feature)
├── db/                 # Database layer
│   ├── connection.js   # Database connection
│   ├── migrations/     # SQL migration files
│   │   └── YYYYMMDDHHMMSS_description.sql
│   └── seeds/          # Database seed data
│       └── 001_initial_data.sql
├── middleware/         # Express middleware
│   ├── auth.js        # Authentication middleware
│   └── errorHandler.js # Error handling middleware
├── models/            # Data models
│   ├── BaseModel.js   # Base model class
│   ├── User.js        # User model
│   └── Member.js      # Member model
├── routes/            # API routes
│   ├── auth.js        # Authentication routes
│   └── dashboard.js   # Dashboard routes
├── scripts/           # Database & utility scripts
│   ├── db.js          # Unified database CLI (migrations, seeds, setup)
│   └── generate-user-hashes.js # Password hashing utilities
├── utils/             # Utility functions
│   ├── constants.js   # Server constants
│   └── helpers.js     # Helper functions
├── server.js          # Main server file
└── package.json       # Server dependencies
```

## 🏗️ Architecture & Features

### Frontend (React)
- **Modern React**: React 19+ with hooks, functional components, and latest features
- **Styling**: Tailwind CSS + CSS Modules for scoped component styles
- **Service Layer**: Centralized API calls with comprehensive error handling
- **Authentication**: JWT-based authentication with auto-refresh and persona switching
- **State Management**: Custom hooks for complex state (useAuth, useUserMode, useMemberActions)
- **Deep Linking**: Hash-based routing for bookmarkable authorization states
- **Responsive Design**: Mobile-first design with Tailwind CSS utilities
- **Component Architecture**: Modular components with clear separation of concerns

### Advanced Features
- **User Mode System**: Support for UM, UM-SNF, and CM user types
- **Scenario Management**: Dynamic content based on active clinical scenarios
- **Clinical Review Workflow**: Multi-step authorization review process
- **Animation System**: Smooth transitions and progressive UI reveals
- **Real-time Updates**: Live data modifications based on user context

### Backend (Node.js/Express)
- **MVC Architecture**: Clean separation with organized controllers, models, and routes
- **Database Layer**: PostgreSQL with connection pooling and custom migration system
- **Authentication**: JWT tokens with refresh capability and role-based access
- **Error Handling**: Centralized error handling middleware with detailed logging
- **Security**: Input validation, rate limiting, CORS, parameterized queries
- **Modular Design**: Reusable models with BaseModel pattern and utilities
- **Health Monitoring**: Comprehensive health check endpoints with database connectivity

## 🔧 Available Scripts

### Root Level Commands
```bash
npm start                    # Start both frontend and backend in development mode
npm run dev                  # Same as npm start
npm run install:all          # Install all dependencies (client + server)
npm run client:dev           # Start only the frontend
npm run server:dev           # Start only the backend
npm run client:build         # Build React app for production
npm run client:build:watch   # Build with watch mode
npm run db:setup             # Initialize database with schema and seed data
npm run passwords:generate   # Regenerate user password hashes
npm run dev:debug            # Start with server debugging enabled
npm run watch                # Watch mode for client builds
npm run test                 # Run all tests
npm run test:server          # Run server tests
npm run lint                 # Run linting on both client and server
npm run clean                # Clean all build artifacts and node_modules
npm run heroku-postbuild     # Production build for deployment
```

### Client-Specific Commands
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

### Server-Specific Commands
```bash
cd server
npm start                    # Start production server
npm run dev                  # Start with nodemon for development
npm run debug                # Start with debugging enabled
npm run db:setup             # Setup database
npm run db:migrate           # Run database migrations
npm run db:seed              # Seed database with test data
npm test                     # Run server tests
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Run tests with coverage
npm run lint                 # Run ESLint on server code
npm run lint:fix             # Fix ESLint issues
```

## 🌐 Environment Configuration

### Development
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Database:** PostgreSQL on localhost:5432

### Production
- Environment variables configured via .env files
- Database connection via DATABASE_URL
- JWT secrets properly configured
- CORS origins restricted
- Railway deployment ready with railway.json

## 🔒 Security Features
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 24h expiration
- Input validation and sanitization
- CORS properly configured  
- Rate limiting on API endpoints
- Environment variables for sensitive data
- Parameterized queries for SQL injection prevention

## 🗄️ Database Schema

### Core Business Tables
- **users**: Authentication and user management with role-based access
- **members**: Healthcare plan members with comprehensive demographics
- **authorizations**: Healthcare authorization requests (main business entity)
- **providers**: Healthcare providers and facilities with contract management
- **diagnoses**: Medical diagnoses with ICD-10 codes and categories
- **drg_codes**: Diagnosis-Related Group codes for billing and classification

### Reference Tables
- **priority_levels**: Authorization priority levels (High, Medium, Low)
- **review_types**: Types of review processes (Initial, Concurrent, etc.)
- **status_types**: Authorization status tracking workflow
- **dashboard_stats**: Cached dashboard statistics for performance

### Support Tables
- **authorization_documents**: Document attachments for authorizations
- **authorization_notes**: Clinical notes and review comments
- **schema_migrations**: Database version control and migration tracking

### Key Relationships & Indexes
- Members have multiple authorizations with foreign key constraints
- Authorizations link to providers, diagnoses, and DRG codes
- Comprehensive indexing for dashboard query optimization
- Database views for complex authorization summaries

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication with persona selection
- `POST /api/auth/logout` - User logout with session cleanup
- `GET /api/auth/me` - Get current user profile and permissions

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics with scenario modifications
- `GET /api/dashboard/authorizations` - List authorizations with filtering
- `GET /api/dashboard/member/:memberNumber` - Get member details

### Member Management  
- `GET /api/dashboard/member/:memberNumber` - Comprehensive member profile
- `PUT /api/dashboard/member/:memberNumber` - Update member information

### Health & Monitoring
- `GET /api/health` - Health check with database connectivity test

### Response Format
All API responses follow a consistent format:
```javascript
// Success Response
{
  success: true,
  data: {...},
  message: "Operation completed successfully"
}

// Error Response  
{
  success: false,
  error: "Error message",
  details: {...}
}
```

## 🧪 Testing & Quality
- **Manual Testing**: Focus on core user workflows and edge cases
- **Component Testing**: Individual component functionality verification
- **API Testing**: Backend endpoint validation and error handling
- **Integration Testing**: Full workflow testing from UI to database
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge compatibility
- **Responsive Testing**: Mobile, tablet, and desktop layouts
- **Security Testing**: Authentication flows and data protection
- **Performance Testing**: Load times and query optimization

## 🚢 Deployment

### Frontend
- **Build Process**: Optimized production build with code splitting
- **Static Hosting**: Ready for Vercel, Netlify, or Railway deployment
- **Environment**: Configurable API endpoints for different environments

### Backend  
- **Process Management**: PM2 ready for production scaling
- **Database**: PostgreSQL with connection pooling and migrations
- **Monitoring**: Health endpoints and structured logging
- **Containerization**: Docker-ready configuration

### Railway Deployment
- **Configuration**: Pre-configured railway.json for one-click deployment
- **Database**: Automated PostgreSQL provisioning and migration
- **Environment**: Production-ready environment variable management

## Development Workflow
1. **Feature Development**: Edit files in `client/` or `server/` directories
2. **Auto-reload**: Changes trigger instant recompilation and browser refresh
3. **Health Monitoring**: Check http://localhost:5000/api/health for backend status
4. **Debugging**: Use browser dev tools for frontend, VS Code debugger for backend
5. **Database Changes**: Use migration system for schema modifications
6. **Component Development**: Create modular components with CSS Modules
7. **State Management**: Use custom hooks for complex application state

## Troubleshooting

**Database connection issues?**
- Ensure PostgreSQL is running
- Check credentials in `server/.env`
- Check database user privileges
- Use `npm run db:status` to check migration state
- Try: `npm run db:setup`

**Port conflicts?**
- Default ports: 3000 (frontend), 5000 (backend)
- Kill existing processes or change ports in config

**Auto-reload not working?**
- Save files (Ctrl+S)
- Check terminal for errors
- Restart: Ctrl+C then `npm start`

**CSS/Styling issues?**
- Check Tailwind CSS configuration in `tailwind.config.js`
- Verify PostCSS setup in `postcss.config.js`
- Ensure CSS Modules are properly imported

**Authorization workflow issues?**
- Check hash-based routing parameters
- Verify user mode and scenario state
- Use browser dev tools to inspect component state

**Migration conflicts?**
- Use `npm run db:status` to check state
- Check SQL syntax and database permissions

## Password Management

### 🔒 Simple Password System
All users share the same password: **`password123`**

### 🛠️ Password Commands
```bash
npm run passwords:generate   # Regenerate password hashes if needed
```

### 🔧 How It Works
- Uses bcrypt with 10 salt rounds for security
- Outputs SQL for manual database updates or migration creation
- All users get the same password for simplicity

### 🚨 When to Regenerate
- If you change the default password in the script
- If login authentication stops working
- After modifying the user list in the script

---
**Created**: December 2024 | **Updated**: June 30, 2025 | Optimized for enterprise healthcare workflows and developer experience
