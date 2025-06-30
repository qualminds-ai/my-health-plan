# GitHub Copilot Instructions for MyHealthPlan

This file provides context and coding guidelines for GitHub Copilot when working on the MyHealthPlan project.

## Project Overview

MyHealthPlan is a **comprehensive healthcare authorization management MVP** featuring advanced clinical workflows:
- **Purpose**: Sophisticated proof-of-concept for healthcare authorization management with clinical review systems
- **Scope**: Advanced features - multi-step clinical review, user personas, scenario management, authorization workflows
- **Target**: Enterprise-ready demo with sophisticated healthcare workflows for stakeholder validation
- **Frontend**: React 19+ with Tailwind CSS + CSS Modules, functional components, advanced hooks
- **Backend**: Node.js/Express with PostgreSQL and comprehensive API layer
- **Authentication**: JWT-based with bcrypt, persona switching, role-based access
- **Database**: Custom SQL-based migration system with complex healthcare data models
- **Architecture**: Clean separation of concerns, MVC pattern, modular component architecture

## Core Technologies & Versions

- **Node.js**: v16+
- **React**: 19+ with hooks, functional components, and latest features
- **PostgreSQL**: Latest with connection pooling and advanced indexing
- **Express**: v4.18+
- **JWT**: jsonwebtoken v9.0+
- **bcrypt**: v5.1+ (10 salt rounds)
- **Tailwind CSS**: v3.4+ for utility-first styling
- **CSS Modules**: Scoped component styling with .module.css files
- **CRACO**: Create React App Configuration Override for Tailwind integration
- **React Router**: v7.6+ with HashRouter for deep linking
- **Axios**: v1.9+ for API communication
- **PropTypes**: v15.8+ for component prop validation

## Project Structure Conventions

```
my-health-plan/
├── client/src/
│   ├── components/     # React functional components
│   │   ├── common/     # Reusable components (ModeSwitcher, StatsCard, etc.)
│   │   ├── member/     # Member-specific components with authorization workflows
│   │   │   ├── authorization/  # Multi-step clinical review system
│   │   │   │   ├── clinical-review-steps/  # 4-step clinical review process
│   │   │   │   └── AuthorizationWorkflowTabs.js
│   │   │   ├── CMAlert.js & CMAlert.module.css
│   │   │   ├── MemberHeader.js & MemberHeader.module.css
│   │   │   └── MemberTabs.js & MemberTabs.module.css
│   │   ├── guards/     # Route protection components
│   │   └── pages/      # Page-level components
│   ├── services/       # API service layer (apiService, authService, memberService)
│   ├── hooks/          # Custom React hooks (useAuth, useUserMode, useMemberActions)
│   ├── constants/      # Application constants and CM data
│   ├── utils/          # Helper functions and UI utilities
│   ├── assets/         # Static assets organized by feature
│   └── types/          # TypeScript-style prop definitions
└── server/
    ├── routes/         # Express routes (contains route handlers)
    ├── models/         # Database models (BaseModel pattern)
    ├── middleware/     # Express middleware
    ├── db/            # Database connection & migrations
    ├── scripts/       # Utility scripts (db.js CLI)
    └── utils/         # Server utilities
```


## Coding Standards & Best Practices

### General Guidelines
- **MVP First**: Prioritize working features over perfect code
- **ES6+**: Use modern JavaScript features (async/await, destructuring, arrow functions)
- **Error Handling**: Basic try-catch blocks for async operations, user-friendly messages
- **Logging**: Use console.log with emojis for better visibility (🚀, ✅, ❌, 🔄)
- **Comments**: Add JSDoc comments for complex functions only
- **Security**: Basic security measures, environment variables for secrets
- **Demo-Ready**: Code should work reliably for demonstrations

### Refactoring & Code Organization Guidelines
- **Component Decomposition**: When adding new UI or logic, always create a new logical React component instead of expanding existing large files. Keep components focused and maintainable.
- **CSS Organization**: Write all new CSS in the respective CSS/Module CSS file for the component. Avoid inline styles and global CSS unless absolutely necessary.
- **Separation of Concerns**: Move reusable logic into custom hooks (`hooks/`) or utility functions (`utils/`).
- **File Structure**: Place new components in the correct subfolder under `components/` (e.g., `components/member/` for member-related UI).
- **Naming**: Use clear, descriptive names for new components, hooks, and CSS classes.
- **Refactor When Needed**: If a component grows too large or handles multiple concerns, refactor it into smaller, focused components.
- **No Code Bloat**: Avoid adding unrelated logic or UI to existing components—prefer composition and modularity.
- **Actionable Item IDs**: For every actionable item (buttons, links, rows, etc.), always add a unique and descriptive `id` attribute, following the existing project conventions. This improves testability and maintainability.

