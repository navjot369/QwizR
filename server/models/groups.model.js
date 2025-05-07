import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
  byTutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
});


const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    admin: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Tutor" 
    }],
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student"
     }],
    description: { type: String },
    messages: [messageSchema],
    assessments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment"
    }],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
