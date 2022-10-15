const passport=require("passport")
const GOOGLE_CLIENT_ID="741029355266-7vppjr34t7po8b3d8n48ie4pmdkg53ib.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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";
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   done(null,profile)
  }
));

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})
