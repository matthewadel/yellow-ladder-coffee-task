import { Router } from "express";
import { DrinksController } from "../controllers";

const router = Router();
const drinksController = new DrinksController();

router
    .route("/")
    .get(
        drinksController.getAllDrinks
    );