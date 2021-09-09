import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    password: string;
    profilePic: string;
    colourScheme: string;
    tags: Array<string>;
    generateHash(password: string): string;
    validatePassword(password: string): string;
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

// authentication
userSchema.methods.generateHash = function generateHash(password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const User = mongoose.model<IUser>("User", userSchema);

module.exports = User;
