import { NextRequest } from "next/server";
import { sseStream } from "@/shared/lib/sse/server";
import { getGameById } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";

export async function getGameStream(
  request: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const game = await getGameById(id);

  if (!game) {
    return new Response("Game not found", { status: 404 });
  }

  const { write, response } = sseStream({
    request,
  });

  write(game);

  return response;
}
