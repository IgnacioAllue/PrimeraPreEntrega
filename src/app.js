import express from 'express'
import session from 'express-session'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import './db/dbConfig.js'
import MongoStore from 'connect-mongo'
import sessionRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import './passport/passportStrategies.js'
import config from './config.js'
import mockingRouter from './routes/mocking.router.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from "swagger-ui-express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public' ))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(cookieParser('secretKeyCookies'))

app.use(
  session({
    store: new MongoStore({
      mongoUrl: 'mongodb+srv://ignacioallue:Monje1@cluster0.0f3tu6m.mongodb.net/Proyecto1?retryWrites=true&w=majority',
      ttl: 60*5,
    }),
    secret: "CoderSecret",
    cookie: {maxAge:60000},
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())


app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)
app.use('/api/session', sessionRouter)
app.use('/api/mockingproducts', mockingRouter)

const PORT = config.port
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
    title: "Documentacion",
    description: "Productos"}
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions)
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${httpServer.address().port}`))
httpServer.on('error', error => console.log(error))

