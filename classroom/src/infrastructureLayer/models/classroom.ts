import mongoose, { Document, Schema } from "mongoose";

// Mongoose interface for the classroom
export interface IClassroomModel extends Document {
  className: string;
  classSection: string;
  classSubject: string;
  creator: string;
  students_enrolled: string[];
  admins: string[];
  classCode: string;
  backgroundPicture: string;
  themeColor: string;
  category: string;
  profile: string;
  block: boolean;
  request: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  reported?: boolean;
  reason?: Array<{
    title: string;
    description: string;
    reporter: string;
  }>;
  blockClassroom: boolean;
}

const classroomSchema = new Schema<IClassroomModel>({
  className: {
    type: String,
    required: true,
  },
  classSection: {
    type: String,
    required: true,
  },
  classSubject: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  students_enrolled: [
    {
      type: String,
    },
  ],
  admins: [
    {
      type: String,
    },
  ],
  classCode: {
    type: String,
    required:true,
    unique: true,
  },
  backgroundPicture: {
    type: String,
  },
  themeColor: {
    type: String,
    default: "#3b6a87",
  },
  category: {
    type: String,
  },
  profile: {
    type: String,
    default: "",
  },
  block: {
    type: Boolean,
    default: false,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  request: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
    },
  ],
  reason: [
    {
      title: {
        type: String,
        required:true
      },
      description: {
        type: String,
      },
      reporter: {
        type: String,
      },
    },
  ],
  blockClassroom: {
    type: Boolean,
    default: false,
  },
});


const classroomModel = mongoose.model<IClassroomModel>("Classroom", classroomSchema);

export default classroomModel;
