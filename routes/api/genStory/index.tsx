// routes/api/genStory/index.tsx
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

const apiKey = "my secret key";
//const openAI = new OpenAI(Deno.env.get("apiKey")!);
const openAI = new OpenAI(apiKey);

interface Story {
  id: number;
  scenario: string;
  content: string;
}

const SCENARIO =
  "write me two 50 words story with positive sentiment, where David (the person) - how learns a new language in 30 days. The generated story should be no more than 5 steps in complexity.";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp =
      "This is the Get method of the genStory. Nothing special. Use Post Method instead with parameters.";
    const url = new URL(req.url);

    return new Response(resp);
  },
  async POST(req, ctx) {
    //const url = new URL(req.url);
    if (req.body) {
      const body = await req.text();
      if (body != "") {
        console.log("Body from the Request:", body);
        const response = new Response("anything"); //not calling genStory works.
        const results = await genStory(body); // The offending line.
        return results;
        
        // var results = await genStory(body).then(() => {
        //   const response = new Response("anything");
        //   return response;
        // });
        // const resultStory = await genStory(body).then(
        //   function(e) {console.log("returning generated story now... ")});
        // console.log("returning generated story now... " + resultStory
        // const response = new Response(resultStory);
        // const response = new Response('abcdefghijkl');
        // return response;

      } else {
        const blankStory = "You have entered a blank scenario";
        return new Response(blankStory);
      }
    } else {
      const blankStory = "This is the POST method of the genStory. ";
      return new Response(blankStory);
    }
  },
};

// Avoiding Async call, due to async backend call reason
// export const handler = async (_req: Request): Promise<Response> => {
//   const url = new URL(_req.url);
//   let body = _req.body?.getReader();
//   console.log(body);
//   const resp1 = await genStory(SCENARIO);
//   console.log("returning generated story now...");
//   return new Response(resp1);
// };

// call ChatGPT to get generated story...
async function genStory(scenario: string) {
  try {
    console.log("BEFORE OPENAI call.");
    const chatCompletion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": scenario },
      ],
    });
    console.log("OPENAI call completed.");
    return JSON.stringify(chatCompletion.choices[0].message.content);
  } catch (e) {
    console.log(e);
    return "error in calling genstory";
  }

  //console.log(chatCompletion.choices);
  // console.log(chatCompletion.choices[0].message);
  // see https://platform.openai.com/docs/guides/gpt/chat-completions-api, about Python hint -> returns response['choices'][0]['message']['content']
  //should try to break into Story by the '\n\nStory #:"" separation point.
  // return JSON.stringify(chatCompletion.choices[0].message.content);
}
