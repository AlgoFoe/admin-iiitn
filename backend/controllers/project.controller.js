const Project = require("../models/projects");

const addProject = async (req, res) => {
    try {
        const { facultyName, title, funding, duration, organisation, department, type } = req.body;

        const project = await Project.create({
            facultyName,
            title,
            funding,
            duration,
            organisation,
            department,
            type
        });

        if (project) {
            res.status(200).json({ msg: "Project added successfully", data: project });
        } else {
            throw new Error("Error adding new project");
        }
    } catch (err) {
        console.log("Error in addProject controller : ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProject = async (req, res) => {
    try {
        const { dept, id } = req.query
        if (dept) {
            const projectList = await Project.find({ department: dept });

            if (projectList) {
                res.status(200).json({ msg: "Project List found", data: projectList });
            } else {
                res.status.json({ msg: `Cannot find project from the "${dept}" department` })
            }
        } else if (id) {
            const project = await Project.findById(id);

            if (project) {
                res.status(200).json({ msg: "Project found", data: project });
            } else {
                res.status.json({ msg: `Cannot find project with id of "${id}"` })
            }
        } else {
            const projects = await Project.find({})

            if (projects) {
                res.status(200).json({ msg: "All Projects found", data: projects });
            } else {
                res.status(200).json({ msg: "No project found" })
            }
        }
    } catch (err) {
        console.log("Error in getProject controller : ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateProject = async (req, res) => {
    try {
        const { facultyName, title, funding, duration, organisation, department, type, id } = req.body;

        if (!id) {
            throw new Error("id of project required");
        }

        const project = await Project.findByIdAndUpdate(
            id,
            {
                facultyName,
                title,
                funding,
                duration,
                organisation,
                department,
                type
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (project) {
            res.status(200).json({ msg: "Project updated successfully", data: project });
        } else {
            res.status(200).json({ msg: `Project with id ${id} does not exist` })
        }
    } catch (err) {
        console.log("Error in updateProject controller : ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            throw new Error("id required to delete project");
        }

        const project = await Project.findByIdAndDelete(id)

        if (project) {
            res.status(200).json({ msg: "Project deleted successfully", data: project })
        } else {
            res.status(200).json({ msg: `No project with id ${id} found` })
        }
    } catch (err) {
        console.log("Error in deleteProject controller : ", err.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { addProject, getProject, updateProject, deleteProject };
