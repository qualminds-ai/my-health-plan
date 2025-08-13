# MyHealthPlan Application

A client-side healthcare authorization management MVP with clinical review workflow, user personas, and scenario-based data. No backend required.

## 🚀 Quick start

Prerequisites
- Node.js 18+
- No database/server needed (100% client-side)

Setup and run
```bash
npm run install:all    # install root + client deps
npm start              # start the client app on http://localhost:3000
```

## Tech stack
- React 19 with functional components and hooks
- Styling: Tailwind CSS + CSS Modules (via PostCSS)
- Router: React Router using HashRouter for static hosting (GitHub Pages)
- Data/services: Static data only (`staticDataService`, `staticData.js`)
- Auth: Client-only demo auth (`staticAuthService` + localStorage)
- Build: react-scripts (Create React App) with PostCSS (Tailwind + Autoprefixer).

## Demo access and personas

Credentials
- Password for demo users: password123
- Direct login is allowed for:
  - admin@myhealthplan.com
  - maria.hartsell@myhealthplan.com

Persona switching (after login)
- Switch between Maria (UM), Elise (UM, SNF), and Karen (CM) from the header menu.
- Admin can also use persona switching; Maria can switch personas too.

User modes
- UM (Utilization Management)
- UM-SNF (Skilled Nursing; displayed as “UM, SNF” in UI)
- CM (Case Management)

Scenario toggle
- Sepsis: enable via the UI or URL query parameter `?sepsis=true` (works with HashRouter).

## Core features
- Multi-step Clinical Review (4 steps)
  1) Guidelines Search and selection
  2) Clinical Indications with progressive reveal
  3) Care Planning
  4) Goal Length of Stay
- Authorization workflow tabs: Request Submitted, Clinical Review, Closed (others are placeholders)
- Hash-based deep linking for members and authorization state
  - Example: `#/member/MEM001?tab=Authorizations&authTab=Clinical%20Review&requestTab=2025OP000389&step=2`
- Dashboard and authorizations adapt to active user mode and scenarios (e.g., sepsis)
- Persona switching with role-appropriate modes and persisted state (localStorage)

## Project structure (high level)

Root
```
my-health-plan/
├─ client/                 # React SPA
├─ package.json            # root scripts that proxy to client
└─ README.md
```

Client (key folders)
```
client/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ common/           # reusable UI: AuthorizationsTable, CMTasksTable, GroupQueuesChart, ModeSwitcher, etc.
│  │  ├─ guards/           # ProtectedRoute, PublicRoute
│  │  ├─ member/
│  │  │  ├─ authorization/
│  │  │  │  ├─ AuthorizationClinicalReview.js
│  │  │  │  ├─ AuthorizationWorkflowTabs.js
│  │  │  │  ├─ AuthorizationRequestSubmitted.js
│  │  │  │  ├─ AuthorizationClosed.js
│  │  │  │  └─ clinical-review-steps/ClinicalReviewStep{1..4}.js
│  ├─ constants/           # app constants + full static data (staticData.js, cmData.js, staticUserData.js)
│  ├─ hooks/               # useAuth, useUserMode, useMemberActions
│  ├─ services/            # staticAuthService, staticDataService
│  ├─ utils/, types/, assets/
│  ├─ App.js, index.js, index.css
├─ tailwind.config.js, postcss.config.js
└─ package.json
```

Notes
- Routing uses HashRouter specifically to support static hosting like GitHub Pages.
- User mode/scenario state is persisted in localStorage (see `useUserMode`).

## Scripts

Run from repository root
```bash
npm start                    # start the client (same as npm run client:dev)
npm run dev                  # alias for start
npm run install:all          # install root + client deps
npm run client:dev           # start from root
npm run client:build         # production build (client/build)
npm run client:build:watch   # build in watch mode
npm run build                # alias for client:build
npm run test                 # run CRA test runner
npm run lint                 # run ESLint (CLI). If the ESLint CLI isn’t installed locally, use CRA’s linting via tests/build
npm run clean                # remove build and node_modules
```

Client-only (optional)
```bash
cd client
npm start
npm run build
npm test
npm run test:watch
npm run test:coverage
npm run lint
npm run lint:fix
# A "format" script exists, but Prettier must be installed locally to use it
```

## Environment
- Dev server: http://localhost:3000
- No environment variables are required
- All data/auth is client-side and stored in localStorage for demo purposes

## Data model and behaviors
- Static data in `staticData.js` includes dashboard stats, authorizations, and member stubs.
- `staticDataService` exposes accessors with simulated latency and pagination.
- Scenario: “sepsis” changes selected dashboard counts and certain authorization rows for UM users.
- `useUserMode` coordinates active mode, scenario toggling, and persona switching, and reads `?sepsis=true|false` from the hash URL.

## Security (demo only)
- This is a demo-only, client-side auth flow. Tokens are base64-encoded “demo tokens.”
- Passwords are stored as plaintext in static data. Do not use this pattern in production.
- Role-based views are enforced in the UI only.

## Testing
- CRA test runner and React Testing Library are available via dependencies.
- No custom tests are included in this repository at the moment.

## Deployment

GitHub Pages (preconfigured)
- Workflow: `.github/workflows/deploy-client.yml`
- On push to main/master, builds `client` and publishes `client/build` using `peaceiris/actions-gh-pages`.
- Custom domain is set in the workflow (`cname: myhealthplan.qualminds.com`) and a `CNAME` file exists in the build.

