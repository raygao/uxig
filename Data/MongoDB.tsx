import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

const mongoConnectionString = Deno.env.get("mongoConnectionString")!;

console.log("The MongoDB connection string is: "+ mongoConnectionString);

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
