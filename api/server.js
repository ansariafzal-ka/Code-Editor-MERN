require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const connectDb = require("./src/config/mongodb.config");
const codeRouter = require("./src/routes/code.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use("/api/v1/code", codeRouter);

connectDb();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
