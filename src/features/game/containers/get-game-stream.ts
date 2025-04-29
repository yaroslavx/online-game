import { NextRequest } from "next/server";

export function getGameStream(request: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  let counter = 1;
  const interval = setInterval(() => {
    writer.write(encoder.encode(`data: ${counter++}\n\n`));
  }, 1000);

  request.signal.addEventListener("abort", () => {
    clearInterval(interval);
  });

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache no-transform",
    },
  });
}
