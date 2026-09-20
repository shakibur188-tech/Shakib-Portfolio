# Architecture.md

## App Flow & Architecture
- **Frontend**: React (Vite) with React Router for client-side routing; components render dynamic UI based on CMS data.
- **Backend**: Node.js + Express API (or Laravel) handling data requests, authentication, and business logic.
- **Database**: MongoDB (Atlas) for flexible document storage; optional MySQL for relational data.
- **CMS**: Headless WordPress REST API or static JSON files for content hydration.
- **Build & Deploy**: Vite/Parcel bundling for frontend; Node/Express or Laravel server for backend; Docker optional for containerization.

## Folder & File Structure
- `/public`: static assets (images, favicon, manifest).
- `/src`:
  - `/components`: reusable UI components (Button, Card, ServiceCard).
  - `/pages`: route-specific pages (Home, Services, Projects, Contact).
  - `/routes`: React Router configuration.
  - `/services`: API service layer (fetchContent, fetchProjects).
  - `/store`: Redux or Context state management.
  - `/utils`: helper functions, constants.
- `/data`: static JSON or CMS data files.
- `/api`: backend route definitions (if separate).
- `/config`: environment variables (VITE_API_URL, etc.).
- `/dist` or `/build`: production output.

## Tech Stack
- **Frontend**: React 18+, Vite, Tailwind CSS, TypeScript (optional).
- **Backend**: Node.js 18+, Express; optionally Laravel for API layer.
- **Database**: MongoDB (Atlas) or MySQL.
- **CMS**: Headless WordPress or custom JSON.
- **Deployment**: Vercel/Netlify (frontend), Render/Heroku/Docker (backend).