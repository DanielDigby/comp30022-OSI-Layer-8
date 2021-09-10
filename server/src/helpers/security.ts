import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../modules/user/userModel";
import { IRequestWithCookie } from "../interfaces/expressInterfaces";

// Pull the Jwt cookie from request headers
export function extractJwt(req: IRequestWithCookie) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

export function validatePassword(password1: string, password2: string) {
    return bcrypt.compareSync(password1, password2);
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function generateJwt(user: IUser) {
    return jsonwebtoken.sign(
        {
            _id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET
    );
}