### Frontend (React) Guidelines
- Use functional components with hooks; focus on modular component architecture.
- Use Tailwind CSS classes extensively with CSS Modules for component-specific styles.
- Use the service layer (`apiService.js`, `authService.js`, `memberService.js`) for API calls.
- Implement advanced state management with custom hooks (useAuth, useUserMode, useMemberActions).
- Create focused components for complex workflows (clinical review steps, authorization management).
- Use deep linking with HashRouter for bookmarkable application states.
- Implement user personas and scenario-based UI modifications.

### Backend (Node.js/Express) Guidelines
- Use simple routes with direct database queries; avoid over-abstraction.
- Extend `BaseModel` for common operations; keep business logic minimal.
- Use `express.Router()` and middleware (route handlers are in `routes/`).
- Use the pool connection; avoid complex ORM patterns.
- Basic input validation and data sanitization for demo safety.
- Use consistent response format and appropriate HTTP status codes.
- Use JWT middleware for protected routes and simple role checking.

### Database Guidelines
- Use the custom CLI for schema changes (`npm run db:create "description"`).
- Write clean, readable SQL focused on core functionality and basic indexing.
- Use transactions for multi-step operations where data integrity matters.
- Use snake_case for database columns, camelCase in JavaScript.
- Define relationships for core entities; avoid over-normalization.
- Seed with realistic sample data for effective demonstrations.

## Authentication System

- **Password**: All demo users use `password123`
- **Hashing**: bcrypt with 10 salt rounds
- **Tokens**: JWT with 24h expiration
- **Demo Users**:
  - `admin@myhealthplan.com` (Admin)
  - `maria.hartsell@myhealthplan.com` (Admin)
  - `john.doe@myhealthplan.com` (User)
  - `jane.smith@myhealthplan.com` (User)

## Advanced Features

### Clinical Review System
- **Multi-step workflow**: 4-phase clinical review process (Guidelines Search, Clinical Indications, Care Planning, Goal Length of Stay)
- **Interactive components**: ClinicalReviewStep1-4 components with state management
- **Animation system**: Progressive reveal of clinical indicators with smooth transitions
- **Deep linking**: Hash-based URLs for bookmarkable authorization states

### User Management
- **User personas**: Multiple user contexts with role-based UI modifications
- **User modes**: UM (Utilization Management), UM-SNF (Skilled Nursing Facility), CM (Case Management)
- **Scenario management**: Dynamic content based on active clinical scenarios (sepsis workflow)
- **State persistence**: User preferences and modes saved across sessions

### Authorization Workflow
- **Multi-tab interface**: Request Submitted, Clinical Review, Closed authorization states
- **Document management**: Comprehensive attachment system with file handling
- **Real-time updates**: Live scenario-based data modifications
- **Workflow navigation**: Previous/Next step controls with state validation

## Database Migration System

- **CLI Tool**: `server/scripts/db.js` handles all database operations
- **Commands**:
  - `npm run db:setup` - Full database setup
  - `npm run db:migrate` - Run pending migrations
  - `npm run db:create "name"` - Create new migration
  - `npm run db:status` - Check migration status
- **File Format**: `YYYYMMDDHHMMSS_description.sql`
- **Tracking**: Uses `schema_migrations` table for versioning

## API Conventions

### Endpoints Structure
- **Auth**: `/api/auth/*` (login, logout, me)
- **Dashboard**: `/api/dashboard/*` (stats, authorizations, member details)
- **Health**: `/api/health` (system health check)
- **Members**: `/api/dashboard/member/:memberNumber` (member details)
- **Authorizations**: `/api/dashboard/authorizations/:id` (authorization details)

### Response Format
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

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Internal Server Error

## Environment Configuration

### Development (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=my_health_plan
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
```

### Production
- Use `DATABASE_URL` for PostgreSQL connection
- Set `NODE_ENV=production`
- Configure SSL for database connections

## Common Patterns & Examples

### Database Model Pattern
```javascript
class ExampleModel extends BaseModel {
    constructor() {
        super('table_name');
    }
    
    async customMethod(params) {
        const query = `SELECT * FROM ${this.tableName} WHERE condition = $1`;
        return await this.query(query, [params]);
    }
}
```

### React Component Pattern
```javascript
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import apiService from '../services/apiService';
import styles from './Component.module.css';

const ExampleComponent = ({ memberData, onUpdate }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/endpoint');
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className="flex items-center justify-between mb-4">
                {/* Tailwind + CSS Modules hybrid approach */}
                <h2 className={`${styles.title} text-lg font-semibold`}>
                    {memberData.name}
                </h2>
            </div>
            {/* Component content */}
        </div>
    );
};

ExampleComponent.propTypes = {
    memberData: PropTypes.object.isRequired,
    onUpdate: PropTypes.func
};

