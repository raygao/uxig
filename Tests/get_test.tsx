import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
import manifest from "../fresh.gen.ts";
import { assert, assertEquals } from "$std/testing/asserts.ts";

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

Deno.test("HTTP assert test.", async (t) => {
    const handler = await createHandler(manifest);
  
    await t.step("#1 GET /", async () => {
      const resp = await handler(new Request("http://127.0.0.1/"), CONN_INFO);
      assertEquals(resp.status, 200);
    });

    await t.step("#2 GET /about", async () => {
      const resp = await handler(new Request("http://127.0.0.1/about"), CONN_INFO);
      assertEquals(resp.status, 200);
    });

    await t.step("#3 GET /api/genGherkin", async () => {
      const resp = await handler(new Request("http://127.0.0.1/api/genGherkin"), CONN_INFO);
      assertEquals(resp.status, 200);
    });

    await t.step("#4 GET /api/setPreferences", async () => {
      const resp = await handler(new Request("http://127.0.0.1/api/setPreferences"), CONN_INFO);
      assertEquals(resp.status, 200);
    });

    await t.step("#5 GET /api/genStory", async () => {
      const resp = await handler(new Request("http://127.0.0.1/api/genStory"), CONN_INFO);
      assertEquals(resp.status, 200);
    });
});