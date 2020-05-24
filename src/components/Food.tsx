import React from "react";
import styled from "styled-components";

import { useGameContext } from "../context/GameContext";
import { IPosition } from "../types/position";

interface IFoodWrapperProps {
  left?: number;
  bottom?: number;
  size: number;
}

const FoodWrapper = styled.div<IFoodWrapperProps>`
  position: absolute;
  bottom: ${props => `${props.bottom}px` || "0px"};
  left: ${props => `${props.left}px` || "0px"};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  background: red;
  transition: all 0.1s;
`;

const Food = () => {
  const { foodPosition, pixelSize } = useGameContext();
  return (
    <>
      {foodPosition.map((food: IPosition, index) => {
        return (
          <FoodWrapper
            key={`${index}-food`}
            left={food.positionX}
            bottom={food.positionY}
            size={pixelSize}
          />
        );
      })}
    </>
  );
};

export default Food;
