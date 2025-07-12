# Yellow Ladder Coffee ☕

A full-stack coffee ordering system built as a monorepo containing web, mobile, and backend applications. This project demonstrates offline-first mobile architecture with Redux state management, real-time order processing, and scalable deployment patterns.

## 🛠️ Tech Stack

- **Web Dashboard**: Next.js 14 (App Router), TypeScript, Tailwind CSS, React Hooks
- **Mobile App**: React Native 0.80, TypeScript, Redux Toolkit, React Navigation
- **API Server**: Express.js, TypeScript, CORS, Morgan logging, Helmet security
- **Network Management**: @react-native-community/netinfo for connectivity detection
- **State Management**: Redux Toolkit with async thunks and offline persistence
- **Shared Code**: Local packages for types and API client


### Development & Tooling
- **Monorepo**: npm workspaces with concurrent development
- **TypeScript**: Strict typing across all applications
- **Linting**: ESLint + Prettier for consistent code style
- **Testing**: Jest configuration for all packages
- **Build Tools**: Concurrently for multi-app development

## 📱 Offline-First Mobile Architecture

The mobile application implements a sophisticated offline-first strategy using Redux to ensure seamless user experience regardless of network connectivity:

### Initial App Load
- **Drinks Cache**: On first app launch, the system fetches and caches the complete drinks menu in Redux store
- **Network Detection**: Uses `@react-native-community/netinfo` to continuously monitor internet connectivity
- **Visual Indicators**: Real-time network status displayed in the header (Online/Offline/Checking)

### Offline Order Management
- **Local Storage**: When offline, orders are immediately saved to Redux store with local timestamps and IDs
- **Queue System**: Failed requests are queued locally and automatically retry when connectivity is restored
- **User Feedback**: Toast notifications inform users that orders are saved locally and will sync when online

### Connectivity Restoration
- **Auto-Sync**: The app automatically detects when internet connection is restored
- **Batch Processing**: All queued offline orders are processed sequentially when back online
- **Cleanup**: Successfully synced orders are removed from local Redux store
- **Error Handling**: Failed sync attempts are logged and user is notified



## 📁 Project Structure

```
yellow-ladder-coffee/
├── apps/
│   ├── web/                    # Next.js dashboard application
│   │   ├── app/               # Next.js 14 App Router
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   └── ui/               # UI components and utilities
│   ├── mobile/               # React Native application
│   │   ├── src/
│   │   │   ├── components/   # React Native components
│   │   │   ├── context/      # Network context provider
│   │   │   ├── hooks/        # Custom hooks (network, orders)
│   │   │   ├── navigation/   # React Navigation setup
│   │   │   ├── screens/      # App screens
│   │   │   ├── store/        # Redux store and slices
│   │   │   ├── ui/          # UI components and toast system
│   │   │   └── utils/       # Utility functions
│   │   ├── android/         # Android build configuration
│   │   └── ios/            # iOS build configuration
│   └── server/             # Express.js backend API
│       ├── src/
│       │   ├── controllers/ # API route handlers
│       │   ├── middlewares/ # Express middlewares
│       │   ├── routes/     # API route definitions
│       │   ├── services/   # Business logic
│       │   └── utils/      # Utility functions
├── packages/               # Shared packages
│   ├── api-request/       # HTTP client for API calls
│   └── types/            # Shared TypeScript interfaces
└── package.json          # Root workspace configuration
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- **React Native development environment** (for mobile app)
  - Xcode (for iOS development)
  - Android Studio (for Android development)
- **iOS Simulator** / **Android Emulator** (for mobile app testing)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yellow-ladder-coffee-task
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```
   
   This command automatically:
   - Installs dependencies for all workspaces
   - Builds the shared packages (types & api-request)
   - Sets up iOS dependencies for React Native (pod install)

3. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This starts:
   - Shared types in watch mode
   - Web dashboard at `http://localhost:3000`
   - API server at `http://localhost:5000`

4. **Start mobile app** (in a separate terminal)
   ```bash
   npm run dev:mobile    # Start Metro bundler
   npm run dev:ios       # Launch iOS simulator
   npm run dev:android   # Launch Android emulator
   ```

### Individual App Development

if you want to run each app individually,
```bash
# Web dashboard only
npm run dev:web

# API server only  
npm run dev:server

# Metro bundler for mobile apps
npm run dev:mobile

# Android App
npm run dev:android

# IOS Aoo
npm run dev:ios
```

### Building for Production

```bash
# Build all applications
npm run build

# Build individual apps
npm run build:web
npm run build:server
npm run build:mobile
npm run build:packages
```

