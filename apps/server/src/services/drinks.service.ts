import { Drink } from "@yellow-ladder-coffee/shared-types";

export class DrinksService {
    async getAllDrinks(): Promise<{ data: Drink[] }> {
        return { data: [] }
    }
}