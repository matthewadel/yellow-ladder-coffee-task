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
│   └── server/       # Express.js backend API
├── packages/
│   └── shared-types/ # Shared TypeScript interfaces
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
   
   This will automatically:
   - Install all dependencies
   - Build the shared types package
   - Set up iOS dependencies for React Native

### Development

#### Start all apps (web + api + shared types watch):

```bash
npm run dev
```

This will start:
- Shared types in watch mode (rebuilds on changes)
- Web app development server
- API development server

#### Start individual apps:

```bash
# Shared types (watch mode)
npm run dev:shared-types

# Web app (Next.js)
npm run dev:web

# Backend API (Express.js)
npm run dev:server

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
npm run build:shared-types
npm run build:web
npm run build:server
npm run build:mobile
```

### Shared Types

The project includes a shared types package (`packages/shared-types`) containing TypeScript interfaces used across all applications:

- `Drink`: Coffee/beverage items
- `OrderDrink`: Items in an order
- `Order`: Customer orders
- `IOrderStatus`: Order status enum

#### Working with Shared Types

1. **Making changes**: Edit files in `packages/shared-types/src/`
2. **Building**: Run `npm run build:shared-types` 
3. **Development**: Run `npm run dev:shared-types` for watch mode
4. **Clean rebuild**: Run `npm run clean:dist && npm run build:shared-types`

### Cleaning

```bash
npm run clean          # Remove node_modules
npm run clean:dist     # Remove dist folders  
npm run clean:all      # Remove everything

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
