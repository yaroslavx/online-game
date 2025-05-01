import { useEffect, useState } from "react";

export function useEventSource<T>(url: string) {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        setData(JSON.parse(message.data));
        setIsPending(false);
        setError(undefined);
      } catch (error) {
        setError(error);
      }
    });

    gameEvents.addEventListener("error", (error) => setError(error));

    return () => {
      gameEvents.close();
    };
  }, [url]);

  return { data, error, isPending };
}
