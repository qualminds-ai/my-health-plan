# GitHub Copilot Instructions for MyHealthPlan

This file provides essential context and coding guidelines for AI agents working on the MyHealthPlan project.

## Project Overview

MyHealthPlan is a **healthcare authorization management MVP** with sophisticated clinical workflows:
- **Purpose**: Enterprise-ready demo showcasing healthcare authorization workflows with clinical review systems
- **Architecture**: React 19+ frontend + Node.js/Express backend + PostgreSQL with custom migration system
- **Key Features**: Multi-step clinical review, user personas, scenario-based data modifications, hash-based deep linking
- **Authentication**: JWT + bcrypt with persona switching and role-based access (3 user types: UM, UM-SNF, CM)

## 🚀 Development Workflow (Essential Commands)

```bash
# Start everything (auto-creates DB)
npm start                    # Starts both frontend (3000) and backend (5000)

# Database management 
npm run db:setup             # Full database setup (creates DB + migrations + seeds)
npm run db:migrate           # Run pending migrations only
npm run db:status            # Check migration status
cd server && npm run db:create "name"  # Create new migration

# Package management
npm run install:all          # Install all dependencies (root + client + server)

# Production build
npm run client:build         # Build React app for production
```

**Demo Users** (all use password: `password123`):
- `admin@myhealthplan.com` (can switch personas)
- `maria.hartsell@myhealthplan.com` (UM mode)
- `elise.tran@myhealthplan.com` (UM-SNF mode) 
- `karen.white@myhealthplan.com` (CM mode)

## 🏗️ Architecture Patterns

### Project Structure
```
my-health-plan/
├── client/src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── member/          # Member-specific components
│   │   │   └── authorization/  # Clinical review workflow
│   │   └── guards/          # Route protection
│   ├── services/            # API layer (apiService, authService, memberService)
│   ├── hooks/              # Custom hooks (useAuth, useUserMode, useMemberActions)
│   └── constants/          # App constants & scenario data
└── server/
    ├── routes/             # Express routes with route handlers
    ├── models/             # Database models extending BaseModel
    ├── middleware/         # Auth & error handling middleware
    └── db/migrations/      # SQL migration files (YYYYMMDDHHMMSS_name.sql)
```

### Database Migration System
**Critical**: This project uses a **custom CLI-based migration system** (not Sequelize/Prisma)
- **Files**: `server/scripts/db.js` (CLI) + `server/db/migrations/*.sql`
- **Create**: `cd server && npm run db:create "description"` 
- **Execute**: `npm run db:migrate`
- **Track**: Uses `schema_migrations` table for versioning
- **Format**: Pure SQL files with timestamp prefixes


## 💻 Code Patterns & Examples

### React Component Pattern (Tailwind + CSS Modules)
```javascript
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import apiService from '../services/apiService';
import styles from './Component.module.css';

const ExampleComponent = ({ memberData, onUpdate }) => {
    const [data, setData] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/endpoint');
                setData(response.data);
            } catch (error) {
                console.error('❌ Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            {/* Hybrid: CSS Modules + Tailwind classes */}
            <h2 className={`${styles.title} text-lg font-semibold`}>
                {memberData.name}
            </h2>
            <button 
                id="update-member-btn"  // Always add IDs for actionable items
                className={`${styles.button} hover:bg-blue-600`}
                onClick={onUpdate}
            >
                Update
            </button>
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
const { asyncHandler } = require('../middleware/errorHandler');

router.get('/endpoint', auth, asyncHandler(async (req, res) => {
    const data = await SomeModel.findAll();
    res.json({
        success: true,
        data,
        message: 'Data retrieved successfully'
    });
}));

module.exports = router;
```

### Database Model Pattern (extends BaseModel)
```javascript
const BaseModel = require('./BaseModel');

class ExampleModel extends BaseModel {
    constructor() {
        super('table_name');
    }
    
    async customMethod(params) {
        const query = `SELECT * FROM ${this.tableName} WHERE condition = $1`;
        return await this.query(query, [params]);
    }
}

module.exports = new ExampleModel();
```

## 🎯 Key Features & Workflows

