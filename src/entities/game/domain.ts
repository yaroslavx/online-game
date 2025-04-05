export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

export type GameIdleEntity = {
  id: string;
  creator: Player;
  type: "idle";
};

export type GameInProgressEntity = {
  id: string;
  players: Player[];
  fields: Field[];
  type: "in-progress";
};

export type GameOverEntity = {
  id: string;
  players: Player[];
  fields: Field[];
  type: "game-over";
  winner: Player;
};

export type GameOverDrawEntity = {
  id: string;
  players: Player[];
  fields: Field[];
  type: "game-over-draw";
};

export type Player = {
  id: string;
  login: string;
  rating: number;
};

export type Field = Cell;
export type Cell = GameSymbol | null;
export type GameSymbol = string;
