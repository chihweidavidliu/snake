import React from "react";
import styled, { css } from "styled-components";
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

const Radio = styled.span<{ isChecked?: boolean }>`
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  border: 3px solid white;

  ${(props) =>
    props.isChecked &&
    css`
      &::after {
        position: absolute;
        content: "";
        width: 18px;
        height: 18px;
        background: white;
        border-radius: 9px;
        animation: fadein 0.3s;
        top: 3px;
        left: 3px;
      }
    `}

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DifficultyRadio = ({ difficultyLevel }: IDifficultyRadioProps) => {
  const { difficulty, setDifficulty, isStarted } = useGameContext();
  return (
    <Wrapper onClick={() => !isStarted && setDifficulty(difficultyLevel)}>
      <Radio isChecked={difficultyLevel === difficulty}></Radio>
      {difficultyLevel}
    </Wrapper>
  );
};

export default DifficultyRadio;
