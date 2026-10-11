import express from "express";
const router = express.Router();
import { createProject,getStarredProjects,getProjectById,getProjects,toggleStar,deleteProject } from "../controllers/project.controller.js";

router.post("/",createProject);
router.get("/",getProjects);
router.get("/starred",getStarredProjects);
router.get("/:id",getProjectById);
router.patch("/:id",toggleStar);
router.delete("/:id",deleteProject);

export default router;