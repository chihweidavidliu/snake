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

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
*, *:before, *:after {
  box-sizing: inherit;
}
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const H1 = styled.h1`
  margin: 0;
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-rows: max-content max-content 1fr;
  grid-gap: 20px;
  background: teal;
  justify-items: center;
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content max-content;
`;

export default function App() {
  const pixelSize = 20;
  const areaSize = 800;
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
        <div>
          <H1>Snake</H1>
        </div>
        <OptionsWrapper>
          <button onClick={() => setIsStarted(true)}>Start</button>

          <div>
            <DifficultyRadio difficultyLevel={Difficulty.EASY} />
            <DifficultyRadio difficultyLevel={Difficulty.MEDIUM} />
            <DifficultyRadio difficultyLevel={Difficulty.HARD} />
            <DifficultyRadio difficultyLevel={Difficulty.SUPERHUMAN} />
          </div>
        </OptionsWrapper>
        <PlayArea size={areaSize}>
          <Food />
          <Snake />
        </PlayArea>
      </AppWrapper>
    </GameContext.Provider>
  );
}
