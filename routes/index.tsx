import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import GenStory from "../islands/GenStory.tsx";
import Preferences from "../islands/Preferences.tsx";
import { getMongoConnection } from "../Data/MongoDB.tsx";
import { Bson, ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

// default text, if no Patron is available.
const GUEST = "{GUEST}";

//For the Web app
interface Patron {
  Name: string;
}

// for MongoDB
interface PatronSchema {
  _id: ObjectId;
  name: string;
}

// Create initial database connection to mongoDB
const con = await getMongoConnection();
const db = con.database("uxig");

// main code
export const handler: Handlers<Patron> = {
  // Get method only used for the initial page load
  async GET(req, ctx) {
    const url = new URL(req.url);
    const input = url.searchParams.get("patron") || "";
    // console.log("Patron's name is: " + input);
    return ctx.render({ Name: input });
  },
  // POST is used for the form post, to create a Patron in the MongoDB
  async POST(req, ctx) {
    const form = await req.formData();
    const input = form.get("patron")?.toString();
    const saveName: string = (input) ? input : "undefined";
    // console.log("Patron's name is: " + input);
    //Insertion part
    const patrons = db.collection<PatronSchema>("Patrons");
    const insertIds = await patrons.insertMany([
      {
        name: saveName,
      },
    ]);

    // return to the HTML section.
    return ctx.render({ Name: input! });
  },
};

export default function Home(props: PageProps) {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>uxig</title>
        <link rel="icon" type="image/x-icon" href="/uxig.ico"></link>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/uxig.png"
            width="128"
            height="128"
            alt="uxig logo"
          />
          <h2>An interactive tools for User Experience Research</h2>
          <br />
          <br />
          <h1 class="text-4xl font-bold">
            Welcome {props.data.Name || GUEST}!
          </h1>
          <p class="my-4">
            <div>
              {props.data.Name == "" &&
                (
                  <form method="POST" id="setPatronName">
                    <i>How may I have the pleasure of knowing your name?</i>
                    &nbsp;&nbsp;&nbsp;
                    <input
                      type="text"
                      name="patron"
                      value=""
                      placeholder="Enter your name here"
                    />&nbsp;&nbsp;&nbsp;
                    <button
                      type="submit"
                      style="border: 4px black; background-color: #e7e7e7"
                    >
                      Enter
                    </button>
                  </form>
                )}
            </div>
            <br />
            <div style="border-top: 1px solid black;">
              <Preferences />
            </div>
            <br />
            <div style="border-top: 1px solid black;">
              <GenStory />
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
