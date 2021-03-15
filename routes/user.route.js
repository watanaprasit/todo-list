const router = require('express').Router()
const User = require('../models/account.model')

router.get("/",async(req,res)=>{
    let tempUser = await res.locals.currentUser._id
    console.log("temp user is ", tempUser)
    res.redirect(`/user/${tempUser}`)
})

//where the user can see his/her todolist
router.get("/user/:id",async(req,res)=>{
    try{
        console.log(req.params.id)
        let user = await User.findById(req.params.id)
        console.log("user is",user)
        res.render("todo/main",user)
    }catch(e){

    }
})

//user creates his/her todolist
router.get("/user/:id/create",async (req,res)=>{
    res.render("todo/create")
})


router.put("/user/:id/create",async (req,res)=>{
    try{
        let {title,description,isCompleted } = req.body
        let tempToDo = {
            title,
            description,
            isCompleted
        }
        let user = await User.findByIdAndUpdate(req.params.id,{$push:{todo:tempToDo}})
        res.redirect(`/user/${req.params.id}`)
    }catch(e){
        console.log(e)
    }
})


module.exports = router