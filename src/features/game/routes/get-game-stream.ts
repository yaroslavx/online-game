import { NextRequest } from "next/server";
import { sseStream } from "@/shared/lib/sse/server";
import { getGameById } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { gameEvents } from "@/features/game/services/game-events";

export async function getGameStream(
  request: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const game = await getGameById(id);

  if (!game) {
    return new Response("Game not found", { status: 404 });
  }

  const unsubscribe = await gameEvents.addListener(game.id, (event) => {
    write(event.data);
  });

  const { write, response } = sseStream({
    request,
    onClose: unsubscribe,
  });

  write(game);

  return response;
}
