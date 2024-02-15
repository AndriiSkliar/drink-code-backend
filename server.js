const mongoose = require("mongoose");

const app = require("./app");
const DB_HOST =
  "mongodb+srv://Team:PArgC8VFB66hSuXM@drinkcode.d6eetf3.mongodb.net/cocktails_creator?retryWrites=true&w=majority";
const PORT = 3000;
// const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
