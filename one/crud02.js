/* hospital backend - with error and exception handling with try catch */


const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const users = [{
    name : "John",
    kidneys : []
}];

//Middleware body json parser:
app.use(express.json())

//creating with post http route handler
app.post("/", (req,res) => {
    try{
        const {ishealthy} = req.body;
        //input validation:
        if(typeof ishealthy !== 'boolean'){
            return res.status(400).json({message : " 'ishealthy' expects a boolean value!"});
        };

        users[0].kidneys.push({healthy : ishealthy});

        res.status(201).json({message : "Kidney added succesfully!"});
    }catch(error){
        res.status(500).json({message : "Internal Server Error!", error: error.message});
    };
});


// get route handler to cRud - Read

app.get("/", (req,res) => {
    try{
        const johnKidneys = users[0].kidneys;
        const totalKidneys = johnKidneys.length;
        const healthyKidneys = johnKidneys.filter((kidney) => kidney.healthy).length;
        const unhealthyKidneys = totalKidneys - healthyKidneys;

        res.status(200).json({
                totalKidneys,
                healthyKidneys,
                unhealthyKidneys,
                "Array of Kidneys" : johnKidneys
        });
    } catch(error){
        res.status(500).json({message : "Internal Server Error!", error : error.message});
    };
});


//check input index validation
function validateKidneyIndex(index,kidney){
    if(index < 0 || index > kidney.length || typeof index !== 'number'){
         return ("Invalid index value, index must be : a number, >= 0 , index < total no of kidneys!")
    };

}
//put route handler to crUd -update

app.put("/", (req,res) => {
    try{
        const {index, ishealthy} = req.body;
        const kidney = users[0].kidneys;

        //Input validation:
        if(validateKidneyIndex(index,kidney) == "Invalid index value, index must be : a number, >= 0 , index < total no of kidneys!" || typeof ishealthy !== 'boolean' ){
            return res.status(400).json({message : "Either of the input is invalid, please check the index and ishealthy variables!"})
        };

        kidney[index] = {healthy : ishealthy};
        res.status(200).json({message : "Kidneys Updated Succesfully!"});

    } catch(error){
        res.status(500).json({message : "Internal Server Error!", error : error.message});
    };
});

//deleting with delete router

app.delete("/", (req,res) => {
    try{
        const {index} = req.body; // ~ to const index = req.body.index;
        const kidneys = users[0].kidneys;
        //input validation:
        if(validateKidneyIndex(index,kidneys) == "Invalid index value, index must be : a number, >= 0 , index < total no of kidneys!" ){
            return res.status(400).res.json({message : "Invalid index input!"});
        };

        kidneys.splice(index,1) // one element with input index removed from the db;

        res.status(200).json({message : "Kidney Deleted Succesfully!"});

    } catch(error){
        res.status(500).json({message : "Internal Server Error!", error : error.message});
    };

});





//starting the server
app.listen(port, () => {
    console.log(`Server is running on Port : ${port}`);
});