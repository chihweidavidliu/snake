import { IHighScores } from "../types/highScores";

export const saveHighScores = (scores: IHighScores) => {
  window.localStorage.setItem("snakeHighScores", JSON.stringify(scores));
};
