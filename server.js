require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const mongoUrl = process.env.DATABASE_URL;
const db = require("./models");
const Role = db.role;

const corsOptions = {
  origin: `${process.env.ORIGIN_URL}:${process.env.PORT}`
}

// Mongo
db.mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((() => {
  console.log("Succesfully connect to MongoDB.")
  initial();
})).catch(error => {
  console.error("Connect errro", error);
  process.exit();
})

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({ name: "user" }).save();
      console.log("added 'user' to roles collection");

      await new Role({ name: "moderator" }).save();
      console.log("added 'moderator' to roles collection");

      await new Role({ name: "admin" }).save();
      console.log("added 'admin' to roles collection");
    }
  } catch (err) {
    console.log("error", err);
  }
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/lists.routes')(app);
require('./routes/task.routes')(app);

app.listen(process.env.PORT, () => {
  console.log(`Sever Satrted at ${process.env.PORT}`);
})