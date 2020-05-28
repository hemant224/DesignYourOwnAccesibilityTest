const router = require("express").Router();
const passport = require("passport");

const frontURL = "https://designyourownaccesbilitytest.herokuapp.com";

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect(`${frontURL}`);
});

// auth with google+
router.get("/google/", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile"],
  })(req, res, next);
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect(`${frontURL}`);
});

router.get("/getUser", (req, res) => {
  return res.json(req.user || null);
});

module.exports = router;
