import { Router } from "express";
import { OrdersController } from "../controllers";

const router = Router();
const ordersController = new OrdersController();

router
  .route("/")
  .get(
    ordersController.getAllOrders
  )
  .post(ordersController.createOrder)