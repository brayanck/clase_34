const router = require("express").Router();
const passport = require("passport");
const { renderRegisterControllers, renderLoginControllers, logoutControllers } = require('../controllers/auth.controllers')



router.get("/register", renderRegisterControllers);
router.get('/login', renderLoginControllers);
router.get("/logout", logoutControllers);
router.post("/register/crear", passport.authenticate("local-register", {
    failureRedirect: "/auth/register",
    successRedirect: "/auth/login",
    passReqToCallback: true 
}));
router.post("/login/crear", passport.authenticate("local-login", {
    failureRedirect: "/auth/login",
    successRedirect: "/perfil",
    passReqToCallback: true
}))
router.get("/github", passport.authenticate("github", {
    scope: ["user:email"],
    session: false
}))
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: "/perfil",
    failureRedirect: '/'
}));
router.get('/user', (req,res)=>{
    res.json(req.user);
})


module.exports = router