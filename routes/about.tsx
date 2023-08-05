// routes/about.tsx
import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
    async GET(_req, ctx) {
      const resp = await ctx.render();
      resp.headers.set("X-Custom-Header", "About uxig");
      return resp;
    },
  };
export default function AboutPage() {
    return (
      <main>
        <h1>About uxig</h1>
        <p>uxig is an abbreviation for User Experience Interactive Generator</p>
        <p>As AI (LLM) technologies brings a forth a new wave of innovations, it could be helpful in the User Research 
            space. This means that, instead of manually write user surveys and questions, those tasks could be delegated
            to AI. With human playing the pilot / planner role, and focusing on high value added activities, rather than
            manually type a lot of words.
        </p>
      </main>
    );
  }