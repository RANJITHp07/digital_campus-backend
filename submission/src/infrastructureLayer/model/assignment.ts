import mongoose, { Document, Schema } from 'mongoose';


interface IQuiz {
  question: string;
  answers: string[];
}

export interface IAssignmentModel extends Document {
  students:string[],
  dueDate: {
    day: string;
    time: string;
    timer: string[];
  };
  polling: {
    answers: string[];
    polling:string[]
  };
  quiz: IQuiz[];
  points: number;
}

const assignmentSchema = new Schema<IAssignmentModel>({
  students:{
    type:[String]
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
          type: [String],
        },
      },
    ],
  },
  points: {
    type: Number,
  },
});

const AssignmentModel = mongoose.model<IAssignmentModel>('Assignment', assignmentSchema);

export default AssignmentModel;
