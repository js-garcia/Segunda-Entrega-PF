import { ManagerMongoDB } from "../db/mongoDBManager.js";
import {Schema} from "mongoose";
import { paginate } from "mongoose-paginate-v2";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    nombre: String,
    marca: String,
    precio: Number,
    stock: Number,
    email: {
        type: String,
        unique: true
    },
    message: String


})

productSchema.plugin(paginate)

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema )
    }
    
    
}