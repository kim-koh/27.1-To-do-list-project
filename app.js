const express = require("express"); 
const app = express(); 
const port = 3000; 

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.set('view engine', 'ejs'); 

app.use(express.static(__dirname + "/public")); 

let toDoList = ["to do #1", "to do #2", "to do #3"]; 
let workList = []; 

app.get("/", (req, res) => {
    
    let today = new Date(); 
    let options = {weekday: "long", day: "numeric", month: "long"}; 

    let currentDay = today.toLocaleDateString("en-US", options); 

    res.render("list", {listTitle: currentDay, toDoList: toDoList})
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work Todos", toDoList: workList})
})

app.post("/", (req, res) => {
    let newItem = req.body.newToDo;
    if (req.body.list === "Work") {
        workList.push(newItem)
        res.redirect("/work"); 
    } else {
        toDoList.push(newItem)
        console.log(toDoList)
        res.redirect("/"); 
    }
    
})




app.listen(port, () => {
    console.log("Server started on port " + port)
});