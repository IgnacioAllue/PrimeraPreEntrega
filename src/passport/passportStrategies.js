import passport from "passport";
import userModel from "../DAO/models/user.model.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import { usersManager } from '../controllers/UsersManager.js'

passport.use('login',new LocalStrategy(
    async function(email, done){
        try {
            const userDB = await usersManager.findUser(email)
            if(!userDB){
                return done(null,false)
            }
            return done(null,userDB)
        } catch (error) {
            done(error)
        }
    }
))

passport.use(new GithubStrategy({
    clientID: 'Iv1.45e8ca69d5232da1',
    clientSecret: 'fe78faf41f1f7f6244997461f3e17ba0de842ff0',
    callbackURL: "http://localhost:8080/api/login/github"
    },
    async function(accessToken,refreshToken,profile,done){
        try {
            const userDB = await usersManager.findUser(profile.username)
            if (userDB) {
                return done(null,false)
            }
        const newUser = {
            first_name: profile.displayName.split(' ') [0],
            last_name: profile.displayName.split(' ') [1],
            username: profile.username,
            password: ' '
        }
        const result = await usersManager.create(newUser)
        return done(null,result)
        } catch (error) {
            done(error)
        }
    }

))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done) => {
    try {
        const usuario = await userModel.findById(id)
        done(null,usuario)
    } catch (error) {
        done(error)
    }
})