### Shared Packages Development
Basically I've created two packages to used by all apps in our monorepo and this to guarantee consistency throughtout all our apps and these packages are
`packages/types` that has the types of shared entites of our app and `packages/api-request` that has a basic setup for all network requests


### Production Infrastructure Stack

**Frontend Deployment:**
- **Web Dashboard**: Vercel (seamless Next.js integration) or AWS S3
- **Mobile Apps**: App Store (iOS) and Google Play Store (Android)

**Backend Services:**
- **API Server**: AWS ECS Fargate containers
- **Load Balancer**: Application Load Balancer (ALB) with health checks
- **CDN**: CloudFront for static assets and API response caching

## 🔧 Development Workflow

### Workspace Management
- **Independent Development**: Each app can be developed separately
- **Shared Dependencies**: Common packages managed at workspace level
- **Hot Reloading**: All apps support real-time development updates
- **Concurrent Development**: Run multiple apps simultaneously

### Working with Shared Packages
1. **Types Package** (`packages/types`): Shared TypeScript interfaces
   - `Drink`, `Order`, `OrderDrink`, `IOrderStatus`
   - Ensures type safety across web, mobile, and server

2. **API Request Package** (`packages/api-request`): HTTP client
   - Unified API interface for web and mobile
   - Consistent error handling and request formatting

### Mobile Development Tips
- **Metro Bundler**: Automatic package resolution for local packages
- **iOS Development**: Pod install runs automatically on npm install
- **Android Development**: Gradle sync handled by React Native CLI
- **Network Testing**: Use device connectivity settings to test offline scenarios

## 🏗️ Project Anatomy

### 🌐 Web Application (`apps/web`)

The Next.js 14 web dashboard provides real-time order management with a modern, responsive interface.

**Folder Purposes:**
- **`app/`**: Core application using Next.js 14 App Router architecture
- **`app/components/`**: Dashboard-specific components like orders table, statistics cards, and navigation
- **`app/hooks/`**: Custom hooks for API data fetching and state management
- **`app/ui/`**: Reusable UI components, loading states, error handling, and design system
- **`public/`**: Static assets including images, icons, and other public resources

### 📱 Mobile Application (`apps/mobile`)

The React Native mobile app provides offline-first order creation with Redux state management.


**Folder Purposes:**
- **`src/components/`**: Feature-organized React Native components with numbered folders for user flow
- **`src/context/`**: Global state providers, primarily for network connectivity management
- **`src/hooks/`**: Custom hooks for network monitoring, order creation, and offline functionality
- **`src/navigation/`**: React Navigation setup with stack navigator and screen routing
- **`src/screens/`**: Full-screen components representing main app pages/views
- **`src/store/`**: Redux Toolkit store with slices for drinks menu and offline orders queue
- **`src/ui/`**: UI utilities including toast notification system and design components
- **`src/utils/`**: Helper functions for API configuration and utility operations
- **`src/assets/`**: Local images, icons, and static resources
- **`android/`**: Native Android build configuration, Gradle files, and app settings
- **`ios/`**: Native iOS build configuration, Xcode projects, and CocoaPods setup

### 🔧 Server Application (`apps/server`)

The Express.js backend API provides RESTful endpoints with comprehensive error handling and security middleware.

**Folder Purposes:**
- **`src/controllers/`**: HTTP request handlers that process incoming requests and send responses
- **`src/middlewares/`**: Express middleware for error handling, request validation, and security
- **`src/routes/`**: API endpoint definitions and routing logic for different resource types
- **`src/schemas/`**: Data validation schemas for request/response structure validation
- **`src/services/`**: Business logic layer containing core application functionality
- **`src/utils/`**: Utility functions, custom error classes, and helper modules

### 📦 Shared Packages

**Package Purposes:**
- **`packages/types/`**: Centralized TypeScript interfaces ensuring type consistency across all applications
- **`packages/api-request/`**: Unified HTTP client library providing consistent API communication for web and mobile apps

**Benefits of This Structure:**
- **Feature-Based Organization**: Components and logic grouped by functionality rather than file type
- **Clear Separation of Concerns**: Each folder has a specific responsibility and purpose
- **Scalability**: Easy to add new features without restructuring existing code
- **Maintainability**: Developers can quickly locate and modify specific functionality
- **Consistency**: Shared packages ensure uniform patterns across all applications




**important note:** i wanted to create database using postgreeSQL and manipulate the data inside the tables using typeorm or prisma but i realized that the app is so simple to create adatabase setup for it, it's only three apis not more