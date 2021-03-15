require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('---mongodb connected---')
}).catch(e => {
    console.log('error connecting')
})

module.exports = mongoose