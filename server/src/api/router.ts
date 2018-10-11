import { Router } from "express";
import { getMeal, getMealById, newMeal, updateMeal, deleteMeal } from "./controller";


const router = Router()

router.route('/meals')
    .post(newMeal)

router.route('/meals/:mealId')
    .get(getMeal)
    .put(updateMeal)
    .delete(deleteMeal)

router.param('mealId',getMealById)

export const ApiRouter = router