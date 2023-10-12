import userModel from "../DAO/models/user.model.js"

class UsersManager {

    async create(user){
        try {
            const newUser = await userModel.create(user)
            return newUser
        } catch (error) {
            return error
        }
    }

    async findUser(email){
        try {
            const user = await userModel.findOne({email})
            return user
        } catch (error) {
            return error
        }
    }
    async findUserById(id){
        try {
            const user = await userModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }
}

export const usersManager = new UsersManager()