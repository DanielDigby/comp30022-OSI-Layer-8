export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePic: string;
    colourScheme: string;
    tags: Array<string>;
}
