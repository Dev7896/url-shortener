const mongoose = require("mongoose");

async function dbconfig(dburl) {
  return mongoose
    .connect(dburl)
    .then((result) => {
      console.log("database connected ");
    })
    .catch((err) => console.log(err.stack));
}

module.exports = dbconfig ;