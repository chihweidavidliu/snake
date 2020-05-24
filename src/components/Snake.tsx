import React from "react";
import Pixel from "./Pixel";
import { useGameContext } from "../context/GameContext";

const Snake = () => {
  const { snakePosition } = useGameContext();
  return (
    <>
      {snakePosition.map((position, index) => {
        const { positionX, positionY } = position;
        return (
          <Pixel
            key={`pixel-number-${index}`}
            positionX={positionX}
            positionY={positionY}
          />
        );
      })}
    </>
  );
};

export default Snake;
