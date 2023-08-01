export const validateProduct = product => {
    let result = true
    if(!product.title || !product.description || !product.code || !product.status || !product.stock || !product.category || !product.thumbnail){
        result = false
    }
    return result
}