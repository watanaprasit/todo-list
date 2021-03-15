const router = require('express').Router()

router.get("/",(req,res)=>{
    res.send("default route!!")
})


module.exports = router