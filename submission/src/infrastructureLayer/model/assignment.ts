import mongoose, { Document, Schema } from 'mongoose';


interface IQuiz {
  question: string;
  answers: string[];
}

export interface IAssignment extends Document {
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
}

const submissionSchema = new Schema<IAssignment>({
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
});

const AssignmentModel = mongoose.model<IAssignment>('Submission', submissionSchema);

export default AssignmentModel;
