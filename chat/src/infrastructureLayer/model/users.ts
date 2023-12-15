import mongoose, { Document, Model} from "mongoose";

interface IUser extends Document {
username: string;
user_id:string;
profile:string;
}

const UserSchema = new mongoose.Schema<IUser>(

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

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