export default ExampleComponent;
```

### Express Route Pattern
```javascript
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Model = require('../models/Model');

router.get('/endpoint', auth, async (req, res) => {
    try {
        const data = await Model.findAll();
        res.json({
            success: true,
            data,
            message: 'Data retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
```

## Testing Guidelines
- Focus on manual testing of core workflows over automated tests.
- Ensure main user journeys work reliably (happy path testing).
- Test with realistic demo data and edge cases.
- Verify authentication and navigation flows.
- Check responsive design on different screen sizes.
- Ensure error states are user-friendly.

## Security Considerations
- Input validation, SQL injection prevention, and XSS protection.
- Use fixed demo passwords and clear user instructions.
- Separate development and demo environments.
- Configure CORS properly for demo hosting.
- Use JWT tokens with reasonable expiration times.
- Use demo data only; do not use real sensitive information.

## Performance Guidelines
- Optimize for smooth demo experience.
- Keep database queries simple and fast for demo data.
- Show loading indicators for better UX.
- Provide quick error recovery and clear messages.
- Ensure mobile responsiveness for demos.
- Optimize bundle size for quick initial load.

## Deployment Considerations
- Set all required environment variables.
- Run database migrations before deployment.
- Ensure health endpoint returns proper status.
- Implement proper logging for production debugging.
- Set up error tracking and monitoring.

## Development Workflow
1. Focus on sophisticated user workflows and clinical features.
2. Create database migrations for healthcare data model enhancements.
3. Implement comprehensive API endpoints with advanced validation.
4. Create modular React components with CSS Modules and Tailwind styling.
5. Add comprehensive error handling and user feedback systems.
6. Test complex user workflows (login → dashboard → member lookup → clinical review).
7. Implement user persona switching and scenario management.
8. Test multi-step clinical review processes and authorization workflows.

## Common Issues & Solutions

- **Database Connection**: Check PostgreSQL service and credentials
- **Authentication Failures**: Verify JWT secret and token expiration
- **CORS Issues**: Configure CORS middleware properly
- **Migration Errors**: Check SQL syntax and database permissions
- **Port Conflicts**: Use different ports or kill existing processes

## File Naming Conventions

- **React Components**: PascalCase (`Dashboard.js`, `LoginForm.js`)
- **CSS Modules**: Component.module.css (`Dashboard.module.css`, `Member.module.css`)
- **Services/Utilities**: camelCase (`apiService.js`, `authHelper.js`)
- **Database Files**: snake_case (`20241217000000_initial_schema.sql`)
- **Constants**: UPPER_SNAKE_CASE for values, camelCase for files

## Styling Guidelines

### CSS Modules + Tailwind Hybrid Approach
```css
/* Component.module.css */
.container {
  /* Component-specific styles */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.title {
  /* Use CSS Modules for complex animations and component-specific styling */
  transition: all 0.3s ease;
  color: var(--primary-color);
}

.button {
  /* Combine with Tailwind for responsive design */
  @apply px-4 py-2 rounded-lg font-medium;
  background-color: #3b82f6;
}
```

```javascript
// In component
<div className={styles.container}>
  <h2 className={`${styles.title} text-lg font-semibold`}>Title</h2>
  <button className={`${styles.button} hover:bg-blue-600`}>
    Action
  </button>
</div>
```

## Code Quality Standards

- **Linting**: Follow ESLint rules
- **Formatting**: Use consistent code formatting
- **Documentation**: Add JSDoc comments for complex functions
- **Error Messages**: Provide clear, actionable error messages
- **Logging**: Use structured logging with appropriate log levels

## Database Schema Overview

### Core Business Tables
- **users**: Authentication and user management
- **members**: Healthcare plan members with demographics
- **authorizations**: Healthcare authorization requests (main business entity)
- **providers**: Healthcare providers and facilities
- **diagnoses**: Medical diagnoses with ICD codes
- **drg_codes**: Diagnosis-Related Group codes for billing

### Reference Tables
- **priority_levels**: Authorization priority levels (High, Medium, Low)
- **review_types**: Types of review processes
- **status_types**: Authorization status tracking
- **dashboard_stats**: Cached dashboard statistics

### Support Tables
- **authorization_documents**: Document attachments for authorizations
- **authorization_notes**: Clinical notes and review comments
- **schema_migrations**: Database version control and migration tracking

### Key Relationships
- Members have multiple authorizations
- Authorizations link to providers, diagnoses, and DRG codes
- All entities have proper foreign key constraints
- Indexes optimized for dashboard queries

---

*This file provides comprehensive guidance for GitHub Copilot when working on MyHealthPlan. Follow these conventions to maintain code quality and consistency across the project. This is an enterprise-ready MVP with sophisticated healthcare workflows - prioritize working clinical features and maintain professional code standards.*
