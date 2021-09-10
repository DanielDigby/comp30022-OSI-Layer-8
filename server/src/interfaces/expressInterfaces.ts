import { Request } from "express";
import { IUser } from "../modules/user/userModel";
export interface IRequestWithCookie extends Request {
    cookies: { [id: string]: string };
}

export interface IRequestWithUser extends Request {
    user: IUser;
}
