# Shared Types Package

This package contains shared TypeScript interfaces and types used across all applications in the Yellow Ladder Coffee monorepo.

## Installation

This package is automatically installed as a local dependency in all apps. No manual installation required.

## Interfaces

### `Drink`
Represents a coffee drink/beverage item.
```typescript
interface Drink {
    id: string;
    name: string;
    description: string;
    prices: Record<string, number>[]
}
```

### `OrderItem`
Represents an item in a customer's order.
```typescript
interface OrderItem {
    id: string;
    name: string;
    size: string;
    price: number;
}
```

### `OrdersState`
Represents the state of an order.
```typescript
interface OrdersState {
    id: string
    order: OrderItem[]
    orderTimestamp: string | undefined
}
```

## Usage

### In Mobile App (React Native)
```typescript
import type { Drink, OrderItem } from '@yellow-ladder-coffee/shared-types';

const drinks: Drink[] = [
    {
        id: '1',
        name: 'Espresso',
        description: 'Rich, bold shot of pure coffee',
        prices: [{ small: 2.0 }, { medium: 2.5 }]
    }
];
```

### In Server App (Express.js)
```typescript
import type { Drink, OrderItem } from '@yellow-ladder-coffee/shared-types';

export const getDrinks = (): Drink[] => {
    // Return drink data
};
```

### In Web App (Next.js)
```typescript
import type { Drink, OrderItem } from '@yellow-ladder-coffee/shared-types';

interface Props {
    drinks: Drink[];
}
```

## Building

```bash
npm run build
```

This will compile TypeScript files and generate declaration files in the `dist` directory.

## Development

```bash
npm run dev
```

This will watch for changes and recompile automatically.
