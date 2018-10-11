import { RequestHandler, RequestParamHandler, Request } from "express-serve-static-core";
import { Meal } from "../db";
import { Document } from "mongoose";

type MealRequest = Request & {meal: Document,}

export const getMeal : RequestHandler = (req : MealRequest,res,next) => {
    res.json(req.meal)
}

export const newMeal : RequestHandler = (req,res,next) => {
    let meal = new Meal(req.body)

    meal.save(function (err) {
        if (err) {
          next(err);
        } else {
          res.json(meal);
        }
      });
}

export const getMealById : RequestParamHandler = (req : MealRequest,res, next, id, name) => {
    Meal.findOne({_id: id}, function (err, meal) {
        if (err) {
            next(err);
        } else {
            req.meal = meal;
            next();
        }
    });
}

export const updateMeal : RequestHandler = (req : MealRequest,res,next) => {
    Meal.findByIdAndUpdate(req.meal._id,req.body, {new: true}, function (err, meal) {
        if (err) {
          next(err);
        } else {
          res.json(meal);
        }
      })
}

export const deleteMeal : RequestHandler = (req : MealRequest,res,next) => {
    Meal.findByIdAndDelete(req.meal._id,req.body, function (err) {
        if (err) {
          next(err);
        } else {
          res.json(req.meal);
        }
      })
}