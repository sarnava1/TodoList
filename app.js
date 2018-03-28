var express=require('express');
var app=express();

var todoController=require('./controllers/todoController')

//setting the template engine
app.set('view engine','ejs');

//these are the static file which will be included in every file
app.use(express.static('./public'));

//fire controllers
todoController(app);

//setting up the server to listen to port no 3000
app.listen(3000);
console.log('server listening to port no 3000');
