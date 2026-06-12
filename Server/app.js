const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config()
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://ajaia-assignment.vercel.app'], credentials: true }));
app.use(express.json());


app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/documents",
  require("./routes/documentRoutes")
);



const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})

module.exports = app;