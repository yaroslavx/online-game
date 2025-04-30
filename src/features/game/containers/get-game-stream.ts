import { NextRequest } from "next/server";
import { sseStream } from "@/shared/lib/sse/server";

export function getGameStream(request: NextRequest) {
  const { write, response } = sseStream({
    request,
    onClose: () => {
      clearInterval(interval);
    },
  });

  let counter = 1;

  const interval = setInterval(() => {
    write(counter++);
  }, 1000);

  return response;
}
