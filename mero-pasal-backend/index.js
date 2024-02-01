import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

//neighbour functions
import connectDB from "./configs/connectDB.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT http://localhost:${PORT}`);
});
