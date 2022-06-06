import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./src/routes/index.js";
import bodyParser from "body-parser";

config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", routes);

export default app;
