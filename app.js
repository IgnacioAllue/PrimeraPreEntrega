import express from 'express'
import productRouter from './src/routes/product.js'
import cartRouter from './src/routes/cart.js'
import realTimeProducts from './src/routes/realtimeproducts.js'
import { Server } from 'socket.io'
import { __dirname } from './src/utils/utils.js'
import handlebars from 'express-handlebars'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'public'))

app.engine('handlebars', handlebars.engine())
app.set('realtimeproducts',__dirname+'/realtimeproducts')
app.set('view engine', 'handlebars')

app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter)
app.use('/api/realtimeproducts', realTimeProducts)

const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Server running on port ${httpServer.address().port}`))
httpServer.on('error', error => console.log(error))

const socketServer = new Server(httpServer)

const products = []

socketServer.on('conection', socket => {
    socket.on('product',infoProduct => {
        products.push(infoProduct)
        socketServer.emit('newProduct', products)
    })
})