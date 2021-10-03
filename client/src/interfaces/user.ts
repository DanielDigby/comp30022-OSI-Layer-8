export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePic: string | null;
    colourScheme: string;
    tags: Array<string>;
}

export interface INewUser {
    email: string;
    firstName: string;
    lastName: string;
    password1: string;
    password2: string;
    profilePic: string | null;
}
