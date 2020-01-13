const express= require('express');
const path= require('path');
const exphbs=require ('express-handlebars');
const mtOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const passport =require('passport')
//initialiazations
const app=express();
require('./database');
require('./config/passport')

//Settings
app.set('port', process.env.PORT || 3000);// si existe un puerto que lo tome si no que sea el 3000
app.set('views', path.join(__dirname, 'views') );// concatena el directorio en donde se esta corriendo con la carpeta views
app.engine('.hbs', exphbs({
defaultLayout:'main', 
layoutsDir:path.join(app.get('views'), 'layouts'),
partialsDir:path.join(app.get('views'), 'partials'),
extname:'.hbs'

}));
app.set('view engine', '.hbs');
//middlewares
app.use(express.urlencoded({extended: false}))
app.use(mtOverride('_method'));
app.use(session({
    secret:'EllaNoTeQuiere',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global Variables
app.use((req, res, next)=>{
res.locals.success_msg= req.flash('success_msg');
res.locals.error_msg= req.flash('error_msg');
res.locals.error= req.flash('error');
next();
});
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));
//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//server is listening
app.listen(app.get('port'), ()=>{
console.log('server on port', app.get('port'));
})