const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("db connected")
    })
    .catch((error) => {
        console.log(error)
    })

