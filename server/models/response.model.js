import mongoose from "mongoose"

const ResponseSchema = new mongoose.Schema({
    assessment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    responses: [
        {
            question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
            answer: { type: mongoose.Schema.Types.Mixed},
            isCorrect: {
                type: Boolean,
                default: false
            }
        }
    ],
    created_time: { type: Date, default: Date.now },
    duration: { type: Number }, 
    isCompleted: {
        type: Boolean
    },
    totalQuestion: Number,
    correctQuestion: Number
})

export default mongoose.model("Response", ResponseSchema)