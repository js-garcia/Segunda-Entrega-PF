import "dotenv/config"
import express  from "express";
import * as path from 'path';
import {_dirname} from "./path.js";
import  { Server } from "socket.io";
import { engine } from "express-handlebars";
import { getManagerMessages} from "./dao/daoManager.js";
import router from "./routes/index.routes.js";
import MongoStore from 'connect-mongo'
import session from "express-session";
import multer from "multer";

//Express Server
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology:true },
        ttl: 90

    }),

}))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))

//Port
app.set("port", process.env.PORT || 8080 )

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'src/public/img')
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage})


//Routes
app.use("/", router)

const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))

//Socket.io
const io = new Server(server)

const data = await getManagerMessages();
const managerMessage = new data();

io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");
    socket.on("message", async (info) => {
        console.log(`Mensaje recibido: ${mensaje}`);
        await managerMessage.addElement([info])
        const messages = await managerMessage.getElements()
        console.log(messages);
        socket.emit("allMessages", messages)

            })
            socket.on("load messages", async () => {
                const messages = await managerMessages.getElements()
                console.log(messages)
                socket.emit("allMessages", messages)
            })

        })
    

