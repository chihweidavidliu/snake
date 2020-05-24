import React from "react";
import styled from "styled-components";

import { useGameContext } from "../context/GameContext";
import { IPosition } from "../types/position";

interface IAppleProps {
  left?: number;
  bottom?: number;
  size: number;
}

const Apple = styled.div<IAppleProps>`
  position: absolute;
  bottom: ${(props) => `${props.bottom}px` || "0px"};
  left: ${(props) => `${props.left}px` || "0px"};
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background: red;
  transition: all 0.1s;
  border-radius: 8px;

  &::after {
    content: "";
    position: absolute;
    height: 10px;
    width: 10px;
    left: 7px;
    bottom: 15px;
    background-color: green;
    clip-path: polygon(73% 0, 67% 49%, 27% 100%, 37% 34%);
  }
`;

const Food = () => {
  const { foodPosition, pixelSize } = useGameContext();
  return (
    <>
      {foodPosition.map((food: IPosition, index) => {
        return (
          <>
            <Apple
              key={`${index}-food`}
              left={food.positionX}
              bottom={food.positionY}
              size={pixelSize}
            ></Apple>
          </>
        );
      })}
    </>
  );
};

export default Food;
