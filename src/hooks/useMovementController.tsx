import { useState, useEffect, useCallback } from "react";
import { IPosition } from "../types/position";
import { generateRandomPosition } from "../util/generateRandomPosition";
import { Direction } from "../types/direction";
import { Difficulty } from "../types/difficulty";

export const useMovementController = (
  isStarted: boolean,
  pixelSize: number,
  areaSize: number,
  direction: Direction,
  difficulty: Difficulty
) => {
  const midpoint = Math.round(areaSize / 2);

  const [snakePosition, setSnakePosition] = useState<IPosition[]>([
    {
      positionX: midpoint,
      positionY: midpoint,
    },
    {
      positionX: midpoint - pixelSize,
      positionY: midpoint,
    },
  ]);

  const [foodPosition, setFoodPosition] = useState<IPosition[]>([
    { positionX: 400, positionY: 200 },
  ]);

  const checkForFood = useCallback(
    (snakePosition: IPosition[]) => {
      const firstPixel = snakePosition[0];

      const filteredFood = foodPosition.filter(
        (food) =>
          food.positionX !== firstPixel.positionX ||
          food.positionY !== firstPixel.positionY
      );

      const hasEatenFood = filteredFood.length < foodPosition.length;

      if (hasEatenFood) {
        setFoodPosition(() => [
          ...filteredFood,
          generateRandomPosition(areaSize, pixelSize),
        ]);

        const lastPixel = snakePosition[snakePosition.length - 1];
        const secondToLastPixel = snakePosition[snakePosition.length - 2];

        // ascertain vector using last two pixels
        const isHorizontal =
          lastPixel.positionY === secondToLastPixel.positionY;
        const isVertical = lastPixel.positionX === secondToLastPixel.positionX;
        const isGoingRight = secondToLastPixel.positionX > lastPixel.positionX;
        const isGoingUp = secondToLastPixel.positionY > lastPixel.positionY;

        if (isHorizontal) {
          if (isGoingRight) {
            return [
              ...snakePosition,
              {
                positionX: lastPixel.positionX - pixelSize,
                positionY: lastPixel.positionY,
              },
            ];
          } else {
            // going left
            return [
              ...snakePosition,
              {
                positionX: lastPixel.positionX + pixelSize,
                positionY: lastPixel.positionY,
              },
            ];
          }
        }

        if (isVertical) {
          if (isGoingUp) {
            return [
              ...snakePosition,
              {
                positionX: lastPixel.positionX,
                positionY: lastPixel.positionY - pixelSize,
              },
            ];
          } else {
            // going down
            return [
              ...snakePosition,
              {
                positionX: lastPixel.positionX,
                positionY: lastPixel.positionY + pixelSize,
              },
            ];
          }
        }
      }

      return snakePosition;
    },
    [foodPosition, areaSize, pixelSize]
  );

  const handleMove = useCallback(() => {
    const updateSnakePositionArray = (
      positions: IPosition[],
      newPosition: IPosition
    ) => {
      let updatedPositions = [...positions];

      updatedPositions = [newPosition, ...updatedPositions];

      const sliced = updatedPositions.slice(0, updatedPositions.length - 1);

      const final = checkForFood(sliced);

      return final;
    };

    switch (direction) {
      case Direction.UP:
        return setSnakePosition((prevPosition) => {
          const firstPixel = prevPosition[0];
          return updateSnakePositionArray(prevPosition, {
            positionX: firstPixel.positionX,
            positionY: firstPixel.positionY + pixelSize,
          });
        });
      case Direction.DOWN:
        return setSnakePosition((prevPosition) => {
          const firstPixel = prevPosition[0];
          return updateSnakePositionArray(prevPosition, {
            positionX: firstPixel.positionX,
            positionY: firstPixel.positionY - pixelSize,
          });
        });
      case Direction.LEFT:
        return setSnakePosition((prevPosition) => {
          const firstPixel = prevPosition[0];
          return updateSnakePositionArray(prevPosition, {
            positionX: firstPixel.positionX - pixelSize,
            positionY: firstPixel.positionY,
          });
        });
      case Direction.RIGHT:
        return setSnakePosition((prevPosition) => {
          const firstPixel = prevPosition[0];
          return updateSnakePositionArray(prevPosition, {
            positionX: firstPixel.positionX + pixelSize,
            positionY: firstPixel.positionY,
          });
        });

      default:
        return setSnakePosition((prevPosition) => prevPosition);
    }
  }, [direction, checkForFood, pixelSize]);

  // movement
  useEffect(() => {
    const mapDifficultyToInterval = (difficulty: Difficulty) => {
      switch (difficulty) {
        case Difficulty.EASY:
          return 100;
        case Difficulty.MEDIUM:
          return 75;
        case Difficulty.HARD:
          return 50;
        case Difficulty.SUPERHUMAN:
          return 25;
        default:
          return 500;
      }
    };
    if (isStarted) {
      const interval = setInterval(() => {
        handleMove();
      }, mapDifficultyToInterval(difficulty));

      return () => clearInterval(interval);
    }
  }, [isStarted, handleMove, difficulty]);

  return {
    snake: { snakePosition, setSnakePosition },
    food: { foodPosition, setFoodPosition },
  };
};
