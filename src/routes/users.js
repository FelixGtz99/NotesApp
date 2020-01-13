const router =require('express').Router();
const User=require('../models/User');
const passport=require('passport');
router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
    } );
    router.post('/users/singin', passport.authenticate('local',{
      successRedirect:'/notes',
      failureRedirect:'/users/signin',
      failureFlash:true
    }));
    router.get('/users/signup',(req,res)=>{
        res.render('users/signup');
        } );
router.post('/users/signup',async(req,res)=>{
  const {name, email, password, confirm_password}=req.body;
  const errors=[];
  if(name.length==0 || password.length==0 || confirm_password.length==0, email.length==0){
      errors.push({text: 'Alguno de los campos esta vacio'});
      //se puede usar express validator para validar
  }
  if(password!=confirm_password){
      errors.push({text: 'Las contraseñas son diferentes'});
  }
  if(password.length<4){
    errors.push({text: 'Las contraseñas debe ser de almenos 4 caracteres'});
  }
  if(errors.length>0){
      res.render('users/signup', {errors, name, email, password,confirm_password});

  }else{
      const emailUser = await User.findOne({email:email});
      if(emailUser){
        req.flash('errors_msg', 'El email ya esta en uso');
        res.redirect('/users/signup');
      }else{

   const newUser=new User({name, email, password});
   newUser.password= await newUser.encryptPassword(password);
   await newUser.save();
   req.flash('success_msg', 'te has registrado correctamente');
     res.redirect('/users/signin');
  }}
  //res.redirect('/notes')
});
module.exports=router;
