import React, { useEffect, useState, createRef } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

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
import HighScoresModal from "./components/HighScoresModal";
import { Button } from "./components/Button";
import { useHighScores } from "./hooks/useHighScores";
import { IScore } from "./types/highScores";

const appleSound = require("./assets/apple.mp3");
const levelUpSound = require("./assets/levelUp.mp3");

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

const theme = {
  primaryColour: "#00404f",
};

const H1 = styled.h1`
  margin: 0;
  margin-top: 30px;
  font-size: 36px;
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-rows: max-content max-content max-content;
  grid-gap: 20px;
  background: ${(props) => props.theme.primaryColour};
  justify-items: center;
`;

const MainContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
`;

const Border = styled.div`
  border: 2px solid lightgrey;
  padding: 5px;
  border-radius: 4px;
`;

const PlayArea = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: white;
  overflow: hidden;
  border-radius: 4px;
`;

const Countdown = styled.div<{ areaSize: number }>`
  position: absolute;
  color: ${(props) => props.theme.primaryColour};
  top: 30px;
  left: ${(props) => `${Math.floor(props.areaSize / 2 - 10)}px`};
  justify-self: center;
  font-size: 120px;
  font-weight: bold;
`;

const TitleWrapper = styled.div`
  text-align: center;
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
  const [appleAudioRef] = useState(createRef<HTMLAudioElement>());
  const [levelUpAudioRef] = useState(createRef<HTMLAudioElement>());
  const [isStarted, setIsStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);
  const [countdown, setCountdown] = useState(0);
  const [isFinalScoreModalOpen, setIsFinalScoreModalOpen] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const { highScores } = useHighScores();

  const { direction, setDirection } = useDirectionController();
  const { food, snake } = useMovementController(
    isStarted,
    pixelSize,
    areaSize,
    direction,
    difficulty,
    appleAudioRef,
    levelUpAudioRef
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

    const checkIsHighScore = (highScores: IScore[], score: number) => {
      if (
        highScores.length < 10 ||
        highScores.find((highScore: IScore) => highScore.finalScore < score)
      ) {
        return true;
      }

      return false;
    };

    if (outOfBounds || snakeOverlapsItself) {
      const isHighScore = checkIsHighScore(
        highScores,
        snakePosition.length - 2
      );

      if (isHighScore) {
        setFinalScore(snakePosition.length - 2);
        setIsFinalScoreModalOpen(true);
      }

      setIsStarted(() => false);
    }
  }, [difficulty, finalScore, highScores, snakePosition]);

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
        finalScore,
        setFinalScore: (finalScore: number | null) => setFinalScore(finalScore),
        isFinalScoreModalOpen,
        setIsFinalScoreModalOpen: (isOpen: boolean) =>
          setIsFinalScoreModalOpen(isOpen),
      }}
    >
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <audio src={appleSound} ref={appleAudioRef}></audio>
        <audio src={levelUpSound} ref={levelUpAudioRef}></audio>
        <AppWrapper className="App">
          <TitleWrapper>
            <H1>Snake</H1>
            <p>Use the arrow keys to move</p>
          </TitleWrapper>

          <OptionsWrapper>
            <Button
              onClick={() => {
                let numOfSeconds = 3;
                const timer = setInterval(countDown, 1000);

                setCountdown(numOfSeconds);

                function countDown() {
                  numOfSeconds--;
                  if (numOfSeconds === 0) {
                    setIsStarted(true);
                    setCountdown(0);
                    return clearInterval(timer);
                  }

                  setCountdown(numOfSeconds);
                }
              }}
            >
              Start
            </Button>

            <RadioWrapper>
              <DifficultyRadio difficultyLevel={Difficulty.EASY} />
              <DifficultyRadio difficultyLevel={Difficulty.MEDIUM} />
              <DifficultyRadio difficultyLevel={Difficulty.HARD} />
              <DifficultyRadio difficultyLevel={Difficulty.SUPERHUMAN} />
            </RadioWrapper>
          </OptionsWrapper>

          <MainContent>
            <Border>
              <PlayArea size={areaSize}>
                <Food />
                <Snake />
              </PlayArea>

              {!isStarted && countdown > 0 && (
                <Countdown areaSize={areaSize}>{countdown}</Countdown>
              )}
            </Border>
            <Scores />
          </MainContent>
          {isFinalScoreModalOpen && finalScore !== null && (
            <HighScoresModal finalScore={finalScore} />
          )}
          {/* <HighScoresModal finalScore={finalScore || 4} /> */}
        </AppWrapper>
      </ThemeProvider>
    </GameContext.Provider>
  );
}
