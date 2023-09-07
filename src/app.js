import express from 'express'
import session from 'express-session'
import router from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'handlebars'
import { __dirname } from './utils.js'
import './db/dbConfig.js'
import MongoStore from 'connect-mongo'
import sessionRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(
    session({
      store: new MongoStore({
        mongoUrl: MONGO,
        ttl: 40,
      }),
      secret: "CoderSecret",
      resave: false,
      saveUninitialized: false,
    })
  )

app.use('/api/products', router);
app.use('/api/carts', cartRouter)
app.use('/views', viewsRouter)
app.use('/api/session', sessionRouter)


const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Server running on port ${httpServer.address().port}`))
httpServer.on('error', error => console.log(error))

