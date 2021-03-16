const router = require('express').Router()
const User = require('../models/account.model')
const Todo = require('../models/todo.model')

router.get("/",async(req,res)=>{
    let tempUser = await res.locals.currentUser._id
    console.log("temp user is ", tempUser)
    res.redirect(`/user/${tempUser}`)
})

//where the user can see his/her todolist
router.get("/user/:id",async(req,res)=>{
    try{
        console.log(req.params.id)
        let user = await User.findById(req.params.id).populate("todo")
        console.log("user is",user)
        res.render("todo/main",{user})
    }catch(e){

    }
})

//user creates his/her todolist
router.get("/user/:id/create", (req,res)=>{
    res.render("todo/create2")
})


router.put("/user/:id/create",async (req,res)=>{
    try{
        let {title,description} = req.body
        // console.log(req.body)
        let tempToDo = {
            title,
            description,
            isCompleted:false
        }
        let todo = new Todo(tempToDo)
        await todo.save()

        let user = await User.findById(req.params.id)
        user.todo.push(todo)

        await user.save()
        res.redirect(`/user/${req.params.id}`)
    }catch(e){
        console.log(e)
    }
})

router.get("/done", (req,res) => {
    res.render("todo/done")
})

router.delete("/user/:id/delete", async(req,res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id, req.body)
        res.redirect(`/user/${req.params.id}`)
    } catch (err) {
        res.status(403).send({message: 'Forbidden' })
    }
})




module.exports = router