const express = require("express");

const {
    createBoard,
    getBoards
} = require("../controllers/boardController");

const { authMiddleware } = require("../middleware");

const router = express.Router();

// Create Board
router.post(
    "/board",
    authMiddleware,
    createBoard
);

// Get All Boards of an Organization
router.get(
    "/boards",
    authMiddleware,
    getBoards
);

module.exports = router;