import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import {Schema} from "mongoose";

const url = ""

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

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema )
    }
    
}