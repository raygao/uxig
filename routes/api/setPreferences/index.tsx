// routes/api/genStory/index.tsx
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Bson, ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { getMongoConnection } from "../../../Data/MongoDB.tsx";

interface Preferences {
  id: number;
  StoryCopies: number;
  StoryLength: number;
  StorySteps: number;
  Sentiment: string;
  Regeneraton: number;
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

// Create initial database connection to mongoDB
const con = await getMongoConnection();
const db = con.database("uxig");

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp =
      "This is the Get method of the setPreferences. Nothing special. Use the Post Method and set wtih parameters.";
    const url = new URL(req.url);

    return new Response(resp);
  },
  async POST(req, ctx) {
    //const url = new URL(req.url);
    if (req.body) {
      const body = await req.text();
      if (body != "") {
        console.log("Body from the Request:", body);
        const preferences = JSON.parse(body);
        console.log(preferences);

        const resultID = await savePreferences(preferences);
        return new Response(resultID);
      } else {
        const noPrefernces = "You have not provided any Preference parameters.";
        return new Response(noPrefernces);
      }
    } else {
      const noPrefernces = "This is the POST method of the setPreferences. ";
      return new Response(noPrefernces);
    }
  },
};
// call ChatGPT to get generated story...
async function savePreferences(prefs: JSON) {
  const preferences = db.collection<PreferencesSchema>("Preferences");
  try {
    if (prefs.Preferences.PreferenceID == '' || prefs.Preferences.PreferenceID == null ) {
      // insert if this is a new preference, no previous id given or it is a blank space
      const insertedID = await preferences.insertOne(
        {
          "StoryCopies": prefs.Preferences.StoryCopies,
          "StoryLength": prefs.Preferences.StoryLength,
          "StorySteps": prefs.Preferences.StorySteps,
          "Sentiment": prefs.Preferences.Sentiment,
          "Regeneration": prefs.Preferences.Regeneration,
        },
      );
      console.log("Created Preference with ID: " + insertedID);
      return insertedID;
    } else {
      // update an existing preference
        const updatedInfo = await preferences.updateOne(
          {_id: new Bson.ObjectId(prefs.Preferences.PreferenceID) },
          { $set: { ...prefs.Preferences, updatedAt: new Date ()} },
              { ignoreUndefined: true},
        );
        console.log("Updated Preference with ID: " + prefs.Preferences.PreferenceID);
        return prefs.Preferences.PreferenceID;
    }
  } catch (e) {
    console.log(e);
    return "error in calling setPreferens";
  }
}
