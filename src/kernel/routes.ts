import { GameId } from "@/kernel/ids";

export const routes = {
  signIn: () => "/signin",
  signUp: () => "/signup",
  game: (gameId: GameId) => `/game/${gameId}`,
  gameStream: (gameId: GameId) => `/game/${gameId}/stream`,
};
