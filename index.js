//username password | USERS table
//organization |ORGANIZATION table
//boards| BOARDS table
//issues| ISSUES table 

const express = require("express");
const users= [];
const organizations = [];
const boards=[];
const issues =[]
const app = express();
//create
app.post("/signup",(req,res)=>{

})
app.post("/signin",(req,res)=>{

})
app.post("/organization",(req,res)=>{
})
app.post("/add-member-to-organization", (req,res)=>{

})
app.post("/board",(req,res)=>{

})
app.post("/issue",(req,res)=>{

})


//Read parameter
app.get("/boards",(req,res)=>{

})
app.get("/issue",(req,res)=>{

})
app.get("/members",(req,res)=>{
    
})
app.listen(3000);


