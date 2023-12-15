const{blogSchema, reviewSchema} = require('./schema');


const validateBlog = (req, res, next) => {
    let{name, headline, comment} = req.body;
    let{error} = blogSchema.validate({name, headline, comment});
    if(error)
    {
        res.render('./blogs/error', {error})
    }
    else{
        next();
    }
}

const validateReview = (req, res, next) => {
    let{name, rating, comment} = req.body;
    let{error} = reviewSchema.validate({name, rating, comment});
    if(error)
    {
        res.render('./blogs/error', {error})
    }
    else{
        next();
    }
}

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated())
    {
        console.log(req.isAuthenticated());
        // req.flash('error', 'please login first!')
        return res.redirect('/login');
    }
    console.log(req.isAuthenticated());
    next();
};


module.exports = {validateBlog, validateReview, isLoggedIn};