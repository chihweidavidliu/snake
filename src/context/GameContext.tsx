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
  directionsQueue: Direction[];
  setDirectionsQueue: (directions: Direction[]) => void;
  setDirection: (direction: Direction) => void;
  foodPosition: IPosition[];
  setFoodPosition: (position: IPosition[]) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  finalScore: number | null;
  setFinalScore: (score: number | null) => void;
  isFinalScoreModalOpen: boolean;
  setIsFinalScoreModalOpen: (isOpen: boolean) => void;
}

const initialprops: IGameContextProps = {
  isStarted: false,
  setIsStarted: () => {},
  pixelSize: 10,
  areaSize: 1000,
  snakePosition: [],
  setSnakePosition: () => {},
  direction: Direction.RIGHT,
  directionsQueue: [],
  setDirectionsQueue: () => {},
  setDirection: () => {},
  foodPosition: [],
  setFoodPosition: () => {},
  difficulty: Difficulty.MEDIUM,
  setDifficulty: () => {},
  finalScore: null,
  setFinalScore: () => {},
  isFinalScoreModalOpen: false,
  setIsFinalScoreModalOpen: () => {},
};

const GameContext = createContext(initialprops);

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext };
