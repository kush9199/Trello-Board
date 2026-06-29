const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware")
//const {userModel, organizationModel} =require("./models");
const { userModel, organizationModel, boardModel,issueModel } = require("./models");

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

app.post("/board",authMiddleware, async (req, res) => {
    const userId= req.userId;
    const organizationId = req.body.organizationId;
    const title = req.body.title;

    const organization = await organizationModel.findOne({
        _id: organizationId
    })
    if(!organization || organization.admin.toString() !== userId){
        return res.status(411).json({
            message: "You are not allowed to create Boadrd"
        })
    }
    const board = await boardModel.create({
        title,
        organizationId
    })
    res.json({
        message: "Board Created",
        boardId: board._id
    })
})

app.post("/issue", async (req, res) => {
    const boardId = req.body.boardId;
    const title= req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const board= await boardModel.findOne({
        _id: boardId
    })
   if(! board){
    return res.status(404).json({
        message: "Board Not Found"
    })
   }
   const issue = await issueModel.create({
        title,
        description,
        boardId,
        status
    });
    res.json({
        message: "Issue created",
        issueId: issue._id
    });
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

app.get("/boards", async (req, res) => {
    console.log("Board endPoint hit")
    const organizationId = req.query.organizationId;
    const boards = await boardModel.find({
        organizationId: organizationId
    })
    res.json({
        boards
    })
})

app.get("/issues", async (req, res) => {
    const boardId = req.query.boardId;

    const issues = await issueModel.find({
        boardId: boardId
    });

    res.json({
        issues
    });
});

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

    const organization = await organizationModel.findOne({
        _id: organizationId
    });

    if (!organization || organization.admin.toString() !== userId) {
        return res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        });
    }

    const memberUser = await userModel.findOne({
        username: memberUserUsername
    });

    if (!memberUser) {
        return res.status(411).json({
            message: "No user with this username exists in our db"
        });
    }

    const result = await organizationModel.updateOne(
        {
            _id: organizationId
        },
        {
            $pull: {
                members: memberUser._id
            }
        }
    );

    console.log("Delete Result:", result);

    res.json({
        message: "member deleted!"
    });
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});