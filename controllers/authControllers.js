module.exports.openLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

module.exports.loginUser = (req, res) => {
  if (!req.user.isAdmin) {
    req.logOut();
  }
  console.log(req.user);
  res.render("login", {title: "Login"})
}
