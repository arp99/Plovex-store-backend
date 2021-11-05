const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const routeNotFoundHandler = require('./middlewares/routeNotFound_handler')
const errorHandler = require('./middlewares/errorHandler')
const connectToDb = require("./db/db.connect")
require('dotenv').config()
const products = require("./routes/products.router")
const user = require("./routes/user.router")
const cart = require("./routes/cart.router")
const wishlist = require("./routes/wishlist.router")
const login = require("./routes/login.router")
const category = require("./routes/category.router")
const home = require("./routes/homePage.router")


app.use(cors())
app.use(bodyParser.json())


//initialize connection to Db
connectToDb()

// Home route 
app.get("/" , ( req , res) => {
    res.send("Hello from the other side of the app")
})

//Use the routes here
app.use( "/products", products )
app.use( "/user", user )
app.use( "/cart", cart )
app.use( "/wishlist", wishlist )
app.use( "/login", login )
app.use( "/category", category )
app.use( "/home-page", home )

// error handler middlewares
app.use(routeNotFoundHandler)
app.use(errorHandler)

const PORT = 3000

app.listen(process.env.PORT || PORT , () => {
    console.log(`Server connected Successfully on PORT: ${ PORT }`)
})