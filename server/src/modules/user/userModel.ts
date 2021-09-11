import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    password: string;
    profilePic: string;
    colourScheme: string;
    tags: Array<string>;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    colourScheme: {
        type: String,
        enum: ["PLACEHOLDER"],
        default: "PLACEHOLDER",
    },
    tags: {
        type: [String],
        required: true,
    },
});

const User: Model<IUser> = model<IUser>("User", userSchema);

module.exports = User;
