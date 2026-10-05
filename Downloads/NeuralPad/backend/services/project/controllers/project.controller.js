import Project from "../models/project.model.js";
import redis from "../../../shared/redis/redis.js";

export const createProject = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({ message: "UserId is Required" });
        }

        const { name, description } = req.body;

        const project = await Project.create({
            owner: userId,
            name,
            description
        });

        const key = `projects-${userId}`;
        await redis.del(key);

        return res.status(201).json({
            message: "Project Created Successfully",
            project
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `create project failed due to ${err.message}`
        });
    }
};

export const getProjects = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({ message: "UserId is Required" });
        }

        const key = `projects-${userId}`;

        let result = await redis.get(key);

        if (result) {
            return res.status(200).json(JSON.parse(result));
        }

        const projects = await Project.find({
            owner: userId,
        }).sort({ updatedAt: -1 });

        await redis.set(
            key,
            JSON.stringify({ projects }),
            "EX",
            60 * 60 * 24
        );

        return res.status(200).json({
            message: "Projects got Successfully",
            projects
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `get projects failed due to ${err.message}`
        });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        project.lastOpenedAt = new Date();

        await project.save();

        return res.status(200).json({ project });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `get projectById failed due to ${err.message}`
        });
    }
};

export const getStarredProjects = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is Required"
            });
        }

        const key = `starred-${userId}`;

        let result = await redis.get(key);

        if (result) {
            return res.status(200).json(JSON.parse(result));
        }

        const projects = await Project.find({
            owner: userId,
            starred: true
        }).sort({ updatedAt: -1 });

        await redis.set(
            key,
            JSON.stringify({ projects }),
            "EX",
            60 * 60 * 24
        );

        return res.status(200).json({
            message: "Starred projects got Successfully",
            projects
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `get starred projects failed due to ${err.message}`
        });
    }
};

export const toggleStar = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        project.starred = !project.starred;

        await project.save();

        await redis.del(`starred-${userId}`);
        await redis.del(`projects-${userId}`);

        return res.status(200).json({
            message: "Project starred status toggled Successfully",
            project
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `toggle starred project failed due to ${err.message}`
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is Required"
            });
        }

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        await redis.del(`projects-${userId}`);
        await redis.del(`starred-${userId}`);

        await Project.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Project deleted Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `delete project failed due to ${err.message}`
        });
    }
};