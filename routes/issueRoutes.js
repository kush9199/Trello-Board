const express = require("express");

const {
    createIssue,
    getIssues,
    updateIssue
} = require("../controllers/issueController");

const { authMiddleware } = require("../middleware");

const router = express.Router();

router.post(
    "/issue",
    authMiddleware,
    createIssue
);

router.get(
    "/issues",
    authMiddleware,
    getIssues
);

router.put(
    "/issues",
    authMiddleware,
    updateIssue
);

module.exports = router;