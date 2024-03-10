// const express = require("express");
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan"
import authRoute from "./routes/authRoute.js"
import cors from "cors";
const app = express();

//config env 
dotenv.config();

//database config
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
    res.json("everything is fine")
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})