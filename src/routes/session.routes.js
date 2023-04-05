import { Router } from "express";
import { createUser} from "../controllers/user.controller.js"

const routerUser = Router()

routerUser.post("/", createUser)

routerUser.get("/", async () =>{
    const {nombre, apellido, email} = req.body
    try{
        const users = ""
        return users
    }catch(error){
        res.send(error)

    }
       
})

export default routerUser