import { NextRequest } from "next/server";

export const sseStream = ({
  request,
  onClose,
}: {
  request: NextRequest;
  onClose?: () => void;
}) => {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const write = (data: unknown) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  };

  request.signal.addEventListener("abort", () => {
    onClose?.();
  });

  const response = new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache no-transform",
    },
  });

  const close = () => {
    writer.close();
  };

  return {
    response,
    write,
    close,
  };
};
