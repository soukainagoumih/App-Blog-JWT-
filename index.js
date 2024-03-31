const express = require("express");
const mongoose = require("mongoose");


const app = express();
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
app.use(express.json());



require("dotenv").config();
const PORT = process.env.PORT;
const URI = process.env.URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });


app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

