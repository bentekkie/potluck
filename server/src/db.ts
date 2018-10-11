import { createConnection, Connection, Schema, model } from "mongoose";
import {isEmail} from "validator"
class DB {
    db : Connection
    constructor(url:string){
        this.db = createConnection(url)
        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    public model = this.db.model

}

const connection = new DB('mongodb://127.0.0.1/my_database')

const Ingredient = new Schema({
    name: String,
    dairy: Boolean,
    seafood: Boolean,
    meat: Boolean,
    vegetable:Boolean,
    gluten:Boolean
})

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate: [isEmail, "invalid Email"]
    }
})

const Dish = new Schema({
    name: String,
    ingredients: [Ingredient],
    chef: UserSchema
})

const MealSchema = new Schema({
    name: String,
    host: UserSchema,
    dishes:[Dish]
})

export const Meal = connection.model('Meal',MealSchema)