const express = require("express");

const {
    createOrganization,
    addMember,
    getOrganization,
    getMyOrganization,
    getMembers,
    removeMember
} = require("../controllers/organizationController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Create Organization
router.post(
    "/organization",
    authMiddleware,
    createOrganization
);

// Add Member
router.post(
    "/add-member-to-organization",
    authMiddleware,
    addMember
);

// Get Organization
router.get(
    "/organization",
    authMiddleware,
    getOrganization
);
//get my organization 
router.get(
    "/my-organization",
    authMiddleware,
    getMyOrganization
);
// Get Members
router.get(
    "/members",
    authMiddleware,
    getMembers
);

// Remove Member
router.delete(
    "/members",
    authMiddleware,
    removeMember
);

module.exports = router;