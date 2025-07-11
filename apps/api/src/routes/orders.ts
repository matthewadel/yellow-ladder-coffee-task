import { Router } from 'express';

export const orderRouter = Router();

interface OrderItem {
  coffeeId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Mock data
const orders: Order[] = [];

// Get all orders
orderRouter.get('/', (req, res) => {
  const { status, customerEmail } = req.query;

  let filteredOrders = orders;

  if (status) {
    filteredOrders = filteredOrders.filter(order => order.status === status);
  }

  if (customerEmail) {
    filteredOrders = filteredOrders.filter(
      order =>
        order.customerEmail.toLowerCase() ===
        (customerEmail as string).toLowerCase()
    );
  }

  res.json({
    success: true,
    count: filteredOrders.length,
    data: filteredOrders,
  });
});

// Get order by ID
orderRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  res.json({
    success: true,
    data: order,
  });
});

// Create new order
orderRouter.post('/', (req, res) => {
  const { customerName, customerEmail, items } = req.body;

  if (!customerName || !customerEmail || !items || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: customerName, customerEmail, items',
    });
  }

  const total = items.reduce(
    (sum: number, item: OrderItem) => sum + item.price * item.quantity,
    0
  );

  const newOrder: Order = {
    id: Date.now().toString(),
    customerName,
    customerEmail,
    items,
    total,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    data: newOrder,
  });
});

// Update order status
orderRouter.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({
      success: false,
      error:
        'Invalid status. Must be one of: pending, processing, completed, cancelled',
    });
  }

  order.status = status;
  order.updatedAt = new Date();

  res.json({
    success: true,
    data: order,
  });
});
