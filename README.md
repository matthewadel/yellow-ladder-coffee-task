# Yellow Ladder Coffee - Monorepo

A monorepo containing three applications:

- **Web App**: Next.js with TypeScript, Tailwind CSS
- **Mobile App**: React Native (bare setup)
- **Backend API**: Express.js with TypeScript

## Project Structure

```
yellow-ladder-coffee/
├── apps/
│   ├── web/          # Next.js web application
│   ├── mobile/       # React Native mobile app
│   └── api/          # Express.js backend API
├── packages/         # Shared packages (if needed)
└── package.json      # Root package.json with workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- React Native development environment (for mobile app)
- iOS Simulator / Android Emulator (for mobile app testing)

### Installation

1. Clone the repository
2. Install dependencies for all workspaces:
   ```bash
   npm install
   ```

### Development

#### Start all apps (web + api):

```bash
npm run dev
```

#### Start individual apps:

```bash
# Web app (Next.js)
npm run dev:web

# Backend API (Express.js)
npm run dev:api

# Mobile app (React Native)
npm run dev:mobile
```

### Building

#### Build all apps:

```bash
npm run build
```

#### Build individual apps:

```bash
npm run build:web
npm run build:api
npm run build:mobile
```

### Testing

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Apps

### Web App (`apps/web`)

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- ESLint + Prettier

### Mobile App (`apps/mobile`)

- React Native (bare setup)
- TypeScript
- React Navigation
- ESLint + Prettier

### Backend API (`apps/api`)

- Express.js with TypeScript
- CORS enabled
- Morgan for logging
- Nodemon for development
- ESLint + Prettier

## Development Workflow

1. Each app can be developed independently
2. Shared code can be placed in `packages/` directory
3. All apps share the same linting and formatting configuration
4. Use workspaces to manage dependencies efficiently
