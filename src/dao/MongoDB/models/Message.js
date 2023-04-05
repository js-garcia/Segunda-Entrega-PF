import { ManagerMongoDB } from "../db/mongoDBManager.js";
import {Schema} from "mongoose";

const url = process.env.URLMONGODB

const messageSchema = new Schema({
    nombre: String,
    email: {
        type: String,
        unique: true
    },
    message: String


})

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", messageSchema )
    }
    
}