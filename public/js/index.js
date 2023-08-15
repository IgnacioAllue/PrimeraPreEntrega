const socketClient = io()

const title = document.getElementById('inputTitle')
const description = document.getElementById('inputDescription')
const price = document.getElementById('inputPrice')
const code = document.getElementById('inputCode')
const stock = document.getElementById('inputStock')
const category = document.getElementById('inputCategory')
const form = document.getElementById('form')
const divProds = document.getElementById('prods')

form.onsubmit = (event) => {
    event.preventDefault()
    const infoProducto = {
        title: title.value,
        description: description.value,
        price: price.value,
        code: code.value,
        stock: stock.value,
        category: category.value
    }
    socketClient.emit('producto',infoProducto)
}

socketClient.on('newProducts', productos => {
    const newProducts = productos
        .map((objProductos) => {
            return `<p>${objProductos.infoProducto}</p>`
        })
        .join(' ')
    divProds.innerHTML = newProducts
})