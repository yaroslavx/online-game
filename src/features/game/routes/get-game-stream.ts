import { NextRequest } from "next/server";
import { sseStream } from "@/shared/lib/sse/server";
import { getGameById, surrenderGame } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { gameEvents } from "@/features/game/services/game-events";
import { getCurrentUser } from "@/entities/user/server";

export async function getGameStream(
  request: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const currentUser = await getCurrentUser();
  const game = await getGameById(id);

  if (!game || !currentUser) {
    return new Response("Game not found", { status: 404 });
  }

  const handleUnsubscribe = async () => {
    await gameEvents.addListener(game.id, (event) => {
      write(event.data);
    });

    const result = await surrenderGame(id, currentUser);
    if (result.type === "right") {
      gameEvents.emit(result.value);
    }
  };

  const { write, response } = sseStream({
    request,
    onClose: handleUnsubscribe,
  });

  write(game);

  return response;
}
