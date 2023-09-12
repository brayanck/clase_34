const helpers = {}
helpers.isAuthenticated=(req, res, next)=> {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/auth/login');
    }
}
helpers.isAuthenticatedUser=(req, res, next)=> {
    if (req.user.role=="user") {
        return next()
    } else {
        res.redirect('/perfil');
    }
}
helpers.isAuthenticatedAdmin=(req, res, next)=> {
    if (req.user.role=="admin") {
        return next()
    } else {
        res.redirect('/perfil');
    }
}
module.exports = helpers