const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const routeNotFoundHandler = require('./middlewares/routeNotFound_handler')
const errorHandler = require('./middlewares/errorHandler')
const connectToDb = require("./db/db.connect")
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

// error handler middlewares
app.use(routeNotFoundHandler)
app.use(errorHandler)

//initialize connection to Db
connectToDb()

// Home route 
app.get("/" , ( req , res) => {
    res.send("Hello from the other side of the app")
})

//Use the routes here




const PORT = 3000

app.listen(process.env.PORT || PORT , () => {
    console.log(`Server connected Successfully on PORT: ${ PORT }`)
})