import mongoose from 'mongoose';


const AssessmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Assessment name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  is_active: {
    type: Boolean,
    default: false
  },
  start_at: {
    type: Date,
    required: [true, 'Start date is required']
  },
  end_at: {
    type: Date,
    required: [true, 'End date is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration in minutes is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
  }],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Validate dates
// AssessmentSchema.pre('validate', function(next) {
//   if ((this).start_at >= (this).end_at) {
//     this.invalidate('end_at', 'End date must be after start date');
//   }
//   next();
// });

const Assessment = mongoose.model('Assessment', AssessmentSchema);
export default Assessment;