import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { DrinksService } from "../services";
import { sendSuccessResponse } from "../utils";
import { Drink } from "@yellow-ladder-coffee/types";

export class DrinksController {
    private readonly drinksService: DrinksService = new DrinksService();

    getAllDrinks = asyncWrapper(async (req: Request, res: Response) => {
        const response = await this.drinksService.getAllDrinks();
        sendSuccessResponse<Drink>({
            res,
            ...response
        });
    });

}