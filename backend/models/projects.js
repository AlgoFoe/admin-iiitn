const mongoose = require("mongoose"); // Use require instead of import

const projectSchema = new mongoose.Schema({
    facultyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    funding: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    organisation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
