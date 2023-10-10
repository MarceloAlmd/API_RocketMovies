require("express-async-errors");

const express = require("express");
const uploadsConfig = require("./configs/uploads");
const routes = require("./routes");
const serverError = require("./utils/serverError");
const sqliteConnection = require("./database/sqlite");
const app = express();
sqliteConnection();
app.use(express.json());
app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER));
app.use(routes);

app.use((error, request, response, next) => {
  serverError(error, request, response, next);
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`));
