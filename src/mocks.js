import { faker, es } from "@faker-js/faker";

export const generateProducts = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        code: faker.number.int(1000),
        category: faker.commerce.department(),
        stock: faker.number.int(200)
    }
    return product
}

