const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://admin:admin@omnistack10-qm1bp.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(8000);
