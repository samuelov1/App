import express from "express";
import DB from "./DB";
import dotenv from "dotenv";
import missionRoutes from "./routes/missions";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/missions", missionRoutes);

const init = async () => {
  return DB.connect(
    { uri: process.env.MONGO_URI, db: process.env.DB_NAME },
    { useUnifiedTopology: true }
  ).then(() => {
    console.log(`MongoDB connected to ${process.env.MONGO_URI}`);

    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  });
};

module.exports = {
  app,
  init
};
