import { Request, Response } from "express";
import { IUser } from "../modules/user/userModel";

export interface IRequestWithCookie extends Request {
    cookies: { [id: string]: string };
}

export interface IRequestWithUser extends Request {
    user: IUser;
}

export interface IResponseWithUser extends Response {
    user: IUser;
}
