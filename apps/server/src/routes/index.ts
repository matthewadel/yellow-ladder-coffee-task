import { Router } from "express";
import DrinksRouter from './drinks.route';
import OrdersRouter from './orders.route';

const router = Router();
router.use("/drinks", DrinksRouter);
router.use("/orders", OrdersRouter);
export default router;