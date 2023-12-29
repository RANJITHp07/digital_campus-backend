import mongoose, { Document, Model} from "mongoose";

export interface IUserModel extends Document {
username: string;
user_id:string;
profile:string;
}

const UserSchema = new mongoose.Schema<IUserModel>(

  {
    username: {
      type: String,
      required: true,
    },
    user_id:{
      type:String
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>("User", UserSchema);

export default UserModel;
