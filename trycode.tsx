import { Bson, MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

// localhost
//const mongoConnectionString = "mongodb://{username}:{password}@127.0.0.1:27017/?authMechanism=SCRAM-SHA-1&authSource=uxig";

// mongo atlas, note authMechanism=SCRAM-SHA-1 is needed. otherwise, will get an error.
const mongoConnectionString = "mongodb+srv://{username}:{password}@uxig.wdkvebb.mongodb.net/?authMechanism=SCRAM-SHA-1&authSource=uxig&retryWrites=true&w=majority&authSource=uxig";
console.log("mongo connection string is: "+ mongoConnectionString);

// Connecting to a Mongo Atlas Database, tls should be false for the local system
export async function getMongoConnection() {
  const client = new MongoClient();
  await client.connect(mongoConnectionString);
//   await client.connect({
//     db: "uxig",
//     tls: false,
//     servers: [
//       {
//         host: "127.0.0.1",
//         port: 27017,
//       },
//     ],
//     credential: {
//       username: "ray",
//       password: "ray",
//       db: "uxig",
//       mechanism: "SCRAM-SHA-1",
//     },
//   });
  return client;
}

// for MongoDB
interface PreferencesSchema {
    _id: ObjectId;
    StoryCopies: number;
    StoryLength: number;
    StorySteps: number;
    Sentiment: string;
    Regeneration: number;
  }

const con = await getMongoConnection();
const db = con.database("uxig");
const preferences = db.collection<PreferencesSchema>("Preferences");
console.log(await preferences.findOne({_id: new ObjectId("64cfdaeb2d3acea679246893")}));
console.log(await preferences.findOne({_id: new ObjectId("64cfdaeb2d3acea67924689d")}));