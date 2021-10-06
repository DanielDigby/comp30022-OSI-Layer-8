import Joi from "joi";

export const postNoteSchema = Joi.object({
    _clientId: Joi.string().max(255).required(),
    title: Joi.string().max(255),
    text: Joi.string().max(5000),
    image: Joi.string().max(255),
    reminderTime: Joi.date(),
    eventTime: Joi.date(),
    pinned: Joi.bool(),
    tags: Joi.array().items(Joi.string().max(255)),
    relatedNotes: Joi.array().items(Joi.string().max(255)),
});

export const putNoteSchema = Joi.object({
    _id: Joi.string().max(255),
    _clientId: Joi.string().max(255).required(),
    user: Joi.string().max(255).required(),
    title: Joi.string().max(255),
    text: Joi.string().max(5000),
    image: Joi.string().max(255),
    reminderTime: Joi.date(),
    eventTime: Joi.date(),
    pinned: Joi.bool(),
    tags: Joi.array().items(Joi.string().max(255)),
    relatedNotes: Joi.array().items(Joi.string().max(255)),
});