### User Persona System (useUserMode hook)
- **3 User Types**: UM, UM-SNF, CM with different dashboard views
- **Persona Switching**: Admin can switch between Maria/Elise/Karen personas
- **Scenario Management**: "Sepsis" scenario modifies data for UM users via URL params (`?sepsis=true`)
- **State Persistence**: Mode & scenarios saved in localStorage
- **Data Modifications**: Different users see different authorization priorities & stats

### Clinical Review Workflow
- **4-Step Process**: Guidelines Search → Clinical Indications → Care Planning → Goal Length of Stay
- **Hash Routing**: Deep linking to specific authorization states (`#/member/MEM001?auth=2025OP000389`)
- **Progressive Animation**: Clinical indicators reveal with smooth transitions
- **State Management**: Previous/Next navigation with validation

### API Service Layer
- **Centralized**: `client/src/services/apiService.js` with axios interceptors
- **Auto-logout**: 401 responses clear all storage and redirect to login
- **Token Management**: JWT tokens auto-added to requests
- **Error Handling**: Consistent error format across all API calls

## 🗄️ Database Schema & Patterns

### Key Tables
- **users**: Authentication with role-based access
- **members**: Healthcare plan members (MEM001, MEM002, etc.)
- **authorizations**: Main business entity (2025OP000389, etc.)
- **providers**, **diagnoses**, **drg_codes**: Reference data

### Migration Commands
```bash
# Create new migration (server directory)
cd server && npm run db:create "add_new_table"

# Migration file format: server/db/migrations/20241217120000_add_new_table.sql
CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## ⚠️ Critical Patterns & Conventions

### CSS Modules + Tailwind Hybrid
```css
/* Component.module.css */
.container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: all 0.3s ease;
}

.button {
    @apply px-4 py-2 rounded-lg font-medium; /* Tailwind utilities */
    background-color: #3b82f6;
}
```

```javascript
// In component - ALWAYS combine both approaches
<div className={styles.container}>
    <button className={`${styles.button} hover:bg-blue-600 text-white`}>
        Action
    </button>
</div>
```

### File Naming & Organization
- **Components**: PascalCase (`Dashboard.js`, `MemberHeader.js`)
- **CSS Modules**: Match component name (`Dashboard.module.css`)
- **Services**: camelCase (`apiService.js`, `authService.js`)
- **Migrations**: `YYYYMMDDHHMMSS_description.sql`
- **Always add IDs**: `<button id="save-member-btn">` for all interactive elements

### Error Handling & Logging
```javascript
// Always use emojis for better log visibility
console.log('🚀 Starting data fetch...');
console.log('✅ Data loaded successfully');
console.error('❌ API call failed:', error);
console.log('🔄 Retrying request...');
```

### State Management Patterns
- **useAuth**: Authentication & user state
- **useUserMode**: Persona switching & scenario management (sepsis, etc.)
- **useMemberActions**: Member-specific operations
- **localStorage**: Persist user mode, scenarios, active persona

## 🚨 Common Pitfalls & Solutions

1. **Database migrations**: Always use `cd server && npm run db:create "name"` (custom CLI, not Sequelize)
2. **CSS organization**: Write styles in CSS Modules files, not inline or global CSS
3. **Component IDs**: Add unique IDs to buttons, links, rows for testability
4. **API calls**: Use service layer (`apiService.js`), not direct axios calls
5. **User scenarios**: Remember UM users see sepsis modifications, SNF users see different data
6. **Persona switching**: Admin can become Maria/Elise/Karen without logout

## 🎯 Development Workflow
1. Focus on sophisticated user workflows and clinical features
2. Create database migrations for healthcare data model enhancements  
3. Implement comprehensive API endpoints with advanced validation
4. Create modular React components with CSS Modules and Tailwind styling
5. Add comprehensive error handling and user feedback systems
6. Test complex user workflows (login → dashboard → member lookup → clinical review)
7. Implement user persona switching and scenario management
8. Test multi-step clinical review processes and authorization workflows



Very Important: Remember: Do not change IDs of any element
---

*This file provides comprehensive guidance for GitHub Copilot when working on MyHealthPlan. Follow these conventions to maintain code quality and consistency across the project. This is an enterprise-ready MVP with sophisticated healthcare workflows - prioritize working clinical features and maintain professional code standards.*
