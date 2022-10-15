const router = require("express").Router();
const passport = require("passport");


const CLIENT_URL = "http://localhost:3000/";

router.get("/success", (req, res) => {
   
    res.status(200).json({
        success: true,
        message: "successfull",
        user: req,
        //   cookies: req.cookies
      });

});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router