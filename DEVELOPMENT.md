# Development Guide - Yellow Ladder Coffee

## Overview

This is a comprehensive development guide for the Yellow Ladder Coffee monorepo, which contains three applications:

- **Web App**: Next.js with TypeScript and Tailwind CSS
- **Mobile App**: React Native with TypeScript
- **Backend API**: Express.js with TypeScript

## Prerequisites

### Required Software

- **Node.js 18+** and **npm 9+**
- **Git**
- **VS Code** (recommended)

### For Mobile Development

- **React Native CLI**: `npm install -g react-native-cli`
- **iOS Development**: Xcode (macOS only)
- **Android Development**: Android Studio
- **CocoaPods** (for iOS): `sudo gem install cocoapods`

## Initial Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd yellow-ladder-coffee
chmod +x setup.sh
./setup.sh
```

### 2. Manual Installation

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm install --workspaces
```

## Development Commands

### Root Level Commands

```bash
# Start web + API together
npm run dev

# Start individual apps
npm run dev:web    # Next.js web app
npm run dev:api    # Express.js API
npm run dev:mobile # React Native metro server

# Build all applications
npm run build

# Run tests across all workspaces
npm run test

# Run linting across all workspaces
npm run lint

# Clean all node_modules
npm run clean
```

### Web App Commands

```bash
# Navigate to web app
cd apps/web

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check
```

### API Commands

```bash
# Navigate to API
cd apps/api

# Development server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm run start

# Run tests
npm run test

# Lint code
npm run lint
```

### Mobile App Commands

```bash
# Navigate to mobile app
cd apps/mobile

# Start Metro server
npm start

# Run on iOS (requires Xcode)
npm run ios

# Run on Android (requires Android Studio)
npm run android

# Build for production
npm run build      # Android
npm run build:ios  # iOS
```

## Project Structure

```
yellow-ladder-coffee/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── app/            # App router pages
│   │   ├── public/         # Static assets
│   │   └── package.json    # Web dependencies
│   ├── mobile/             # React Native mobile app
│   │   ├── src/           # Source code
│   │   ├── android/       # Android specific files
│   │   ├── ios/           # iOS specific files
│   │   └── package.json   # Mobile dependencies
│   └── api/               # Express.js backend
│       ├── src/           # TypeScript source
│       ├── dist/          # Compiled JavaScript
│       └── package.json   # API dependencies
├── packages/              # Shared packages (optional)
├── .github/               # GitHub Actions workflows
├── docker-compose.yml     # Docker setup
├── setup.sh              # Setup script
└── package.json          # Root package.json
```

## Environment Variables

### API (.env)

```
PORT=3001
NODE_ENV=development
# Add your database URL, JWT secret, etc.
```

### Web App (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API Endpoints

### Coffee Endpoints

- `GET /api/coffee` - Get all coffees
- `GET /api/coffee/:id` - Get coffee by ID
- `GET /api/coffee/meta/categories` - Get categories

### Order Endpoints

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Health Check

- `GET /health` - API health check

## Mobile App Navigation

The mobile app uses React Navigation with the following screens:

- **HomeScreen**: Welcome screen with features
- **MenuScreen**: Coffee menu with categories
- **OrderScreen**: Order placement form

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific app
npm run test --workspace=apps/api
```

### Test Structure

- **API Tests**: Located in `apps/api/src/__tests__/`
- **Web Tests**: Will be in `apps/web/__tests__/`
- **Mobile Tests**: Will be in `apps/mobile/__tests__/`

## Docker Support

### Development with Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

### Services

- **API**: http://localhost:3001
- **Web**: http://localhost:3000
- **Database**: PostgreSQL on port 5432

## Common Issues & Solutions

### 1. Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### 2. React Native Metro Issues

```bash
# Reset Metro cache
npx react-native start --reset-cache

# Clean and rebuild
cd apps/mobile
npx react-native clean
```

### 3. iOS Pod Issues

```bash
cd apps/mobile/ios
pod install
```

### 4. Android Build Issues

```bash
cd apps/mobile/android
./gradlew clean
```

## VS Code Extensions

Recommended extensions for development:

- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- React Native Tools
- Tailwind CSS IntelliSense

## Git Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `hotfix/*`: Critical fixes

### Commit Messages

Use conventional commits:

```
feat: add new coffee endpoint
fix: resolve mobile navigation issue
docs: update development guide
```

## CI/CD Pipeline

The project includes GitHub Actions for:

- Code linting
- Running tests
- Building applications
- Deployment (to be configured)

## Production Deployment

### Web App (Vercel/Netlify)

```bash
cd apps/web
npm run build
```

### API (Heroku/AWS/DigitalOcean)

```bash
cd apps/api
npm run build
```

### Mobile App

- **iOS**: Use Xcode for App Store submission
- **Android**: Use Android Studio for Play Store submission

## Performance Optimization

### Web App

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Caching strategies

### Mobile App

- Use FlatList for large lists
- Optimize images and assets
- Enable Hermes for better performance

### API

- Implement caching (Redis)
- Database query optimization
- Rate limiting

## Monitoring & Logging

### Development

- Console logs for debugging
- React DevTools for web
- Flipper for React Native

### Production

- Error tracking (Sentry)
- Performance monitoring
- API logging (Winston)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

For issues and questions:

- Check the troubleshooting section
- Review existing GitHub issues
- Create a new issue with detailed description

---

Happy coding! ☕️
