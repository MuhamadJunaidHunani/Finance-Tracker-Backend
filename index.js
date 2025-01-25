const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./Services/ConnectDb");
const app = express();
const { routes } = require("./Routes/Routes");

dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;
const URI = process.env.MONGO_URI;

connectDb(URI);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}/`);
  });
}

module.exports = app;
