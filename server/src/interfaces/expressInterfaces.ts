import { Request } from "express";

export interface IRequestWithCookie extends Request {
    cookies: { [id: string]: string };
}
