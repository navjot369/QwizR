import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["MCQ", "Drawing", "Matching", "Fill Ups", "Video"],
        required: true
    },
    title: {
        type: String, 
        trim: true
    },
    options: [String],
    correctOption: Number,
    matching: [Object],
    fillQuestion: String,
    fillAnswers: [String],
    marks: {
        type: Number,
        min: 0,
        max: 100
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "Tutor"
    }
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;

