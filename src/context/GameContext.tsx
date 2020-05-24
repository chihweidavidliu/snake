import { createContext, useContext } from "react";
import { Difficulty } from "../types/difficulty";
import { IPosition } from "../types/position";
import { Direction } from "../types/direction";

interface IGameContextProps {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  pixelSize: number;
  areaSize: number;
  snakePosition: IPosition[];
  setSnakePosition: (position: IPosition[]) => void;
  direction: Direction;
  setDirection: (direction: Direction) => void;
  foodPosition: IPosition[];
  setFoodPosition: (position: IPosition[]) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

const initialprops: IGameContextProps = {
  isStarted: false,
  setIsStarted: () => {},
  pixelSize: 10,
  areaSize: 1000,
  snakePosition: [],
  setSnakePosition: () => {},
  direction: Direction.RIGHT,
  setDirection: () => {},
  foodPosition: [],
  setFoodPosition: () => {},
  difficulty: Difficulty.MEDIUM,
  setDifficulty: () => {}
};

const GameContext = createContext(initialprops);

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext };
