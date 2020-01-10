const mongosse= require('mongoose');
mongosse.connect('mongodb://localhost/notes-db-app',{
useCreateIndex:true,
useNewUrlParser:true,
useFindAndModify:false,
useUnifiedTopology: true 
}).then(db => console.log('DB is connected')).catch(err => console.error(errl));