import mongoose, { Document, Schema } from 'mongoose';

interface IAssignment extends Document {
    assignmentType: "Assignment" | "Quiz" | "Announcement" | "Question" | "Material" | "Polling";
    mainTopic: string;
    dueDate: {
        day: string;
        time: string;
    };
    title: string;
    class_id: string[];
    students: string[];
    instruction?: string;
    points:number;
    attachment?: {
        type: string;
        content: string;
    };
    creator:string
    polling:{
    answers:string[],
    polling:number[]
    }
}

const assignmentSchema = new Schema<IAssignment>({
    assignmentType: {
        type: String,
        enum: ["Assignment", "Quiz", "Announcement", "Question", "Material", "Polling"],
        required: true,
    },
    mainTopic: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    dueDate: {
        day: {
            type: String,
            
        },
        time: {
            type: String,
            
        },
    },
    class_id: {
        type: [String],
        required: true,
    },
    students: {
        type: [String],
        required: true,
    },
    points:{
        type:Number
    },
    instruction: {
        type: String,
    },
    attachment: {
        type: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    creator:{
        type:String,
        required:true
    },
    polling:{
        answers: {
            type: [String],
        },
        polling: {
            type: [Number],
        },
        }
},{
    timestamps:true
}
);

const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);

export default Assignment;