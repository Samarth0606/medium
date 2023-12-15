const Joi = require('joi');

const blogSchema = Joi.object({
    name: Joi.string().required(),
    headline : Joi.string().required(),
    comment : Joi.string().required(),   
});

const reviewSchema = Joi.object({
    name: Joi.string().required(),
    rating : Joi.number().min(0).max(5).required(),
    comment : Joi.string().required()
});



module.exports = {blogSchema, reviewSchema};

