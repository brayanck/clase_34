
const renderRegisterControllers = (req,res)=>{
    res.render("register", {});
}
const renderLoginControllers = (req, res) => {
    res.render("login", {});
  }
  const logoutControllers =  (req, res) => {
    req.logOut(() => {});
    res.redirect("/auth/login");
  }
module.exports={
    renderRegisterControllers,
    renderLoginControllers,
    logoutControllers
} 