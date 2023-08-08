const socketClient = io()

const inputProduct = document.getElementById('product')
const formulario = document.getElementById('formulario')

formulario.onsubmit = (e) => {
    e.preventDefault()
    const infoProducto = {
        producto: inputProduct.value
    }
    socketClient.emit('producto',infoProducto)
}

socketClient.on('product', (products) => {
    const add = products
    .map((objProduct) => {
        return `<p>${objProduct.producto}</p>`
    })
    .join(' ')
    divChat.innerHTML = add
})