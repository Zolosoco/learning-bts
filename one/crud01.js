/* A simpleton CRUD backend application simulating hospital analogy - dealing with kidneys legally
*/




const express = require('express');

const app = express();

const port = 3000;

let users = [{
  name : "John",
  kidneys : [{healthy : true}]

}];

// CRUD
//GET method to "Read" the data:
app.use(express.json()); //built-in middleware which acts as a body parser, parsing json data for the methods below to use!

app.get('/', function(req,res){
  const johnKidneys = users[0].kidneys;
  const noOfkidneys = johnKidneys.length;
  const noOfHealthyKidneys = johnKidneys.filter((kidney) => kidney.healthy).length;
  const noOfUnhealthyKidneys = noOfkidneys - noOfHealthyKidneys;

  res.json({
    "Total Kidneys" : noOfkidneys,
    "Healthy Kidney Count" : noOfHealthyKidneys,
    "Unhealthy Kidney Count" : noOfUnhealthyKidneys,
    "John Kidney Array" : johnKidneys

  });

});



//post method to : "Create"

app.post("/", function(req,res){
  const ishealthy = req.body.ishealthy;   //req.body => undefined if app.use(express.json()) is not used; reason being middlewares!
  users[0].kidneys.push({healthy : ishealthy});
  res.json({
    "message" : "Kidney created succesfully!"
  });
});

//Put method to update:


app.put("/", function(req, res){
  const index = req.body.index;
  const health = req.body.health;
  // console.log(users[0].kidneys[index])
  function addingHealthyKidneys(){
    users[0].kidneys[index] = {healthy : health};
  };
  addingHealthyKidneys();

  res.json({
    "message" : "kidney status updated succesfully!"
  });

});



app.delete("/", function(req,res){
  const index = req.body.index;
  function deleteKidney(no){
    return users[0].kidneys.splice(no, 1);
  };

  deleteKidney(index);

  res.json({
    "message" : "Kidney Deleted Succesfully!"
  });
});




app.listen(port);

