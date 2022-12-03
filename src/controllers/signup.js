const crtl = {}
const path = require("path");
const { randomNumber } = require("../helpers/libs");
const bcry = require('bcryptjs')
const fs = require("fs-extra");
const passport = require('passport')
const {users} = require('../models/index')
const md5 = require('md5');
const { error } = require("console");





crtl.signupG = (req, res) =>{
    res.render('signup')
}



crtl.signupP =passport.authenticate('local-signup',{
    successRedirect:'/',
    failureRedirect:'/signup',
    passReqToCallback:true
})



module.exports = crtl 