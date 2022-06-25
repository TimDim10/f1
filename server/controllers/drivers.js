const express = require("express");
const driver = express.Router();
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

driver.use(express.static("./public"));

driver.get("/:name", (req, res) => {
    const name = req.params.name;
    const obj = data2.drivers.filter((d) => {
        return d.name.split(" ").join("_") === name;
    });
    if (!obj[0].name) {
        next();
    }
    res.render("pages/index", { drivers: obj });
});

driver.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

driver.use(function (err, req, res, next) {
    res.status(404);
    res.send("Sorry, can't find that" + err.message);
});

module.exports = driver;
