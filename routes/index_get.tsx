import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

class Patron {
  public Name = "";
  constructor (name: string) {
    this.Name = name;
  }
}

export const handler: Handlers<Patron> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const input = url.searchParams.get("patron") || "";
    const patron = new Patron(input);
    // console.log("Patron's name is: " + patron.Name);
    return ctx.render(patron);
  },
};

export default function Home(props : PageProps) {
  return (
    <>
      <Head>
        <title>uxig</title>
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
          <h1 class="text-4xl font-bold">Welcome  {props.data.Name || '(guest)'}!  </h1>
          <p class="my-4">
            <div>How may I have the pleasure of knowing your name?</div>
            <div>
              <form>
                <input type="text" name="patron" value={Patron} />&nbsp;&nbsp;&nbsp;
                <button type="submit">Enter</button>
              </form>
              <ul>

              </ul>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
