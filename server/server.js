const express = require("express");
const PORT = 3000;
const app = express();
const data = require("./data");
let data2;
data.getData("./db/current_f1_drivers.json", (e, data) => {
    if (e) return console.log(e);
    data2 = JSON.parse(data);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/driver", require("./controllers/drivers"));
app.use("/team", require("./controllers/teams"));

app.get("/", (req, res) => {
    res.render("pages/index", data2);
});

app.listen(PORT, (e) => {
    console.log("App listening on port " + PORT);
});
