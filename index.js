const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { authMiddleware } = require("./middleware")
//const {userModel, organizationModel} =require("./models");
const { userModel, organizationModel, boardModel,issueModel } = require("./models");

const ROLE = {
    USER: "USER",
    ADMIN: "ADMIN"
}

console.log("userModel =", userModel);
console.log("organizationModel =", organizationModel);
const app = express();
app.use(express.json());
app.use(cors());
const bcrypt = require("bcrypt");
// CREATE
app.post("/signup", async (req, res) => {
    console.log(req);
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

    const hashedPassword = await bcrypt.hash(password, 5);

     const newUser = await userModel.create({
    username,
    password: hashedPassword,
    role: ROLE.USER
    });
    res.json({
        id: newUser._id,
        message: "You have signed up successfully"
    })

})

app.post("/signup/admin", async (req, res) => {
    console.log(req);
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

    const hashedPassword = await bcrypt.hash(password, 5);

   const newUser = await userModel.create({
    username,
    password: hashedPassword,
    role: ROLE.ADMIN
});
    res.json({
        id: newUser._id,
        message: "You have signed up successfully"
    })

})

app.post("/signin",async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
const userExists = await userModel.findOne({
    username
});

if (!userExists) {
    return res.status(403).json({
        message: "Incorrect credentials"
    });
}

const passwordMatch = await bcrypt.compare(
    password,
    userExists.password
);

if (!passwordMatch) {
    return res.status(403).json({
        message: "Incorrect credentials"
    });
}

    const token = jwt.sign({
        userId: userExists._id,
        role: userExists.role
    }, "attlasiationsupersecret123123password");
    // create a jwt for the user

    res.json({
        token,
        role: userExists.role
    })
})

// AUTHENTICATED ROUTE - MIDDLEWARE
app.post("/organization", authMiddleware, async (req, res) => {

    if(req.role !== ROLE.ADMIN){
        return res.status(403).json({
            message: "Only admins can create organizations"
        });
    }

    const userId = req.userId;

    const newOrg = await organizationModel.create({
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    });

    res.json({
        message: "Org created",
        id: newOrg._id
    });
});
app.post("/add-member-to-organization", authMiddleware, async (req, res) => {
    const userId = req.userId;
     if(req.role !== ROLE.ADMIN){
        return res.status(403).json({
            message: "Only admins can add members"
        });
    }
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
    const role = req.role;
    const organizationId = req.body.organizationId;
    const title = req.body.title;

    const organization = await organizationModel.findOne({
        _id: organizationId
    })
    // role check for admin access
    if (
    !organization ||
    role !== ROLE.ADMIN ||
    organization.admin.toString() !== userId
){
    return res.status(411).json({
        message: "You are not allowed to create Board"
    });
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

app.post("/issue", authMiddleware, async (req, res) => {

    const userId = req.userId;

    const boardId = req.body.boardId;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;

    const board = await boardModel.findById(boardId);

    if (!board) {
        return res.status(404).json({
            message: "Board not found"
        });
    }

    const organization = await organizationModel.findById(
        board.organizationId
    );

    if (!organization) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    const isAdmin =
        organization.admin.toString() === userId;

    const isMember =
        organization.members.some(
            member => member.toString() === userId
        );

    if (!isAdmin && !isMember) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    const issue = await issueModel.create({
        title,
        description,
        boardId,
        status
    });

    res.json({
        message: "Issue created successfully",
        issueId: issue._id
    });
});

//GET endpoints
app.get("/organization", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const organizationId = req.query.organizationId;

        if (!organizationId) {
            return res.status(400).json({
                message: "organizationId is required"
            });
        }

        const organization = await organizationModel.findById(organizationId);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        const isAdmin = organization.admin.toString() === userId;

        const isMember = organization.members.some(
            memberId => memberId.toString() === userId
        );

        if (!isAdmin && !isMember) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json({
            organization,
            role: isAdmin ? "ADMIN" : "MEMBER"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.get("/boards", authMiddleware, async (req, res) => {

    const userId = req.userId;
    const organizationId = req.query.organizationId;

    const organization = await organizationModel.findById(
        organizationId
    );

    if (!organization) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    const isAdmin =
        organization.admin.toString() === userId;

    const isMember =
        organization.members.some(
            member => member.toString() === userId
        );

    if (!isAdmin && !isMember) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    const boards = await boardModel.find({
        organizationId
    });

    res.json({
        boards
    });
});

app.get("/issues",authMiddleware, async (req, res) => {
    const boardId = req.query.boardId;

    const issues = await issueModel.find({
        boardId: boardId
    });

    res.json({
        issues
    });
});

app.get("/members", authMiddleware, async (req, res) => {

    const userId = req.userId;
    const organizationId = req.query.organizationId;

    const organization = await organizationModel.findById(
        organizationId
    );

    if (!organization) {
        return res.status(404).json({
            message: "Organization Not Found"
        });
    }

    const isAdmin =
        organization.admin.toString() === userId;

    const isMember =
        organization.members.some(
            member => member.toString() === userId
        );

    if (!isAdmin && !isMember) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    const members = await userModel.find({
        _id: {
            $in: organization.members
        }
    });

    res.json({
        members
    });
});


// UPDATE
app.put("/issues",authMiddleware, async (req, res) => {
   const issueId = req.body.issueId;
   const title = req.body.title;
   const description = req.body.description;
   const status = req.body.status;
   const issue= await issueModel.findOne({
    _id: issueId
   })
   if(!issue){
    return res.status(404).json({
        message: "Issue Not Found"
    })
   }
   await issueModel.updateOne(
    {
        _id: issueId
    },{
        title,
        description, 
        status
    }
   )
   res.json({
    message: "Issues Updates"
   })
})

//DELETE -- FIND THE GBUG and fix it
app.delete("/members", authMiddleware, async (req, res) => {
    const userId = req.userId;
    if (req.role !== ROLE.ADMIN) {
    return res.status(403).json({
        message: "Only admins can remove members"
    });
}
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