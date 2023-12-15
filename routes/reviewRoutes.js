const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Review = require('../models/Review');
const{validateReview} = require('../middleware');


router.post('/blogs/:id/reviews', validateReview, async(req, res) => {
    let{name, rating, comment} = req.body;
    let {id} = req.params;
    let blog = await Blog.findById(id);
    let newReview = new Review({name, rating, comment});
    await newReview.save();
    blog.reviews.push(newReview);
    await blog.save();
    res.redirect(`/blogs/${id}`);
});





module.exports = router;



















