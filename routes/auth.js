const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authControllers");

router.get("/login", authController.openLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (res, req) {
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect('/');
})

module.exports = router;
