const express = require("express");
const team = express.Router();
const data = require("../data");
let data2;
data.getData("./db/current_f1_drivers.json", (e, data) => {
    if (e) return console.log(e);
    data2 = JSON.parse(data);
});

function error(status, msg) {
    let err = new Error(msg);
    err.status = status;
    return err;
}
team.use(express.static("./public"));

team.get("/:team", (req, res) => {
    const team = req.params.team;
    const obj = data2.drivers.filter((d) => {
        return d.team.split(" ").join("_") === team;
    });
    if (!obj) {
        next();
    }
    res.render("pages/index", { drivers: obj });
});

team.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

team.use(function (err, req, res, next) {
    res.status(404);
    res.send("Sorry, can't find that" + err.message);
});

module.exports = team;
