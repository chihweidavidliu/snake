import React from "react";
import styled from "styled-components";
import { Difficulty } from "../types/difficulty";
import { useGameContext } from "../context/GameContext";

interface IDifficultyRadioProps {
  difficultyLevel: Difficulty;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 10px;
  align-items: center;
  cursor: pointer;
`;

const Radio = styled.span`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  border: 3px solid white;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioCheck = styled.span<{ isSelected?: boolean }>`
  ${(props) => !props.isSelected && `display: none;`}
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  animation: ${(props) => (props.isSelected ? `fadein 0.3s` : `fadeout 0.3s`)};

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const DifficultyRadio = ({ difficultyLevel }: IDifficultyRadioProps) => {
  const { difficulty, setDifficulty, isStarted } = useGameContext();
  return (
    <Wrapper onClick={() => !isStarted && setDifficulty(difficultyLevel)}>
      <Radio>
        <RadioCheck isSelected={difficultyLevel === difficulty} />
      </Radio>
      {difficultyLevel}
    </Wrapper>
  );
};

export default DifficultyRadio;
