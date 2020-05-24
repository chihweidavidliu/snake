import React from "react";
import shortid from "shortid";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { useHighScores } from "../hooks/useHighScores";

const ScoresWrapper = styled.div`
  width: 300px;
  position: absolute;
  right: -320px;
  top: 0px;
  display: grid;
  grid-template-rows: max-content 1fr;
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const CurrentScore = styled.h2`
  margin: 0;
  font-size: 40px;
  padding: 15px 0px;
`;

const Scores = () => {
  const { snakePosition, difficulty } = useGameContext();
  const { highScores } = useHighScores();

  return (
    <ScoresWrapper>
      <div>
        <H2>Current Score</H2>
        <CurrentScore>{snakePosition.length - 2}</CurrentScore>
      </div>

      <div>
        <H2>Top 10 Scores ({difficulty})</H2>
        {highScores.map((score) => {
          return (
            <div key={shortid.generate()}>
              {score.name}: {score.finalScore}
            </div>
          );
        })}
      </div>
    </ScoresWrapper>
  );
};

export default Scores;
