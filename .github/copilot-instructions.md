# GitHub Copilot Instructions for MyHealthPlan

This file provides essential context and coding guidelines for AI agents working on the MyHealthPlan project.

## Project Overview

MyHealthPlan is a **client-side healthcare authorization management MVP** with sophisticated clinical workflows:
- **Purpose**: Enterprise-ready demo showcasing healthcare authorization workflows with clinical review systems
- **Architecture**: React 19+ frontend with static data simulation (NO backend required)
- **Key Features**: Multi-step clinical review, user personas, scenario-based data modifications, hash-based deep linking
- **Authentication**: Static authentication with persona switching and role-based access (3 user types: UM, UM-SNF, CM)

## 🚀 Development Workflow (Essential Commands)

```bash
# Start everything (100% client-side)
npm start                    # Starts React dev server on :3000

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
│   │   └── guards/          # Route protection (ProtectedRoute, PublicRoute)
│   ├── services/            # Static data services (staticAuthService, staticDataService)
│   ├── hooks/              # Custom hooks (useAuth, useUserMode, useMemberActions)
│   ├── constants/          # App constants & scenario data (staticData.js, staticUserData.js)
│   └── assets/             # Organized by feature (authorizations/, dashboard/, header/)
```

### Static Data Architecture
**Critical**: This project uses **static data services** for demo purposes - NO backend required
- **Files**: `client/src/services/staticDataService.js` + `client/src/constants/staticData.js`
- **Authentication**: Static user validation with localStorage persistence
- **Data Storage**: JSON-based static data with scenario modifications (sepsis, SNF)
- **State Management**: Client-side only with localStorage for persistence

## 💻 Code Patterns & Examples

### React Component Pattern (CSS Modules + Tailwind Hybrid)
```javascript
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import staticDataService from '../services/staticDataService';
import styles from './Component.module.css';

const ExampleComponent = ({ memberData, onUpdate }) => {
    const [data, setData] = useState([]);
    const { user, activeMode, scenarios } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await staticDataService.getMemberData(activeMode, scenarios);
                setData(response);
            } catch (error) {
                console.error('❌ Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [activeMode, scenarios]);

    return (
        <div className={styles.container}>
            {/* CSS Modules + Tailwind hybrid approach */}
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

### Authentication & User Mode Pattern
```javascript
// Always use the useAuth hook for user state and scenarios
const { 
    user, 
    activeMode,        // 'UM', 'UM-SNF', or 'CM'
    scenarios,         // ['sepsis'] for active scenarios
    switchUserMode,    // Function to change user mode
    toggleScenario     // Function to toggle scenarios
} = useAuth();

// Pass mode and scenarios to all data service calls
const data = await staticDataService.getDashboardStats(activeMode, scenarios);
```

## 🎯 Key Features & Data Management

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
- **Components**: `AuthorizationClinicalReview.js` orchestrates 4 step components

### Static Data Service Layer
- **Centralized**: `client/src/services/staticDataService.js` manages all healthcare data
- **Authentication**: `client/src/services/staticAuthService.js` handles login/logout
- **Data Structure**: `client/src/constants/staticData.js` contains all JSON data
- **Scenario Support**: Data automatically modified based on `activeMode` and `scenarios` parameters

## ⚠️ Critical Patterns & Conventions

### CSS Modules + Tailwind Hybrid (Required Pattern)
```css
/* Component.module.css */
.container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: all 0.3s ease;
}

.button {
    @apply px-4 py-2 rounded-lg font-medium; /* Tailwind utilities in CSS Modules */
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
- **useAuth**: Authentication & user state management with persona switching
- **useUserMode**: Persona switching & scenario management (sepsis scenarios, etc.)
- **useMemberActions**: Member-specific operations
- **localStorage**: Persist user mode, scenarios, active persona across sessions

## 🚨 Common Pitfalls & Solutions

1. **Static Data Management**: Always pass `activeMode` and `scenarios` to data service calls
2. **CSS Organization**: Write styles in CSS Modules files, use Tailwind in className attributes
3. **Component IDs**: Add unique IDs to buttons, links, rows for testability
4. **Data Service Calls**: Use service layer methods, never access `constants/staticData.js` directly
5. **User Scenarios**: Remember UM users see sepsis modifications, SNF users see different data
6. **Persona Switching**: Admin can become Maria/Elise/Karen without logout

## 🎯 Development Best Practices
1. **Component Pattern**: CSS Modules for complex styles + Tailwind for utilities
2. **Data Flow**: Always use `staticDataService.js` methods with mode/scenario parameters
3. **Authentication**: Use `useAuth()` hook for all user state and persona management
4. **Clinical Workflows**: Multi-step components in `member/authorization/clinical-review-steps/`
5. **Deep Linking**: Support hash-based navigation for authorization states
6. **Responsive Design**: Mobile-first with Tailwind utilities

---

*This file provides comprehensive guidance for GitHub Copilot when working on MyHealthPlan. Follow these conventions to maintain code quality and consistency across the project. This is an enterprise-ready MVP with sophisticated healthcare workflows - prioritize working clinical features and maintain professional code standards.*
