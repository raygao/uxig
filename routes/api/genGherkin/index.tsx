// routes/api/genStory/index.tsx
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai@1.4.2/mod.ts";
import { getMongoConnection } from "../../../Data/MongoDB.tsx";
const openAI = new OpenAI(Deno.env.get("chatGptKey")!);
import { Bson, ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
 
interface Story {
  id: number;
  scenario: string;
  content: string;
}

// DEFAULT
const SCENARIO =
  "write me two 50 words story with positive sentiment, where David (the person) - how learns a new language in 30 days. The generated story should be no more than 5 steps in complexity.";

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
      "This is the Get method of the genGherkin. Nothing special. Use Post Method instead with parameters.";
    const url = new URL(req.url);

    return new Response(resp);
  },
  async POST(req, ctx) {
    //const url = new URL(req.url);
    if (req.body) {
      const body = await req.text();
      const command = JSON.parse(body).command;
      if (command != "") {
        console.log("Command from the Request:", command);
        //check for preferences.
        const preferences = db.collection<PreferencesSchema>("Preferences");
        const PreferenceID = JSON.parse(body).PreferenceID;
        if (PreferenceID != null && PreferenceID != '{}') {
          // no associated preference set.
          const thePrefs =await preferences.findOne( {
            _id: new ObjectId(PreferenceID)
          });
          const fullCommand = "generate gherkin test for " + command + ' in , ' + thePrefs.StorySteps + ' steps'; 
          console.log("Generate Gherkin with preference enriched: " + fullCommand);
          const results = await genStory(fullCommand); 
          return new Response(results);
        } else {
          // No preference found
          const results = await genStory(command); 
          const defaultCommand = "generate gherkin test for " + command + ' in 5 steps'; 
          return new Response(defaultCommand);
        }
      } else {
        const blankGherkin = "You have entered a blank gherkin. Nothing to do (generate).";
        return new Response(blankGherkin);
      }
    } else {
      const blankGherkin = "This is the POST method of the genGherkin. ";
      return new Response(blankGherkin);
    }
  },
};

// call ChatGPT to get generated gehrkin...
async function genStory(command: string) {
  try {
    console.log("BEFORE OPENAI call.");
    const chatCompletion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": command },
      ],
    });
    const generatedContent = JSON.stringify(chatCompletion.choices[0].message.content);
    console.log("OPENAI call completed. With generated content: " + generatedContent);
    return generatedContent;
  } catch (e) {
    // console.log(e);
    return "error in calling genGherkin";
  }

}
