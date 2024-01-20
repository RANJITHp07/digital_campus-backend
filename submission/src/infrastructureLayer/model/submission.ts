import mongoose, { Document, Schema } from 'mongoose';

interface ISubmit {
  status: 'Late submitted' | 'Submitted' | 'Not Submitted';
  grade: number;
}

export interface ISubmissionModel extends Document {
  quizAnswers: string[][];
  pollingAnswers: string;
  assignment: mongoose.Types.ObjectId; // Reference to Assignment model
  attachment: {
    type: string;
    content: string;
  };
  submission: ISubmit;
  username: string;
  user_id: string;
}

const submissionSchema = new Schema<ISubmissionModel>({
  quizAnswers: {
    type: [[String]],
  },
  pollingAnswers: {
    type: String,
  },
  assignment: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
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
        default: 'Not Submitted',
      },
      grade: {
        type: Number,
      },
    },
  },
  username: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const submissionModel = mongoose.model<ISubmissionModel>('Submission', submissionSchema);

export default submissionModel;
