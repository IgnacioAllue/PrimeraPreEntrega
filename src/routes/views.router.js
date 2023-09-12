import { Router } from 'express';

const router = Router();


const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/productos');
    next();
}

const privateAcces = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login');
    next();
}


router.get('/register', publicAcces, (req,res)=>{
    res.render('register')
})

router.get('/login', publicAcces, (req,res)=>{
    res.render('login')
})

router.get('/productos', privateAcces ,(req,res)=>{
    res.render('profile',{
        user: req.session.user
    })
})

export default router;