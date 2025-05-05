import { GameDomain } from "@/entities/game";

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  switch (game.status) {
    case "idle":
      return <div className="text-lg">Waiting</div>;
    case "inProgress": {
      const currentSymbol = GameDomain.getGameCurrentSymbol(game);

      return <div className="text-lg">Move: {currentSymbol}</div>;
    }
    case "gameOver": {
      const currentSymbol = GameDomain.getGameCurrentSymbol(game);

      return <div className="text-lg">Winner: {currentSymbol}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg">Draw</div>;
    default:
      return <div className="text-lg">Status...</div>;
  }
}
