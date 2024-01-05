import mongoose, { Document, Schema } from 'mongoose';

interface ISubmit {
  status: 'Late submitted' | 'Submitted' | 'Not Submitted';
  grade: number;
}

interface Iassignment extends Document {
  quizAnswers: string[]; // You may need to specify the correct type for quizAnswers
  pollingAnswers: string;
  assignment_id: string;
  attachment: {
    type: string;
    content: string;
  };
  submission: ISubmit;
  username: string;
}

const assignmentSchema = new Schema<Iassignment>({
  quizAnswers: {
    type: [String], // Adjust the type accordingly based on the actual type of quizAnswers
    
  },
  pollingAnswers: {
    type: String,
    
  },
  assignment_id: {
    type: String,
    required:true
  },
  attachment: {
    type: {
      type: String,
      
    },
    content: {
      type: String,
      
    },
  },
  submission: {
    type: {
      status: {
        type: String,
        enum: ['Late assignment', 'Submitted', 'Not Submitted'],
        default:'Not Submitted'
      },
      grade: {
        type: Number,
        
      },
    },
    
  },
  username: {
    type: String,
    
  },
});

const submissionModel = mongoose.model<Iassignment>('assignment', assignmentSchema);

export default submissionModel ;
