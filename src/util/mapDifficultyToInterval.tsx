import { Difficulty } from "../types/difficulty";

export const mapDifficultyToInterval = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 100;
    case Difficulty.MEDIUM:
      return 75;
    case Difficulty.HARD:
      return 50;
    case Difficulty.SUPERHUMAN:
      return 25;
    default:
      return 500;
  }
};
