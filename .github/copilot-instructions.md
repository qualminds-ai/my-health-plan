# GitHub Copilot Instructions for MyHealthPlan

This file provides essential context and coding guidelines for AI agents working on the MyHealthPlan project.

## Project Overview

MyHealthPlan is a **healthcare authorization management MVP** with sophisticated clinical workflows:
- **Purpose**: Enterprise-ready demo showcasing healthcare authorization workflows with clinical review systems
- **Architecture**: React 19+ frontend with static data simulation
- **Key Features**: Multi-step clinical review, user personas, scenario-based data modifications, hash-based deep linking
- **Authentication**: Static authentication with persona switching and role-based access (3 user types: UM, UM-SNF, CM)

## 🚀 Development Workflow (Essential Commands)

```bash
# Start everything
npm start                    # Starts frontend (3000)

# Package management
npm run install:all          # Install all dependencies (root + client)

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
│   ├── services/            # Static data services (staticAuthService, staticDataService)
│   ├── hooks/              # Custom hooks (useAuth, useUserMode, useMemberActions)
│   └── constants/          # App constants & scenario data
```

### Static Data Architecture
**Important**: This project uses **static data services** for demo purposes
- **Files**: `client/src/services/staticDataService.js` + `client/src/constants/staticData.js`
- **Authentication**: Static user validation with localStorage persistence
- **Data Storage**: JSON-based static data with scenario modifications
- **State Management**: Client-side only with localStorage for persistence


## 💻 Code Patterns & Examples

### React Component Pattern (Tailwind + CSS Modules)
```javascript
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import staticDataService from '../services/staticDataService';
import styles from './Component.module.css';

const ExampleComponent = ({ memberData, onUpdate }) => {
    const [data, setData] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await staticDataService.getMemberData();
                setData(response);
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

### Static Data Service Pattern
```javascript
const staticDataService = {
    getMemberData: () => {
        // Return static member data
        return memberData;
    },
    
    getAuthorizationData: (memberId) => {
        // Return static authorization data for member
        return authorizationData.filter(auth => auth.memberId === memberId);
    }
};

export default staticDataService;
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
- **Centralized**: `client/src/services/staticDataService.js` with static data management
- **Authentication**: Static user validation with localStorage persistence
- **Data Management**: JSON-based data with scenario modifications
- **Error Handling**: Consistent error format across all data operations

## 🎯 Key Features & Data Management

### Static Data Structure
- **Member Data**: Healthcare plan members (MEM001, MEM002, etc.)
- **Authorization Data**: Main business entity (2025OP000389, etc.)
- **Reference Data**: Providers, diagnoses, DRG codes stored as static JSON

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
- **Services**: camelCase (`staticDataService.js`, `staticAuthService.js`)
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

1. **Static Data Management**: Ensure static data services return consistent format
2. **CSS organization**: Write styles in CSS Modules files, not inline or global CSS
3. **Component IDs**: Add unique IDs to buttons, links, rows for testability
4. **Data calls**: Use service layer (`staticDataService.js`), not direct data access
5. **User scenarios**: Remember UM users see sepsis modifications, SNF users see different data
6. **Persona switching**: Admin can become Maria/Elise/Karen without logout

## 🎯 Development Workflow
1. Focus on sophisticated user workflows and clinical features
2. Create modular React components with CSS Modules and Tailwind styling
3. Implement static data services for healthcare data simulation
4. Add comprehensive error handling and user feedback systems
5. Test complex user workflows (login → dashboard → member lookup → clinical review)
6. Implement user persona switching and scenario management
7. Test multi-step clinical review processes and authorization workflows



Very Important: Remember: Do not change IDs of any element
---

*This file provides comprehensive guidance for GitHub Copilot when working on MyHealthPlan. Follow these conventions to maintain code quality and consistency across the project. This is an enterprise-ready MVP with sophisticated healthcare workflows - prioritize working clinical features and maintain professional code standards.*
