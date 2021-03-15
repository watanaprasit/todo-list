require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
var methodOverride = require('method-override')
const passport = require('./lib/passportConfig')

require('./lib/mongodb')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.set('view engine','ejs')

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({mongoUrl:process.env.DB})
}))


// app.use(passport.initialize())
// app.use(passport.session())


// app.use("/",checkStatus,require)
app.use("/auth",require('./routes/auth.route'))
app.use("/",require("./routes/user.route"))


app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))