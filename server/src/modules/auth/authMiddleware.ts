import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { extractJwt } from "../../helpers/security/index"

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
        // Redirect to login page if there is no JWT
        res.redirect('/login');
    }
}