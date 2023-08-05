import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import Counter from '../islands/Counter.tsx'
import GenStory from '../islands/GenStory.tsx'

interface Patron {
  Name: string;
}

const GUEST = "{GUEST}";

export const handler: Handlers<Patron> = {
  // Get method only used for the initial page load
  async GET(req, ctx) {
    const url = new URL(req.url);
    const input = url.searchParams.get("patron") || "";
    console.log("Patron's name is: " + input);
    return ctx.render({ Name: input });
  },
  // POST is used for the form post
  async POST(req, ctx) {
    const form = await req.formData();
    const input = form.get("patron")?.toString();
    console.log("Patron's name is: " + input);
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
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <h2>An interactive tools for User Experience Research</h2>
          <br />
          <br />
          <h1 class="text-4xl font-bold">
            Welcome {props.data.Name || GUEST}!
          </h1>
          <p class="my-4">
            <div>
              <i>How may I have the pleasure of knowing your name?</i>
              &nbsp;&nbsp;&nbsp;
              <form method="POST">
                <input
                  type="text"
                  name="patron"
                  value=""
                  placeholder="Enter your name here"
                />&nbsp;&nbsp;&nbsp;
                <button type="submit" style="border: 4px black; background-color: #e7e7e7">Enter</button>
              </form>
            </div>
            <br/>
            <div style="border-top: 1px solid black;">
              Div for Counter <Counter count={count}></Counter>
              <GenStory/>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
