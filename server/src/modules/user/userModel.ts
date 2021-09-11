import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePic: string;
    colourScheme: string;
    tags: Array<string>;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    colourScheme: {
        type: String,
        enum: ["PLACEHOLDER"],
        required: true,
        default: "PLACEHOLDER",
    },
    tags: {
        type: [String],
        required: true,
        default: [],
    },
});

const User = model<IUser>("User", userSchema);

module.exports = User;
