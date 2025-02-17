const mongoose = require("mongoose"); // Use require instead of import

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: false,
    },
    post: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    departmentCode: {
        type: String,
        required: true,
    }
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
