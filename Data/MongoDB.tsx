import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

const mongoConnectionString = Deno.env.get("mongoConnectionString")!;
console.log("mongo connection string is: "+ mongoConnectionString);

// Connecting to a Mongo Atlas Database, tls should be false for the local system
export async function getMongoConnection() {
  const client = new MongoClient();
  await client.connect(mongoConnectionString);
  // await client.connect({
  //   db: "uxig",
  //   tls: false,
  //   servers: [
  //     {
  //       host: "127.0.0.1",
  //       port: 27017,
  //     },
  //   ],
  //   credential: {
  //     username: "ray",
  //     password: "ray",
  //     db: "uxig",
  //     mechanism: "SCRAM-SHA-1",
  //   },
  // });
  return client;
}

// // Defining schema interface
// interface UserSchema {
//   _id: ObjectId;
//   username: string;
//   password: string;
// }

// const clientx = await getMongoConnection();
// const db = clientx.database("uxig");
// const users = db.collection<UserSchema>("users");

// const insertIds = await users.insertMany([
//   {
//     username: "user1",
//     password: "pass1",
//   },
//   {
//     username: "user2",
//     password: "pass2",
//   },
// ]);

// console.log("finished inserting: " + insertIds);