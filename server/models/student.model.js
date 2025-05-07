import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  groups: [{
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    },
    joined_at: {
      type: Date,
      default: Date.now
    }
  }],
  responses: [{
    response_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    },
    given_at: {
        type: Date, 
        default: Date.now
    }
  }],
  refresh_tokens: [{
    token: {
      type: String,
      required: true
    },
    device_type: {
      type: String,
      default: 'web'
    },
    expires_at: {
      type: Date,
      required: true
    }
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});



const Student = mongoose.model('Student', StudentSchema);
export default Student;