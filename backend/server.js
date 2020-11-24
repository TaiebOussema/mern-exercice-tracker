require('dotenv').config({ path: '.env' });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_CONN_URI;
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology : true}, (err) => {
    if (!err) {console.log("CONNECTION ESTABLISHED ! ")}
    else {console.log("CANNOT ESTABLISH CONNECTION " + err)};
});

const exercicesRouter = require("./routes/exercices");
const usersRouter = require("./routes/users");

app.use("/exercices", exercicesRouter);
app.use("/users", usersRouter);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
