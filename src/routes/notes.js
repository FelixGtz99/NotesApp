const router =require('express').Router();
const Note = require('../models/Note');
router.get('/notes/add',(req,res)=>{
    res.render('notes/new-note');
    } );
router.post('/notes/new-note', async (req,res)=>{
 const {title, description}=  req.body;
 const errors=[];
 if(!title){
     errors.push({text:'Es necesario escribir un titulo'})
 }
 if(!description){
    errors.push({text:'Es necesario escribir la descripcion'})
 }
 if(errors.length>0){
     res.render('notes/new-note', {
        errors, 
        title, 
       description
     });
 }else{
    const newNote=new Note({title, description});
   await newNote.save();
   res.redirect('/notes');
 }    
} );
router.get('/notes', async(req,res)=>{
   const notes = await Note.find().sort({date:'desc'});//insertando parametros haces busquedas
  res.render('notes/all-notes', {notes});
    } );
module.exports=router;
 