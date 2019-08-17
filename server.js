const express = require("express");
const hbs = require("hbs");
const fs = require("fs")

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("unable to append to server.log.");
    }
  });
  next();
});

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
    res.redirect("/home.html");
})

app.get("/home.html", (req, res) => {
  res.render("home.hbs", {
    active: { home: true }
  });
});

app.get("/resume.html", (req, res) => {
    res.render("resume.hbs", {
      active: { resume: true }
    });
  });

app.listen(port, () => {
  console.log(`Sever is up on port ${port}`);
});