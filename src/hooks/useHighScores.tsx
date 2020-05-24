import { IScore, IHighScores } from "../types/highScores";
import { useState, useEffect } from "react";
import { useGameContext } from "../context/GameContext";
import { getHighScores } from "../util/getHighScores";

export const useHighScores = () => {
  const [highScores, setHighScores] = useState<IScore[]>([]);
  const { difficulty, finalScore } = useGameContext();

  useEffect(() => {
    const highScores = getHighScores();
    if (!highScores) {
      return setHighScores([]);
    }

    const parsed: IHighScores = JSON.parse(highScores);
    const scoresForDifficultyLevel = parsed[difficulty];

    if (!scoresForDifficultyLevel) {
      return setHighScores([]);
    }

    setHighScores(scoresForDifficultyLevel);
  }, [difficulty, finalScore]);

  return { highScores, setHighScores };
};
