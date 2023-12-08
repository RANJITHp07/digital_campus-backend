import mongoose, { Document, Schema } from 'mongoose';

//mongoose interface for the classroom
interface IClassroom extends Document {
    className:string,
    classSection:string,
    classSubject:string,
    creator:string,
    students_enrolled:[string],
    admins:[string],
    classCode:string,
    backgroundPicture:string,
    themeColor:string,
    category:string,
    block:boolean
}

const classroomSchema = new Schema<IClassroom>({
    className: {
      type: String,
      required: true
    },
    classSection: {
      type: String,
      required: true
    },
    classSubject: {
      type: String,
      required: true
    },
    creator:{
      type:String,
      required:true
    },
    students_enrolled: [{
      type: String
    }],
    admins: [{
        type: String
     }],
    classCode: {
        type: String,
        unique:true
      },
      backgroundPicture: {
        type: String,
      },
      themeColor:{
        type: String,
        default:'#3b6a87'
      },
      category:{
        type:String
      },
      block:{
        type:Boolean,
        deafult:false
      }
    });     

const classroomModel = mongoose.model<IClassroom>('Classroom', classroomSchema);

export default classroomModel;    