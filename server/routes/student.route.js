import express from "express";
import Student from "../models/student.model.js";
import Assessment from "../models/assessment.model.js";
import Response from "../models/response.model.js";
import Question from "../models/question.model.js";

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

router.get("/assessment", async (req, res) => {
    const token = req.body.studentId;
    const {assessment_id} = req.query;

    try {
        if (!token || !assessment_id) {
            return res.status(400).json({ error: "Missing studentId or assessment_id" });
        }
        const responses = await Response.find({
            student_id: token,
            assessment_id
        });
        const assessment = await Assessment.findById(assessment_id);
        if(!assessment) {
            return res.status(404).send({message: "No assessment found"});
        }

        res.status(200).json({ responses, assessment });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch responses", details: err.message });
    }

})

router.post("/assessment/start", async (req, res) => {
    const { studentId, assessment_id } = req.body;

    if (!studentId || !assessment_id) {
        return res.status(400).json({ error: "Missing studentId or assessmentId" });
    }

    try {
        const assessment = await Assessment.findById(assessment_id);
        if (!assessment) {
            return res.status(404).json({ error: "Assessment not found" });
        }

        // console.log(assessment);

        // Assuming assessment.questions is an array of question objects with _id
        const responses = assessment.questions.map(q => ({
            question_id: q,
            answer: null
        }));

        const responseDoc = new Response({
            student_id: studentId,
            assessment_id,
            responses,
            isCompleted: false
        });

        const questionsArr = await Question.find({ _id: { $in: assessment.questions } });

        await responseDoc.save();

        res.status(201).json({questionsArr, response: responseDoc});
    } catch (err) {
        res.status(500).json({ error: "Failed to start assessment", details: err.message });
    }
});

router.patch("/update/response", (req, res) => {
    const {studentId, responseId, question, answer, isCorrect} = req.body;
    if (!studentId || !responseId || !question || !question._id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    Response.findOneAndUpdate(
        { _id: responseId, student_id: studentId, "responses.question_id": question._id },
        { $set: { "responses.$.answer": answer, "responses.$.isCorrect": isCorrect } },
        { new: true }
    )
    .then(updatedResponse => {
        if (!updatedResponse) {
            return res.status(404).json({ error: "Response not found" });
        }
        res.status(200).json({ message: "Answer updated", response: updatedResponse });
    })
    .catch(err => {
        res.status(500).json({ error: "Failed to update answer", details: err.message });
    });

})

router.post("/assessment/submit", (req, res) => {
    const { response_id } = req.body;

    if (!response_id) {
        return res.status(400).json({ error: "Missing response_id" });
    }

    Response.findById(response_id)
        .then(responseDoc => {
            if (!responseDoc) {
                return res.status(404).json({ error: "Response not found" });
            }
            const totalQuestion = responseDoc.responses.length;
            const correctQuestion = responseDoc.responses.filter(r => r.isCorrect === true).length;
            responseDoc.totalQuestion = totalQuestion;
            responseDoc.correctQuestion = correctQuestion;
            responseDoc.isCompleted = true;
            return responseDoc.save();
        })
        .then(savedResponse => {
            res.status(200).json({ message: "Assessment submitted", response: savedResponse });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to submit assessment", details: err.message });
        });
})

router.get("/responses/list", (req, res) => {
    const  student_id  = req.body.studentId;

    if (!student_id) {
        return res.status(400).json({ error: "Missing student_id" });
    }

    Response.find({ student_id })
        .then(async responses => {
            // Fetch all unique assessment_ids from responses
            const assessmentIds = [...new Set(responses.map(r => r.assessment_id.toString()))];
            // Fetch all assessments in one go
            const assessments = await Assessment.find({ _id: { $in: assessmentIds } }).lean();
            // Map assessment_id to assessment object
            const assessmentMap = {};
            assessments.forEach(a => {
                assessmentMap[a._id.toString()] = a;
            });
            // Attach assessment to each response
            const responsesWithAssessment = responses.map(r => {
                const responseObj = r.toObject();
                responseObj.assessment = assessmentMap[r.assessment_id.toString()] || null;
                return responseObj;
            });
            res.status(200).json({ responses: responsesWithAssessment });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch responses", details: err.message });
        });
})

router.get("/response", (req, res) => {
    const { response_id } = req.query;

    if (!response_id) {
        return res.status(400).json({ error: "Missing response_id" });
    }

    Response.findById(response_id)
        .then(async responseDoc => {
            if (!responseDoc) {
                return res.status(404).json({ error: "Response not found" });
            }
            // Get all question_ids from responses
            const questionIds = responseDoc.responses.map(r => r.question_id);
            // Fetch all questions in one go
            const questions = await Question.find({ _id: { $in: questionIds } }).lean();
            // Map question_id to question object for quick lookup
            const questionMap = {};
            questions.forEach(q => {
                questionMap[q._id.toString()] = q;
            });
            // Attach question to each response
            const responsesWithQuestions = responseDoc.responses.map(r => ({
                ...r.toObject(),
                question: questionMap[r.question_id.toString()] || null
            }));

            const assessment = await Assessment.findById(responseDoc.assessment_id).lean();

            res.status(200).json({
                response: {
                    ...responseDoc.toObject(),
                    responses: responsesWithQuestions,
                    assessment
                }
            });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch response", details: err.message });
        });
})

export default router;