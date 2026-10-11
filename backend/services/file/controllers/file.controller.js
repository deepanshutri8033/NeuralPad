import File from "../models/file.model.js";
import { buildTree } from "../utils/buildTree.js";

export const createRootFolder = async (req, res) => {
    try {
        const { projectId, projectName } = req.body;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is required"
            });
        }

        if (!projectId || !projectName) {
            return res.status(400).json({
                message: "ProjectId and name is required"
            });
        }

        const existingRootFolder = await File.findOne({
            projectId,
            parentId: null,
            isDeleted: false
        });

        if (existingRootFolder) {
            return res.status(400).json({
                message: "Root folder already exists"
            });
        }

        const rootFolder = await File.create({
            owner: userId,
            name: projectName,
            projectId,
            type: "folder",
            parentId: null
        });

        return res.status(201).json(rootFolder);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `Root folder create error ${error.message}`
        });
    }
};


export const createFolder = async (req, res) => {
    try {
        const { projectId, name, parentId } = req.body;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is required"
            });
        }

        if (!projectId || !name || !parentId) {
            return res.status(400).json({
                message: "ProjectId, parentId and name is required"
            });
        }

        const exist = await File.findOne({
            name,
            projectId,
            parentId,
            isDeleted: false
        });

        if (exist) {
            return res.status(400).json({
                message: "Folder already exists"
            });
        }

        const folder = await File.create({
            owner: userId,
            name,
            projectId,
            type: "folder",
            parentId
        });

        return res.status(201).json(folder);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `Folder create error ${error.message}`
        });
    }
};


export const createFile = async (req, res) => {
    try {
        const {
            projectId,
            name,
            parentId,
            content = "",
            language = "plaintext"
        } = req.body;

        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is required"
            });
        }

        if (!projectId || !name || !parentId) {
            return res.status(400).json({
                message: "ProjectId, parentId and name is required"
            });
        }

        const exist = await File.findOne({
            name,
            projectId,
            parentId,
            isDeleted: false
        });

        const extension = name.includes(".")
            ? name.split(".").pop()
            : "";

        if (exist) {
            return res.status(400).json({
                message: "File already exists"
            });
        }

        const file = await File.create({
            owner: userId,
            name,
            projectId,
            type: "file",
            language,
            content,
            extension,
            size: content.length,
            parentId
        });

        return res.status(201).json(file);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `File create error ${error.message}`
        });
    }
};


export const updateFile = async (req, res) => {
    try {
        const { name, content } = req.body;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is required"
            });
        }

        const file = await File.findOne({
            _id: req.params.id,
            owner: userId,
            isDeleted: false
        });

        if (!file) {
            return res.status(400).json({
                message: "File not exists"
            });
        }

        if (name) {
            file.name = name;

            const extension = name.includes(".")
                ? name.split(".").pop()
                : "";

            file.extension = extension;
        }

        if (content !== undefined) {
            file.content = content;
            file.size = content.length;
        }

        await file.save();

        return res.status(200).json(file);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `File Update error ${error.message}`
        });
    }
};


export const deleteFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is required"
            });
        }

        const file = await File.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: userId,
                isDeleted: false
            },
            {
                isDeleted: true
            },
            {
                new: true
            }
        );

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        return res.status(200).json(file);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `File Delete error ${error.message}`
        });
    }
};


export const getFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                message: "UserId is required"
            });
        }

        const file = await File.findOne({
            _id: id,
            owner: userId,
            isDeleted: false
        });

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        return res.status(200).json(file);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `Get file error ${error.message}`
        });
    }
};


export const getTree = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "UserId is required"
            });
        }

        if (!projectId) {
            return res.status(400).json({
                message: "ProjectId is required"
            });
        }

        const files = await File.find({
            projectId,
            owner: userId,
            isDeleted: false
        });

        const tree = buildTree(files);

        return res.status(200).json(tree);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `Get tree error ${error.message}`
        });
    }
};

