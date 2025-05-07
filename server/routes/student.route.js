import express from "express";
import Student from "../models/student.model";
import Assessment from "../models/assessment.model";

const router = express.Router();

router.get("/all/assessment", (req, res) => {
    Assessment.find()
        .then(assessments => {
            res.status(200).json({ assessments });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch assessments", details: err.message });
        });
})

export default router;