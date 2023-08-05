// routes/api/alive/index.tsx
import { HandlerContext } from "$fresh/server.ts";
export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const resp = "This is the response of calling the /alive/index.tsx api endpoint"
    const url = new URL(_req.url);
    return new Response(resp);
};


