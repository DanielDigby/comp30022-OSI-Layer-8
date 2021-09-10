import mongoose from "mongoose";

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePic: string;
    colourScheme: string;
    tags: Array<string>;
}

const userSchema = new mongoose.Schema<IUser>({
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

const User = mongoose.model<IUser>("User", userSchema);

module.exports = User;
