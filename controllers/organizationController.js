const { organizationModel, userModel } = require("../models");
const { ROLE } = require("../utils/constants");
const createOrganization = async (req, res) => {
    try {
        if (req.role !== ROLE.ADMIN) {
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
            message: "Organization created successfully",
            id: newOrg._id
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const addMember = async (req, res) => {
    try {

        if (req.role !== ROLE.ADMIN) {
            return res.status(403).json({
                message: "Only admins can add members"
            });
        }

        const userId = req.userId;
        const { organizationId, memberUserUsername } = req.body;

        const organization = await organizationModel.findById(
            organizationId
        );

        if (
            !organization ||
            organization.admin.toString() !== userId
        ) {
            return res.status(411).json({
                message: "Either this organization doesn't exist or you are not the admin"
            });
        }

        const memberUser = await userModel.findOne({
            username: memberUserUsername
        });

        if (!memberUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await organizationModel.updateOne(
            {
                _id: organizationId
            },
            {
                $addToSet: {
                    members: memberUser._id
                }
            }
        );

        res.json({
            message: "Member added successfully"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getOrganization = async (req, res) => {
    try {

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

        res.json({
            organization,
            role: isAdmin ? "ADMIN" : "MEMBER"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const getMyOrganization = async (req, res) => {

    try {

        const userId = req.userId;
        const role = req.role;

        let organization;

        if (role === ROLE.ADMIN) {

            organization = await organizationModel.findOne({
                admin: userId
            });

        } else {

            organization = await organizationModel.findOne({
                members: userId
            });

        }

        if (!organization) {
            return res.status(404).json({
                message: "No organization found"
            });
        }

        res.json({
            organization
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
const getMembers = async (req, res) => {

    try {

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

        const members = await userModel.find({
            _id: {
                $in: organization.members
            }
        });

        res.json({
            members
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const removeMember = async (req, res) => {

    try {

        if (req.role !== ROLE.ADMIN) {
            return res.status(403).json({
                message: "Only admins can remove members"
            });
        }

        const userId = req.userId;

        const {
            organizationId,
            memberUserUsername
        } = req.body;

        const organization = await organizationModel.findById(
            organizationId
        );

        if (
            !organization ||
            organization.admin.toString() !== userId
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const member = await userModel.findOne({
            username: memberUserUsername
        });

        if (!member) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await organizationModel.updateOne(
            {
                _id: organizationId
            },
            {
                $pull: {
                    members: member._id
                }
            }
        );

        res.json({
            message: "Member removed successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createOrganization,
    addMember,
    getOrganization,
    getMyOrganization,
    getMembers,
    removeMember
};