import { useEventSource } from "@/shared/lib/sse/client";
import { GameId } from "@/kernel/ids";
import { GameDomain } from "@/entities/game";
import { routes } from "@/kernel/routes";

export function useGame(gameId: GameId) {
  const { data, error, isPending } = useEventSource<GameDomain.GameEntity>(
    routes.gameStream(gameId),
  );

  return { game: data, isPending };
}
