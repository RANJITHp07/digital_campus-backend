import mongoose, { Document, Schema } from 'mongoose';

interface ISubmit {
  status: 'Late submitted' | 'Submitted' | 'Not Submitted';
  grade: number;
}

interface Iassignment extends Document {
  quizAnswers: string[][]; 
  pollingAnswers: string;
  assignment_id: string;
  attachment: {
    type: string;
    content: string;
  };
  submission: ISubmit;
  username: string;
  user_id:string
}

const submissionSchema = new Schema<Iassignment>({
  quizAnswers: {
    type: [[String]],
    
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
        enum: ['Late submitted', 'Submitted', 'Not Submitted'],
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
  user_id:{
    type:String,
    required:true
  }
});

const submissionModel = mongoose.model<Iassignment>('Submission', submissionSchema);

export default submissionModel ;
