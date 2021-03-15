const router = require('express').Router()
const passport = require('../lib/passportConfig')
const User = require('../models/account.model')

router.get("/signup",(req,res)=>{
    res.render("auth/signup")
})

router.post("/signup",async(req,res)=>{
    try{
        let {email,password}= req.body
        let tempObj = {
            email,password,
            todo:[]
        }
        let user = new User(tempObj)
        await user.save()
        res.redirect("/auth/signup")
    }catch (e) {
        console.log(e)
    }
})

router.get("/signin",(req,res)=>{
    res.render("auth/signin")
})

router.post("/signin",
    passport.authenticate('local',
        {
            successRedirect:`/`, //need to change this
            failureRedirect:'auth/signin',
            failureFlash:true
        }))


router.get("/logout",(req, res) => {
    req.logOut()
    res.redirect("auth/signin")
})

module.exports = router