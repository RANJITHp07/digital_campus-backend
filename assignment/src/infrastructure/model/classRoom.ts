import mongoose, { Document, Schema } from 'mongoose';

interface IClassroom extends Document {
    _id: Schema.Types.ObjectId;
    students_enrolled: string[];
    admin: string[];
}


const classroomSchema = new Schema<IClassroom>({
    _id: { type: Schema.Types.ObjectId,required:true},
    students_enrolled: {
        type: [String],
        required: true,
    },
    admin: {
        type: [String],
        required: true,
    },
});


const Classroom = mongoose.model<IClassroom>('Classroom', classroomSchema);

export default Classroom;
