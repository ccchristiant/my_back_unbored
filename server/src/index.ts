import express from "express";
import mongoose, { ConnectOptions }  from "mongoose";
import { auth } from "./routes/Auth";
import bodyparser from "body-parser"

const app = express();
const port = 8888;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.use(auth)

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://db:27017/unbored", {useNewUrlParser: true,useUnifiedTopology: true} as ConnectOptions)
.then(() => {
    console.log("connected to database");
})
.catch((error) => {
    console.log(error);
});

app.listen(port, function () {
    console.log("app listening on port", port);
});
