# MyHealthPlan Client

This is the React frontend for the MyHealthPlan healthcare authorization management system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- No backend or database required - fully client-side application

### Development
```bash
npm start                    # Start development server (http://localhost:3000)
npm run build                # Create production build
npm test                     # Run tests
npm run lint                 # Run ESLint
```

## 🏗️ Architecture

### Technology Stack
- **React 19+** with functional components and hooks
- **Tailwind CSS + CSS Modules** for styling
- **Static Data Services** for healthcare data simulation
- **Client-side Authentication** with demo users
- **React Router** with hash-based deep linking

### Key Features
- **Multi-step Clinical Review Workflow** with 4 phases
- **User Persona System** (UM, UM-SNF, CM roles)
- **Scenario Management** (sepsis scenario modifications)
- **Real-time Data Modifications** based on user context
- **Hash-based Deep Linking** for authorization states
- **Responsive Design** optimized for healthcare workflows

### Demo Authentication
All users use password: **`password123`**

**Available Users:**
- `admin@myhealthplan.com` - Admin with persona switching
- `maria.hartsell@myhealthplan.com` - UM role
- `elise.tran@myhealthplan.com` - UM-SNF role  
- `karen.white@myhealthplan.com` - CM role
- `john.doe@myhealthplan.com` - Standard user
- `jane.smith@myhealthplan.com` - Standard user

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── Dashboard.js         # Main dashboard
│   ├── Login.js            # Authentication
│   ├── Member.js           # Member management
│   ├── common/             # Reusable components
│   ├── guards/             # Route protection
│   └── member/             # Member-specific components
│       └── authorization/  # Authorization workflow
├── constants/              # Static data & configuration
├── hooks/                  # Custom React hooks
├── services/               # Data & authentication services
├── types/                  # TypeScript-style definitions
├── utils/                  # Helper functions
└── assets/                 # Static assets
```

## 🔧 Configuration Files

- **`craco.config.js`** - CRACO configuration for Tailwind CSS
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`postcss.config.js`** - PostCSS configuration
- **`.prettierrc.js`** - Code formatting rules

## 🧪 Testing & Development

### Available Scripts
```bash
npm start                    # Development server with hot reload
npm test                     # Run tests in watch mode
npm test:coverage            # Run tests with coverage report
npm run build                # Production build
npm run build:watch         # Build with file watching
npm run lint                 # ESLint code analysis
npm run lint:fix             # Auto-fix ESLint issues
npm run format               # Format code with Prettier
```

### Development Features
- **Hot Reload** - React Fast Refresh for instant updates
- **Static Data** - No backend setup required
- **Component Modularity** - CSS Modules + Tailwind CSS
- **Real-time Scenarios** - Dynamic data based on user context
- **Cross-browser Support** - Chrome, Firefox, Safari, Edge

## 🚢 Deployment

### Build Process
```bash
npm run build                # Creates optimized production build
```

The build folder contains:
- Optimized React bundle with code splitting
- Static assets with cache-friendly filenames
- Service worker for offline functionality
- Ready for deployment to any static hosting

### Hosting Options
- **Vercel** - Connect GitHub repo for automatic deployments
- **Netlify** - Drag-and-drop or connect repository
- **GitHub Pages** - Static site hosting
- **AWS S3** - Static website hosting
- **Any web server** - Upload build folder contents

## 🔍 Troubleshooting

**Development server won't start?**
- Ensure Node.js v18+ is installed
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check port 3000 availability

**Hot reload not working?**
- Save files and check terminal for errors
- Restart: `Ctrl+C` then `npm start`

**Styling issues?**
- Verify Tailwind configuration in `tailwind.config.js`
- Check CSS Modules imports match component names
- Ensure PostCSS is configured correctly

**Authentication problems?**
- Clear browser localStorage: `localStorage.clear()`
- Use correct password: `password123` for all demo users
- Check browser console for JavaScript errors

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and enhanced with CRACO for Tailwind CSS integration.
