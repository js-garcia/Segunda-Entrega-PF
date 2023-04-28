import { Router } from "express";
import passport from "passport";

const routerGithub = Router()

routerGithub.get("/github", passport.authenticate('github', {scope:['user:email']}), async (req,res) => {})//Register

routerGithub.get("/githubSession", passport.authenticate('github'), async(req,res) => {
    req.session.user = req.user
    res.redirect('/product')
})//Login

export default routerGithub