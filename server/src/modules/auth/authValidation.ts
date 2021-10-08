import Joi from "joi";

// define schema for the post login route
export const loginSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .max(254)
        .required(),

    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .max(255)
        .required(),
});

// define schema for the post register
export const registerSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .max(254)
        .required(),

    password1: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .max(255)
        .required(),

    password2: Joi.string().valid(Joi.ref("password")).max(255).required(),

    firstName: Joi.string().max(255).required(),

    lastName: Joi.string().max(255).required(),

    profilePic: Joi.string().max(255).required(),
});
