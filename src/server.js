require("express-async-errors");
require("dotenv/config");
const express = require("express");
const uploadsConfig = require("./configs/uploads");
const cors = require("cors");
const routes = require("./routes");
const serverError = require("./utils/serverError");
const sqliteConnection = require("./database/sqlite");
const app = express();
app.use(cors());
sqliteConnection();
app.use(express.json());
app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER));
app.use(routes);

app.use((error, request, response, next) => {
  serverError(error, request, response, next);
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`));
