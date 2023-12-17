import mongoose, { Document, Schema } from 'mongoose';

interface ISubmit {
  status: 'Late Submission' | 'Submitted' | 'Not Submitted';
  grade: number;
}

interface IQuiz {
  question: string;
  answers: string[];
}

export interface ISubmission extends Document {
  assignment_id: string;
  students:string[],
  dueDate: {
    day: string;
    time: string;
    timer: string[];
  };
  polling: {
    answers: string[];
  };
  quiz: IQuiz[];
  points: number;
  submission: ISubmit[];
}

const submissionSchema = new Schema<ISubmission>({
  assignment_id: {
    type: String,
  },
  dueDate: {
    day: {
      type: String,
    },
    time: {
      type: String,
    },
    timer: {
      type: [String],
    },
  },
  polling: {
    answers: {
      type: [String],
    },
  },
  quiz: {
    type: [
      {
        question: {
          type: String,
        },
        answers: {
          type: [String],
        },
      },
    ],
  },
  points: {
    type: Number,
  },
  submission: {
    type: [
      {
        status: {
          type: String,
          enum: ['Late Submission', 'Submitted', 'Not Submitted'] as const,
        },
        grade: {
          type: Number,
        },
      },
    ],
  },
});

const SubmissionModel = mongoose.model<ISubmission>('Submission', submissionSchema);

export default SubmissionModel;
