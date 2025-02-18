const Faculty = require("../models/faculty");

const addFaculty = async (req, res) => {
    try {
        const { name, post, linkedin, imageUrl, department, departmentCode, isHod } = req.body;

        const faculty = await Faculty.create({
            name,
            imageUrl,
            post,
            linkedin,
            department,
            departmentCode,
            isHod
        });

        if (faculty) {
            res.status(200).json({ msg: "Faculty added successfully", data: faculty });
        } else {
            throw new Error("Error adding new Faculty");
        }
    } catch (err) {
        console.log("Error in addFaculty controller : ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getFaculty = async (req, res) => {
    try {
        const { dept, id } = req.query
        if (dept) {
            const facultyList = await Faculty.find({ departmentCode: dept });

            if (facultyList) {
                res.status(200).json({ msg: "Faculty List found", data: facultyList });
            } else {
                res.status.json({ msg: `Cannot find faculty with department code of "${dept}"` })
            }
        } else if (id) {
            const faculty = await Faculty.findById(id);

            if (faculty) {
                res.status(200).json({ msg: "Faculty found", data: faculty });
            } else {
                res.status.json({ msg: `Cannot find faculty with id of "${id}"` })
            }
        } else {
            const faculties = await Faculty.find({})

            if (faculties) {
                res.status(200).json({ msg: "All Faculties found", data: faculties });
            } else {
                res.status(200).json({ msg: "No faculties found" })
            }
        }
    } catch (err) {
        console.log("Error in getFaculty controller : ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateFaculty = async (req, res) => {
    try {
        const { name, post, linkedin, imageUrl, department, departmentCode, id, isHod } = req.body;

        if (!id) {
            throw new Error("id of faculty required");
        }

        const faculty = await Faculty.findByIdAndUpdate(
            id,
            {
                name,
                imageUrl,
                post,
                linkedin,
                department,
                departmentCode,
                isHod
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (faculty) {
            res.status(200).json({ msg: "Faculty updated successfully", data: faculty });
        } else {
            res.status(200).json({ msg: `Faculty with id ${id} does not exist` })
        }
    } catch (err) {
        console.log("Error in updateFaculty controller : ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteFaculty = async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            throw new Error("id required to delete faculty");
        }

        const faculty = await Faculty.findByIdAndDelete(id)

        if (faculty) {
            res.status(200).json({ msg: "Faculty deleted successfully", data: faculty })
        } else {
            res.status(200).json({ msg: `No faculty with id ${id} found` })
        }
    } catch (err) {
        console.log("Error in deleteFaculty controller : ", err.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { addFaculty, getFaculty, updateFaculty, deleteFaculty };
