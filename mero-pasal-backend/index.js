import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

//neighbor functions
import connectDB from "./configs/connectDB.js";

//routes
import authRoute from "./routes/auth.route.js";
import categoryRoute from "./routes/category.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT http://localhost:${PORT}`);
});
