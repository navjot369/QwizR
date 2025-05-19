import express from "express";
import Student from "../models/student.model.js";
import Tutor from "../models/tutor.model.js";
import Question from "../models/question.model.js";
import Assessment from "../models/assessment.model.js";
const router = express.Router();

router.get("/stillLogin", (req, res) => {
    return res.status(200).send("User is still loggedIn");
});

router.post("/new/question", async (req, res) => {
    const tutorId = req.body.tutorId;
    const question = req.body.question;
    console.log(question);

    try {
        const res = await Question.create({...question, owner: tutorId});
        
        console.log(res);
    } catch(err) {
        console.log(err);
    }

    res.send(tutorId);
});

router.get("/view/questions", async (req, res) => {
    const tutorId = req.body.tutorId;
    if(!tutorId) {
        return res.status(400).send("Bad request");
    }

    let data;
    try {
        data = await Question.find({owner: tutorId}, "-owner").lean();
        if(!data) {
            return res.status(404).send("No data found");
        }

    } catch {
        return res.status(500).send("Internal Server Error");
    }

    res.status(200).json(data);
});

router.post("/new/assessment", async (req,res) => {
    console.log(req.body);
    try {
        const {
        name,
        description,
        is_active,
        start_at,
        end_at,
        duration,
        sections,
      } = req.body;
      const created_by = req.body.tutorId;
  
      // Validate required fields if not handled by schema
      if (!name || !start_at || !end_at || !duration || !created_by) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newAssessment = new Assessment({
        name,
        description,
        is_active,
        start_at,
        end_at,
        duration,
        sections,
        created_by
      });
  
      await newAssessment.save();
      return res.status(201).json({ message: 'Assessment created', assessment: newAssessment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
})

router.get("/view/assessments", async (req, res) => {
    const tutorId = req.body.tutorId;
    if (!tutorId) {
        return res.status(400).send("Bad request 1");
    }

    const assessmentId = req.query.assessmentId;
    if(assessmentId) {
        try {
            const assessment = await Assessment.findOne({ _id: assessmentId, created_by: tutorId }).lean();
            if (!assessment) {
                return res.status(404).send("Assessment not found");
            }
            const questionArr = await Question.find({ _id: { $in: assessment.questions } }).lean();
            assessment.questionArr = questionArr;
            return res.status(200).json(assessment);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    try {
        const assessments = await Assessment.find({ created_by: tutorId }).lean();
        if (!assessments || assessments.length === 0) {
            return res.status(404).send("No assessments found");
        }

        res.status(200).send(assessments);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/update/assessment", async (req, res) => {
    const { assessmentId, updatedQuestions } = req.body;

    if (!assessmentId || !updatedQuestions || !Array.isArray(updatedQuestions)) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    try {
        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        assessment.questions = updatedQuestions;

        await assessment.save();
        return res.status(200).json({ message: "Assessment updated successfully", assessment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get("/view/section/questions", async (req, res) => {
    const { sectionId, assessmentId } = req.query;
    console.log("hrer")

    if (!sectionId || !assessmentId) {
        return res.status(400).json({ message: "Missing sectionId or assessmentId" });
    }

    try {
        const assessment = await Assessment.findById(assessmentId).lean();
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        const section = assessment.sections.find(
            (sec) => sec._id.toString() === sectionId
        );
        if (!section) {
            return res.status(404).json({ message: "Section not found in the assessment" });
        }

        const questions = await Question.find({ _id: { $in: section.questions } }).lean();
        return res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get("/dashboard/stats", async (req, res) => {
    const tutorId = req.body.tutorId;

    if (!tutorId) {
        return res.status(400).json({ message: "Missing tutorId" });
    }

    try {
        const questionCount = await Question.countDocuments({ owner: tutorId });
        const assessmentCount = await Assessment.countDocuments({ created_by: tutorId });
        const totalStudents = await Student.countDocuments({});

        return res.status(200).json({
            questionCount,
            assessmentCount,
            totalStudents
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
export default router;