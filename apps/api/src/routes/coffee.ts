import { Router } from 'express';

export const coffeeRouter = Router();

interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

// Mock data
const coffees: Coffee[] = [
  {
    id: '1',
    name: 'Yellow Ladder Blend',
    description: 'Our signature blend with notes of chocolate and caramel',
    price: 12.99,
    category: 'Signature',
    available: true,
  },
  {
    id: '2',
    name: 'Ethiopian Single Origin',
    description: 'Bright and fruity with floral notes',
    price: 15.99,
    category: 'Single Origin',
    available: true,
  },
  {
    id: '3',
    name: 'Colombian Supreme',
    description: 'Rich and full-bodied with nutty undertones',
    price: 14.99,
    category: 'Single Origin',
    available: true,
  },
  {
    id: '4',
    name: 'Dark Roast Espresso',
    description: 'Bold and intense, perfect for espresso lovers',
    price: 13.99,
    category: 'Espresso',
    available: true,
  },
];

// Get all coffees
coffeeRouter.get('/', (req, res) => {
  const { category, available } = req.query;

  let filteredCoffees = coffees;

  if (category) {
    filteredCoffees = filteredCoffees.filter(
      coffee =>
        coffee.category.toLowerCase() === (category as string).toLowerCase()
    );
  }

  if (available !== undefined) {
    filteredCoffees = filteredCoffees.filter(
      coffee => coffee.available === (available === 'true')
    );
  }

  res.json({
    success: true,
    count: filteredCoffees.length,
    data: filteredCoffees,
  });
});

// Get coffee by ID
coffeeRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const coffee = coffees.find(c => c.id === id);

  if (!coffee) {
    return res.status(404).json({
      success: false,
      error: 'Coffee not found',
    });
  }

  return res.json({
    success: true,
    data: coffee,
  });
});

// Get coffee categories
coffeeRouter.get('/meta/categories', (_req, res) => {
  const categories = [...new Set(coffees.map(coffee => coffee.category))];

  res.json({
    success: true,
    data: categories,
  });
});
