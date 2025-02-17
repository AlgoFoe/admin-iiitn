const express = require("express");
const { addFaculty, getFaculty, updateFaculty, deleteFaculty } = require("../controllers/faculty.controller");

const router = express.Router();

router.post("/faculty", addFaculty);
router.get("/faculty", getFaculty);
router.put("/faculty", updateFaculty);
router.delete("/faculty", deleteFaculty);

module.exports = router;
