const express = require("express");
const { homepage, userSignUp, userSignIn } = require("../controllers/indexController");
const router = express.Router();

/**
 *  @method GET
 *  @route  /
 *  @access Public
 *  @desc   For showing Home Page
 */
router.get("/", homepage);

/**
 *  @method POST
 *  @route  /signup
 *  @access Public
 *  @desc   Route for handling user sign up request from the frontend.
 */
router.post("/signup", userSignUp);

/**
 * @method  POST
 * @route   /signin
 * @access  Public
 * @desc    For handling User Sign In Requests From The Front End.
 */
router.post("/signin", userSignIn);

/**
 * @method
 * @route
 * @access
 * @desc
 */

module.exports = router;
