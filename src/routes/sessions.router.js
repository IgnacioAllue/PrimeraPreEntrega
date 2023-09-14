import { Router } from 'express';
import userModel from '../db/models/user.model.js';
import { hashData } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post('/register', async (req, res) =>{

    const {first_name, last_name, email, age, password, role} = req.body;

    const exist = await userModel.findOne({email});
    if(exist){
        return res.status(400).send({status:"error", error:"User already exists"});
    }
    const user = {
        first_name, last_name, email, age, password, role:'usuario'
    };

    const hashPassword = await hashData(password)
    const result = await userModel.create({...user, password:hashPassword});
    res.send({status:"succes", message:"User registered"});

})

router.post('/login', async (req,res)=>{
    const { email, password } = req.body;
    const user = await userModel.findOne({email,password})

    if(!user){
        return res.status(400).send({status:"error", error:"Datos incorrectos"})
    }
  
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    }
    res.send({status:"success", payload:req.res.user, message:"Se logueo con exito"})
    
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/login');
    })
})

router.get(
    "/githubSignup",
    passport.authenticate("github", { scope: ["user:email"] })
)
  
router.get(
        "/github",
        passport.authenticate("github", {
        failureRedirect: "/api/loin",
        successRedirect: "/api/views/home",
    })
)

export default router;