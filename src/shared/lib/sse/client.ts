import { useEffect, useState } from "react";

export function useEventSource<T>(url: string, initialData: T) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        setData(JSON.parse(message.data));
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

  return { data, error };
}
