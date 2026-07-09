const {
    issueModel,
    boardModel,
    organizationModel
} = require("../models");

const createIssue = async (req, res) => {

    try {

        const userId = req.userId;

        const {
            boardId,
            title,
            description,
            status
        } = req.body;

        if (!boardId || !title) {
            return res.status(400).json({
                message: "boardId and title are required"
            });
        }

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

        res.status(201).json({
            message: "Issue created successfully",
            issueId: issue._id
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const getIssues = async (req, res) => {

    try {

        const userId = req.userId;
        const boardId = req.query.boardId;

        if (!boardId) {
            return res.status(400).json({
                message: "boardId is required"
            });
        }

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

        const issues = await issueModel.find({
            boardId
        });

        res.json({
            issues
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const updateIssue = async (req, res) => {

    try {

        const {
            issueId,
            title,
            description,
            status
        } = req.body;

        const issue = await issueModel.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        await issueModel.updateOne(
            {
                _id: issueId
            },
            {
                title,
                description,
                status
            }
        );

        res.json({
            message: "Issue updated successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createIssue,
    getIssues,
    updateIssue
};