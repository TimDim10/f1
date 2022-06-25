const fs = require("fs");

exports.getData = async (file_path, callback) => {
    fs.readFile(file_path.toString(), "utf-8", callback);
};
