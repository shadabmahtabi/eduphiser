const express = require('express');
const { homepage, userSignUp } = require('../controllers/indexController');
const router = express.Router()

// GET / - Home page
router.get('/', homepage)

// POST /signup
/*
    Route for handling user sign up request from the frontend.
*/
router.post( '/signup', userSignUp)

module.exports = router;
