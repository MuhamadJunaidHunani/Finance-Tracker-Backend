const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./Services/ConnectDb");
const app = express();
const { routes } = require("./Routes/Routes");

dotenv.config();
app.use(express.json());

const port = process.env.PORT;
const URI = process.env.MONGO_URI;

app.use("/api", routes);

app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(port, () => {
  console.log(`server is listeing on http://localhost:${port}/`);
  connectDb(URI);
});
