import mongoose, { Document, Schema } from 'mongoose';


interface IAssigment extends Document {
    assigmentType: "Assignment" | "Quiz" | "Announcement" | "Question" | "Material" | "Others";
    mainTopic: string;
    dueDate: {
        day: string;
        time: string;
    };
    class_id: Schema.Types.ObjectId;
    students: string[];
}


const assignmentSchema = new Schema<IAssigment>({
    assigmentType: {
        type: String,
        enum: ["Assignment", "Quiz", "Announcement", "Question", "Material", "Others"],
        required: true
    },
    mainTopic: {
        type: String,
    },
    dueDate: {
        day: {
            type: String,
           
        },
        time: {
            type: String,
           
        }
    },
    
    class_id: {
        type: Schema.Types.ObjectId,
        required: true
    },

    students: [
        {
            type: String
        }
    ]
});

const Assignment = mongoose.model<IAssigment>('Assignment', assignmentSchema);

export default Assignment;
