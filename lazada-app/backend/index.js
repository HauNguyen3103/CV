// Dependencies: Nodemon, Cors, Body-parser, Router

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./components/routes/router.js");
const bodyParser = require("body-parser");
const admin_router = require("./routes/admin_router");

dotenv.config();

const connectDB = require("./components/configs/db.js");
connectDB();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/admin", admin_router);
routes(app);

app.listen(port, () => {
  console.log(`Express App is listening on port ${port}`);
});