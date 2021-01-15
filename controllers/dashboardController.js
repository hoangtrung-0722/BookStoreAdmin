module.exports.dashboard = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  } else {
    res.render("dashboard", { title: "Admin" });
  }
};
