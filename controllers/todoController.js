var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connecting to the mlab database
mongoose.connect("mongodb://test:test@ds117625.mlab.com:17625/todo1")
//var data=[{item:"walk dog"},{item:"walk dog"},{item:"walk dog"}];

var urlencodedParser=bodyParser.urlencoded({extended:false});

//create a schema--this is like a blueprint for what we are going to store
var todoSchema=new mongoose.Schema({
  item:String
})

var Todo=mongoose.model('Todo',todoSchema);

module.exports=function(app){

app.get('/todo',function(req,res){

  //get data from the database and display it over here
  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{todos:data});
  });
});




app.post('/todo',urlencodedParser,function(req,res){

  //get data from the view and add it to our mongodb database
  var newTodo=Todo(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item',function(req,res){

//delete the requested item from mongodb
Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
  if(err) throw err;
  res.json(data);
  });
});

};
