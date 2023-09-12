const express = require('express')
const app = express()
const {PORT,MONGO_URL}= require('./config/config')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const handlebars = require('handlebars')
const handlebarsExpress = require('express-handlebars')
const ManagerDb = require('./daos/mongodb/classes/ManagerDb')
const passport = require('passport')
const initializePassport = require("./config/passport")
const dataBaseConect = new ManagerDb(MONGO_URL)
const cors = require('cors')
const paginateRoute = require('./routes/paginate.routes')
const productsRouter = require("./routes/products.routes")
const cartRoutes = require('./routes/carts.routes')
const perfilRoutes = require("./routes/perfil.routes")
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const compression = require('express-compression');
const addLogger = require('./config/config_base')

const chatRouter = require("./routes/message.routes")(io)

//routes
const authRoutes = require('./routes/auth.routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//public
app.use(express.static(__dirname+"/public"))
app.use(session({
    store:MongoStore.create({
        mongoUrl:MONGO_URL
    }), 
    secret: 'coderHouse',
    resave : false,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


//handlebars
handlebars.registerHelper('isEqual', function (value1,value2,options){
    if(value1 == value2){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
})
//view
app.engine('handlebars', handlebarsExpress.engine({
    runtimeOptions:{
        allowProtoPropertiesByDefault : true 
    }
}));
app.set('view engine', "handlebars")
app.set("views",__dirname+"/views")


app.use(compression({
    brotli:{enabled:true,zlib:{} }
}))
app.use(addLogger)

app.use('/auth', authRoutes)
app.use("/perfil",perfilRoutes)
app.use("/",paginateRoute)
app.use("/product",productsRouter)
app.use("/api/carts",cartRoutes)
app.use("/chat",chatRouter)
const test = require('./routes/test.routes')
app.use("/loggerTest",test)
app.get("*", (req, res) => {
    res.status(404).render("error404",{})
  });
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)        
    dataBaseConect.conectarse()
})