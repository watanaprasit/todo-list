module.exports = function(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        // next()
        res.redirect("/auth/signin")
    }
}