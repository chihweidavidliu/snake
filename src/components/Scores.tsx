import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";

const ScoresWrapper = styled.div`
  width: 300px;
  position: absolute;
  right: -320px;
  top: 0px;
  display: grid;
  grid-template-rows: 150px 1fr;
`;

const H2 = styled.h2`
  margin: 0;
`;

const CurrentScore = styled.h2`
  margin: 0;
  font-size: 30px;
`;

const Scores = () => {
  const { snakePosition } = useGameContext();

  return (
    <ScoresWrapper>
      <div>
        <H2>Current Score</H2>
        <CurrentScore>{snakePosition.length - 2}</CurrentScore>
      </div>

      <div>
        <H2>High Scores</H2>
      </div>
    </ScoresWrapper>
  );
};

export default Scores;
