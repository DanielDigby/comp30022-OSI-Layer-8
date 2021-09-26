import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../../modules/user/userModel";
import { IRequestWithCookie } from "../../interfaces/expressInterfaces";
import express from "express";


export function validatePassword(password1: string, password2: string) {
    return bcrypt.compareSync(password1, password2);
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// Generate jwt object and encrypt to string
// TODO (Daniel) replace secret with an environment variable
export function generateJwt(user: IUser) {
    return jsonwebtoken.sign(
        {
            _id: user._id,
        },
        "secret"
    );
}

// Pull the encrypted Jwt string from request cookie
export function extractJwt(req: IRequestWithCookie) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

// Verify the jwt token
export function verifyJwt(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = extractJwt(req);

    if (token) {
        jsonwebtoken.verify(token, "secret", (err, decodedToken) => {
            if (err) {
                // Redirect to login page if the JWT is unauthenticated
                console.log(err);
                res.redirect('/login');
            } else {
                console.log(token);
                console.log(decodedToken);
                next();
            }
        })
    } else {
        // Redirect to login page if there no JWT
        res.redirect('/login');
    }
}
