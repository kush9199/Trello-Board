const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware")
//const {userModel, organizationModel} =require("./models");
const { userModel, organizationModel } = require("./models");

console.log("userModel =", userModel);
console.log("organizationModel =", organizationModel);


let BOARD_ID = 1;
let ISSUES_ID = 1;



const BOARDS = [];

const ISSUES = [];

const app = express();
app.use(express.json());

// CREATE
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

   // const userExists = USERS.find(u => u.username === username);
   const userExists = await userModel.findOne({
    username: username,
   })
    if (userExists) {
        res.status(411).json({
            message: "User with this username already exists"
        })
        return;
    }

    const newUser = await userModel.create({
        username: username,
        password: password
    })
    res.json({
        id: newUser._id,
        message: "You have signed up successfully"
    })

})

app.post("/signin",async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await userModel.findOne({
        username: username,
        password: password
    })
    if (!userExists) {
       return res.status(403).json({
            message: "Incorrect credentials"
        })
    }

    const token = jwt.sign({
        userId: userExists._id
    }, "attlasiationsupersecret123123password");
    // create a jwt for the user

    res.json({
        token
    })
})

// AUTHENTICATED ROUTE - MIDDLEWARE
app.post("/organization", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const newOrg= await organizationModel.create({
          title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })

    res.json({
        message: "Org created",
        id: newOrg._id
    })
})

app.post("/add-member-to-organization", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

  //  const organization = ORGANIZATIONS.find(org => org.id === organizationId);
     const organization =await organizationModel.findOne({
          _id:organizationId 
     })
    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

   // const memberUser = USERS.find(u => u.username === memerUserUsername);
   const memberUser = await userModel.findOne({
    username: memberUserUsername
   })

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
        return
    }
    
    //organization.members.push(memberUser.id);
     await organization.updateOne({
        _id: organizationId
     },{
        $push:{
            "members": memberUser._id
        }
     })
    res.json({
        message: "New member added!"
    })
})

app.post("/board", (req, res) => {
    
})

app.post("/issue", (req, res) => {
    
})

//GET endpoints
app.get("/organization", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organizationId = req.query.organizationId; 
    const organization =await organizationModel.findOne({
          _id:organizationId 
     })
    

    console.log(organization);
    console.log(userId);
    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

    res.json({
        organization: organization
    })
})

app.get("/boards", (req, res) => {

    
})

app.get("/issues", (req, res) => {
    
})

app.get("/members", (req, res) => {

})


// UPDATE
app.put("/issues", (req, res) => {

})

//DELETE -- FIND THE GBUG and fix it
app.delete("/members", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    //const organization = ORGANIZATIONS.find(org => org.id === organizationId);
    const organization =await organizationModel.findOne({
          _id:organizationId 
     })

    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

    const memberUser = await userModel.findOne({
    username: memberUserUsername
   })

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
        return
    }
//
  await organizationModel.updateOne({
    _id: organizationId
  },{
    "$pull":{
        members : memberUser._id
    }
  })
    res.json({
        message: "member deleted!"
    })
})
app.get("/", (req, res) => {
    console.log("Root route hit");
    res.send("Server is working");
});

app.listen(3000);