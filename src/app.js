import express from "express";
import dotenv from "dotenv";
import signUpRoute from "./routes/signUpRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(signUpRoute);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));
