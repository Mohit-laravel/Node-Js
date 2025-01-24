const {Router} = require("express");
const router = Router();
const User = require("../models/user");

router.get('/signin', (req, res) => {
    res.render('signin');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.post('/signup', async (req, res) => {
    const {fullName, email, password} = req.body;
    const user = new User({fullName, email, password});
    await user.save();
    res.redirect('/');
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    const redirectUrl = req.query.redirect || '/'; // Default to home page if no redirect query
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie('token', token).redirect(redirectUrl);
    } catch (error) {
        return res.render('signin', {error: error.message});
    }
    
})

router.get('/signout', (req, res) => {
    res.clearCookie('token').redirect('/');
})

module.exports = router;