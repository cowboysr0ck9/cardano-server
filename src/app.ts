import express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { ROUTES } from "./routes";

const app = express();
const PORT = process.env.NODE_ENV || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// load our API routes
app.use("/api/v1", [...ROUTES]);

async function main() {
  const srv = `${process.env.MONGODB_SRV_URI}` || "";
  if (!srv) {
    throw Error("The MongoDb connection string cannot be left empty");
  }
  const mongodb = new MongoClient(srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await mongodb.connect();

    // Make the appropriate DB calls
    const databasesList = await mongodb.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
  } catch (e) {
    console.error(e);
  }
}

// establish http server connection
app.listen(PORT, () => {
  main().catch(console.error);
  console.info(`Server running on port ${PORT}`);
});