Other static hosts
- The app is a static SPA; any static host (Netlify, Vercel, S3/CloudFront) will work by serving `client/build`.

## AWS deployment (EC2 or ECS)

This app is a static React SPA. For AWS you can either:
- EC2 + Nginx: Copy the production `client/build` folder to the instance and serve it with Nginx.
- ECS Fargate: Containerize the built app and run it behind an Application Load Balancer.

### Option A: EC2 + Nginx (static hosting)

Prerequisites
- An EC2 VM (Amazon Linux 2 or Ubuntu), security group open on ports 80/443.
- SSH access with a key pair or SSM Session Manager.

Steps
1) Build the app
   - From repo root: `npm run install:all` then `npm run client:build` (artifacts in `client/build`).
2) Install Nginx on EC2
   - Amazon Linux 2: `sudo amazon-linux-extras install nginx1` then `sudo systemctl enable --now nginx`.
   - Ubuntu: `sudo apt update && sudo apt install -y nginx` then `sudo systemctl enable --now nginx`.
3) Copy build artifacts to the server
   - Copy the contents of `client/build/` to `/var/www/myhealthplan` (create the folder if needed).
4) Configure Nginx (SPA fallback)
   - Example server block:
   ```nginx
   server {
     listen 80;
     server_name _;

     root /var/www/myhealthplan;
     index index.html;

     location / {
       try_files $uri /index.html;
     }
   }
   ```
   - Place under `/etc/nginx/conf.d/myhealthplan.conf` (or update `/etc/nginx/sites-available/default` on Ubuntu).
5) Apply config and test
   - `sudo nginx -t` then `sudo systemctl reload nginx`.
6) Optional: HTTPS with Let’s Encrypt
   - Install Certbot for Nginx, request a cert for your domain, and reload Nginx.

CI/CD via GitHub Actions (optional)
- Add the following workflow to build and upload the static bundle to your EC2 host, then reload Nginx.
- Required GitHub secrets: `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` (private key), optional `EC2_DEPLOY_PATH`.

```yaml
name: Deploy to EC2
on:
  push:
    branches: [ main ]
    paths:
      - 'client/**'
      - '.github/workflows/deploy-ec2.yml'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: client/package-lock.json
      - name: Build
        run: |
          cd client
          npm ci
          npm run build
      - name: Upload build to EC2
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          source: "client/build/*"
          target: ${{ secrets.EC2_DEPLOY_PATH || '/var/www/myhealthplan' }}
      - name: Reload Nginx
        uses: appleboy/ssh-action@v1.1.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            sudo nginx -t && sudo systemctl reload nginx
```

### Option B: ECS Fargate (containerized static hosting)

Prerequisites
- ECR repository (e.g., `myhealthplan-web`).
- ECS cluster + Fargate service behind an ALB.
- Task definition with container port 80 and a health check path `/`.

1) Add a Dockerfile (two-stage build + Nginx serve)

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY client/package*.json client/
RUN cd client && npm ci
COPY client client
RUN cd client && npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/client/build /usr/share/nginx/html
# SPA fallback: route all non-file paths to index.html
RUN sed -i 's|try_files $uri $uri/ =404;|try_files $uri /index.html;|' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2) Build and push the image to ECR
- Authenticate to ECR, build, tag, and push `:latest` or `:${GITHUB_SHA}`.

3) Create/Update ECS task definition & service
- Set container name (e.g., `web`), port 80, and health check path `/` on the ALB target group.
- Update the service to use the new task definition revision.

CI/CD via GitHub Actions (optional)
- Requires: `AWS_REGION`, ECR repo name, cluster, service, task definition, container name.
- Use OIDC or store `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` secrets.

```yaml
name: Deploy to ECS
on:
  push:
    branches: [ main ]
    paths:
      - 'client/**'
      - '.github/workflows/deploy-ecs.yml'
      - 'Dockerfile'
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: ${{ secrets.AWS_REGION }}
          # If using a role: role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build, tag, and push image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      - name: Render task definition
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: ${{ secrets.ECS_TASK_DEFINITION }}
          container-name: ${{ secrets.CONTAINER_NAME }}
          image: ${{ steps.login-ecr.outputs.registry }}/${{ secrets.ECR_REPOSITORY }}:${{ github.sha }}
      - name: Deploy Amazon ECS task definition
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: ${{ secrets.ECS_SERVICE }}
          cluster: ${{ secrets.ECS_CLUSTER }}
          wait-for-service-stability: true
```

Tip
- Because this is a static SPA with HashRouter, S3 + CloudFront is often the simplest AWS path. If you prefer that, serve the `client/build` folder and configure a 404/SPA redirect to `index.html`.

## Troubleshooting
- Dev server doesn’t start: ensure Node 18+, run `npm run clean`; then `npm run install:all`.
- Styles: check `tailwind.config.js` and `postcss.config.js`; ensure CSS Modules are imported as `import styles from './X.module.css'`.
- Auth issues: clear localStorage; login as admin or Maria; use persona switcher for Elise/Karen; password is `password123`.
- Deep linking: ensure you’re using HashRouter-style URLs (all route and query params after `#`).

---
Created: December 2024 • Updated: August 12, 2025
