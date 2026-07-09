const { boardModel, organizationModel } = require("../models");
const { ROLE } = require("../utils/constants");

const createBoard = async (req, res) => {

    try {

        const userId = req.userId;
        const role = req.role;

        const {
            organizationId,
            title
        } = req.body;

        if (!organizationId || !title) {
            return res.status(400).json({
                message: "organizationId and title are required"
            });
        }

        const organization = await organizationModel.findById(
            organizationId
        );

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        if (
            role !== ROLE.ADMIN ||
            organization.admin.toString() !== userId
        ) {
            return res.status(403).json({
                message: "Only organization admin can create boards"
            });
        }

        const board = await boardModel.create({
            title,
            organizationId
        });

        res.status(201).json({
            message: "Board created successfully",
            boardId: board._id
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const getBoards = async (req, res) => {

    try {

        const userId = req.userId;
        const organizationId = req.query.organizationId;

        if (!organizationId) {
            return res.status(400).json({
                message: "organizationId is required"
            });
        }

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

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createBoard,
    getBoards
};