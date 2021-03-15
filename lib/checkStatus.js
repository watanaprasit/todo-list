module.exports = function(req, res, next){
    if(req.isAuthenticated()){
        // console.log(req.user)
        // res.redirect(`/user/${req.user._id}`)
        next()
    }else{
        // next()
        res.redirect("/auth/signin")
    }
}