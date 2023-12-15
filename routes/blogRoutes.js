const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Trend = require('../models/trending');
const Review = require('../models/Review')
const {validateBlog, isLoggedIn} = require('../middleware');
router.use(express.urlencoded({extended: true}));

router.get('/blogs', async(req, res) => {
    let blogs = await Blog.find();
    let trends = await Trend.find();
    res.render('./blogs/index', {blogs, trends});
});


////////////////////////// DATE ///////////////////////////

let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getDate()
{
    let date = new Date().toJSON()
    let month = date.slice(5,7);
    let day = date.slice(8, 10);
    let str = months[month - 1] + ` ${day}`
    return str;
}


///////////// NEW /////////////

router.get('/blogs/new', (req, res) => {
    res.render('./blogs/new');
});

router.post('/blogs', validateBlog, isLoggedIn, async(req, res) => {
    let{name, org, headline, text,img, comment} = req.body;
    if(img === '')
    {
        img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI1DvemFDUdAtR8JBJ7lIKcNEBHAEI4_uNEA&usqp=CAU"
    }
    let date = getDate();
    await Blog.create({name, org, headline,text,date, img, comment});
    res.redirect('/blogs');

});

///////////////// SHOW /////////////////

router.get('/blogs/:blogID',  async(req, res) => {
    let{blogID} = req.params;
    let foundBlog = await Blog.findById(blogID).populate('reviews');
    res.render('./blogs/show', {foundBlog});
})





/////////////////// EDIT ///////////////////

router.get('/blogs/:blogID/edit', isLoggedIn, async(req, res) => {
    let{blogID} = req.params;
    let foundBlog = await Blog.findById(blogID);
    res.render('./blogs/edit', {foundBlog});
});

router.patch('/blogs/:blogID', validateBlog, isLoggedIn, async(req,res) => {
    let{blogID} = req.params;
    // console.log(req.body);
    let{org,headline,text,img,comment} = req.body;
    await Blog.findByIdAndUpdate(blogID, {org,headline,text,img,comment});
    res.redirect('/blogs');
});


////////////////////// DELETE /////////////////////

router.delete('/blogs/:blogID',  isLoggedIn, async(req,res) => {
    let{blogID} = req.params;
    await Blog.findByIdAndDelete(blogID);
    res.redirect('/blogs');
})









module.exports = router;