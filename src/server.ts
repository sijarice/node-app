import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, world! From server file");
});

app.use("/api", router);

export default app;
