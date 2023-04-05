import { Router } from "express";
import routerCart from "./cart.routes.js";
import routerProduct from "./product.routes.js";
import routerSession from "./session.routes.js";
import routerUser from "./user.routes.js";

const router = Router()

router.use('/product', routerProduct)
router.use('/user', routerUser)
router.use('/api/cart', routerCart)
router.use('/api/session', routerSession)

export default router