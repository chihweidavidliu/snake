import React from "react";

import { Difficulty } from "../types/difficulty";
import { useGameContext } from "../context/GameContext";

interface IDifficultyRadioProps {
  difficultyLevel: Difficulty;
}

const DifficultyRadio = ({ difficultyLevel }: IDifficultyRadioProps) => {
  const { difficulty, setDifficulty, isStarted } = useGameContext();
  return (
    <label htmlFor={difficultyLevel}>
      <input
        id={difficultyLevel}
        type="radio"
        value={difficultyLevel}
        onChange={() => !isStarted && setDifficulty(difficultyLevel)}
        checked={difficulty === difficultyLevel}
      />
      {difficultyLevel}
    </label>
  );
};

export default DifficultyRadio;
