const express = require("express");

const {
    signup,
    adminSignup,
    signin
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.post("/signup/admin", adminSignup);

router.post("/signin", signin);

module.exports = router;