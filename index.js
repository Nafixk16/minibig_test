const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { verifyUser } = require("./base_routes/controller");
const closedRoutes = require("./base_routes/close_route");
const openRoutes = require("./base_routes/open_route");
const { handleError } = require("./app_modules/error_handler/errorHandler");

dotenv.config();
app.use(express.json());
app.use(openRoutes);
app.use(verifyUser, closedRoutes);
app.use((err, req, res, next) => {
  handleError(err, res, next);
});

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("DB connected ..");
});

PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("server listening " + PORT));
