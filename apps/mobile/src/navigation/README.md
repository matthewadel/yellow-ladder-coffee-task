# Navigation Architecture

This document outlines the navigation structure for the Yellow Ladder Coffee Task mobile application.

## Structure Overview

```
src/
├── navigation/
│   ├── index.ts                    # Main navigation exports
│   ├── RootNavigator.tsx           # Main stack navigator configuration
│   └── navigationHelpers.ts       # Navigation utility functions
├── types/
│   └── navigation.ts               # TypeScript types for navigation
└── screens/
    ├── CreateOrder.tsx             # Main coffee ordering screen
    └── OrderSummary.tsx            # Order summary modal screen
```

## Files Description

### `/navigation/RootNavigator.tsx`
- Contains the main stack navigator setup
- Configures screen options and presentations

### `/navigation/navigationHelpers.ts`
- Utility functions for common navigation operations
- Type-safe navigation methods
- Centralized navigation logic

### `/navigation/index.ts`
- Barrel export file for clean imports
- Exports all navigation-related utilities

### `/types/navigation.ts`
- TypeScript definitions for navigation parameters
- Global navigation type declarations
- Interface definitions for navigation props

## Usage Examples

### Basic Navigation
```typescript
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../navigation';

const navigation = useNavigation();
navigation.navigate(SCREENS.ORDER_SUMMARY, { /* params */ });
```

### Using Navigation Helpers
```typescript
import { navigationHelpers } from '../navigation';

// Navigate to order summary
navigationHelpers.navigateToOrderSummary(navigation, {
  orderItems,
  onEditItem,
  onRemoveItem,
  onSubmitOrder,
});

// Go back
navigationHelpers.goBack(navigation);
```

## Benefits of This Structure

1. **Separation of Concerns**: Navigation logic is separate from app initialization
2. **Type Safety**: Full TypeScript support for navigation parameters
3. **Maintainability**: Centralized navigation configuration
4. **Reusability**: Helper functions reduce code duplication
5. **Clean Architecture**: Clear folder structure and responsibilities

## Screen Flow

```
CreateOrder Screen
      ↓
   [Order Summary Button]
      ↓
OrderSummary Screen (Modal)
      ↓
   [Back Button / Gesture]
      ↓
CreateOrder Screen
```
