import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import DifficultyRadio from "./components/DifficultyRadio";
import Snake from "./components/Snake";
import Food from "./components/Food";

import { Direction } from "./types/direction";
import { IPosition } from "./types/position";
import { Difficulty } from "./types/difficulty";

import { useDirectionController } from "./hooks/useDirectionController";
import { useMovementController } from "./hooks/useMovementController";
import { GameContext } from "./context/GameContext";
import { checkForOverlap } from "./util/checkForOverlap";
import Scores from "./components/Scores";

const GlobalStyle = createGlobalStyle`

html {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Nunito', sans-serif;
}
*, *:before, *:after {
  box-sizing: inherit;
}
  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    color: white;
  }
`;

const H1 = styled.h1`
  margin: 0;
  margin-top: 10px;
  font-size: 36px;
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-rows: max-content max-content 1fr;
  grid-gap: 20px;
  background: #00404f;
  justify-items: center;
`;

const StartButton = styled.button`
  width: 100px;
  height: 50px;
  align-self: center;
  justify-self: center;
  background: none;
  color: white;
  border: 3px solid white;
  border-radius: 25px;
  font-size: 24px;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #51ac30;
    border: 3px solid #51ac30;
    outline: none;
  }
  transition: all 0.2s;
`;

const MainContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
`;

const PlayArea = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: white;
  overflow: hidden;
`;

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content max-content;
  grid-gap: 30px;
  align-items: center;
`;

const RadioWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(50px, 150px));
`;

export default function App() {
  const pixelSize = 20;
  const areaSize = 600;
  const midpoint = Math.round(areaSize / 2);
  const [isStarted, setIsStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);

  const { direction, setDirection } = useDirectionController();
  const { food, snake } = useMovementController(
    isStarted,
    pixelSize,
    areaSize,
    direction,
    difficulty
  );

  const { snakePosition, setSnakePosition } = snake;
  const { foodPosition, setFoodPosition } = food;

  // reset to orifinal position when game ends
  useEffect(() => {
    if (!isStarted) {
      setDirection(Direction.RIGHT);
      setSnakePosition([
        {
          positionX: midpoint,
          positionY: midpoint,
        },
        {
          positionX: midpoint - pixelSize,
          positionY: midpoint,
        },
      ]);
    }
  }, [isStarted, midpoint, setDirection, setSnakePosition]);

  // track coordinates and end game if snake is out of bounds
  useEffect(() => {
    const checkForOutOfBounds = (snakePosition: IPosition[]) => {
      const firstPixel = snakePosition[0];

      return (
        firstPixel.positionX < 0 ||
        firstPixel.positionX > areaSize ||
        firstPixel.positionY < 0 ||
        firstPixel.positionY > areaSize
      );
    };

    const outOfBounds = checkForOutOfBounds(snakePosition);
    const snakeOverlapsItself = checkForOverlap(
      snakePosition[0],
      snakePosition.slice(1)
    );

    if (outOfBounds || snakeOverlapsItself) {
      setIsStarted(() => false);
    }
  }, [snakePosition]);

  return (
    <GameContext.Provider
      value={{
        isStarted,
        setIsStarted: (isStarted: boolean) => setIsStarted(isStarted),
        pixelSize,
        areaSize,
        snakePosition,
        setSnakePosition: (position: IPosition[]) => setSnakePosition(position),
        direction,
        setDirection: (direction: Direction) => setDirection(direction),
        foodPosition,
        setFoodPosition: (position: IPosition[]) => setFoodPosition(position),
        difficulty,
        setDifficulty: (difficulty: Difficulty) => setDifficulty(difficulty),
      }}
    >
      <GlobalStyle />
      <AppWrapper className="App">
        <H1>Snake</H1>

        <OptionsWrapper>
          <StartButton onClick={() => setIsStarted(true)}>Start</StartButton>

          <RadioWrapper>
            <DifficultyRadio difficultyLevel={Difficulty.EASY} />
            <DifficultyRadio difficultyLevel={Difficulty.MEDIUM} />
            <DifficultyRadio difficultyLevel={Difficulty.HARD} />
            <DifficultyRadio difficultyLevel={Difficulty.SUPERHUMAN} />
          </RadioWrapper>
        </OptionsWrapper>

        <MainContent>
          <PlayArea size={areaSize}>
            <Food />
            <Snake />
          </PlayArea>
          <Scores />
        </MainContent>
      </AppWrapper>
    </GameContext.Provider>
  );
}
