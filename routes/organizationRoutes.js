const express = require("express");

const {
    createOrganization,
    addMember,
    getOrganization,
    getMembers,
    removeMember
} = require("../controllers/organizationController");

const { authMiddleware } = require("../middleware");

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