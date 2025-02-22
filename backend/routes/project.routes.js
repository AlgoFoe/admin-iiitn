const express = require("express");
const { addProject, getProject, updateProject, deleteProject } = require("../controllers/project.controller");

const router = express.Router();

router.post("/project", addProject);
router.get("/project", getProject);
router.put("/project", updateProject);
router.delete("/project", deleteProject);

module.exports = router;
