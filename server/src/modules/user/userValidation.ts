import Joi from "joi";

export const putUserSchema = Joi.object({
    _id: Joi.string().max(255),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .max(254)
        .required(),
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    password: Joi.string().max(255),
    profilePic: Joi.string().max(255).required(),
    colourScheme: Joi.string().max(255).required(),
    tags: Joi.array().items(Joi.string().max(255)),
});
