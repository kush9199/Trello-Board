//username password | USERS table
//organization |ORGANIZATION table
//boards| BOARDS table
//issues| ISSUES table 



const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware")
let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;
const USERS= [];
const ORGANIZATIONS = [];
const BOARDS=[];
const ISSUES =[]
const app = express();
app.use(express.json());
//create
app.post("/signup",(req,res)=>{
   const username = req.body.username;
   const password = req.body.password;

   const userExists = USERS.find(u=>u.username === username);
   if(userExists){
    res.status(411).json({
        message: "User with this usernname already exist "
    })
    return;
   }
USERS.push({
    username,
    password,
   id: USERS_ID++
})
res.json({
    message: "You have signed up successfully "
})
})


app.post("/signin",(req,res)=>{
   const username = req.body.username;
   const password = req.body.password;
   const userExist = USERS.find(u=>u.username === username && u.password === password);
   if(!userExist){
        res.status(403).json({
            message: "Incorrect Credentials"
        })
   }
   //create a jwt for the user 
   const token = jwt.sign({
    userId : userExist.id
   },"attlasiationsupersecret123123password");
   res.json({
    token
   })
})

//authenticated route ==> Middleware 
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


//Put ie we are updating the issues on the board from up next => in process to => finished 
app.put("/issues",(req,res)=>{

})


//Delete parameters
app.delete("/members",(req,res)=>{

})
app.listen(3000);


