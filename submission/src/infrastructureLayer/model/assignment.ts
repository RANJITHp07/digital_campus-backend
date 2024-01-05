import mongoose, { Document, Schema } from 'mongoose';


interface IQuiz {
  question: string;
  answers: string[];
}

export interface IAssignmentModel extends Document {
  assignment_id: string;
  students:string[],
  dueDate: {
    day: string;
    time: string;
    timer: string[];
  };
  polling: {
    answers: string[];
    polling:number[]
  };
  quiz: IQuiz[];
  points: number;
}

const submissionSchema = new Schema<IAssignmentModel>({
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
    polling: {
      type: [String],
    }
  },
  quiz: {
    type: [
      {
        question: {
          type: String,
        },
        answers: {
          type: [Number],
        },
      },
    ],
  },
  points: {
    type: Number,
  },
});

const AssignmentModel = mongoose.model<IAssignmentModel>('Submission', submissionSchema);

export default AssignmentModel;
