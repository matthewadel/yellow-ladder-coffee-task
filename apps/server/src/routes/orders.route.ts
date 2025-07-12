import { Router } from "express";
import { OrdersController } from "../controllers";
import { validateRequestSchema } from "../middlewares";
import { ordersSchema } from "../schemas";

const router = Router();
const ordersController = new OrdersController();

router
  .route("/")
  .get(
    ordersController.getAllOrders
  )
  .post(validateRequestSchema(ordersSchema.createOrder), ordersController.createOrder);


router.route("/:id/change-status")
  .post(validateRequestSchema(ordersSchema.updateOrderStatus), ordersController.changeStatus);

export default router;
