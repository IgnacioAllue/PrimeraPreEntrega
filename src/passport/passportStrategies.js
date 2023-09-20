import passport from "passport";
import userModel from "../db/models/user.model.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import { userManager } from "../datos/UsersManager.js";

passport.use('login',new LocalStrategy(
    async function(email, done){
        try {
            const userDB = await userManager.findUser(email)
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
    callbackURL: "http://localhost:8080/api/users/github"
    },
    async function(accessToken,refreshToken,profile,done){
        try {
            const userDB = await userManager.findUser(profile.mail)
            if (userDB) {
                return done(null,false)
            }
        const newUser = {
            first_name: profile.displayName.split(' ') [0],
            last_name: profile.displayName.split(' ') [1],
            username: profile.username,
            password: ' '
        }
        const result = await userManager.create(newUser)
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
        done(null,user)
    } catch (error) {
        done(error)
    }
})