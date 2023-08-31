import express from 'express'
import router from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import { __dirname } from './utils.js'
import './db/dbConfig.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'public'))

app.use('/api/products', router);
app.use('/api/carts', cartRouter)


const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Server running on port ${httpServer.address().port}`))
httpServer.on('error', error => console.log(error))

