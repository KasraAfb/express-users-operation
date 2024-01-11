import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

//Routes Path
import userRoutes from "./routes/userRoutes.js";

//dotenv
dotenv.config();

//Rest object
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//API routes
app.use("/user", userRoutes);

const port = process.env.PORT || 3001;

//listen server
app.listen(port, () => console.log(`server on ${port}`));
