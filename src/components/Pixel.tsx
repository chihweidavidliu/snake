import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";

interface IPixelWrapperProps {
  left?: number;
  bottom?: number;
  size: number;
  isGameStarted: boolean;
}

const PixelWrapper = styled.div.attrs<IPixelWrapperProps>((props) => ({
  style: {
    left: `${props.left}px` || "0px",
    bottom: `${props.bottom}px` || "0px",
  },
}))<IPixelWrapperProps>`
  position: absolute;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background: ${(props) => (props.isGameStarted ? "black" : "grey")};
  // transition: all 0.1s;
`;

interface IPixelProps {
  positionX: number;
  positionY: number;
}

const Pixel = ({ positionX, positionY }: IPixelProps) => {
  const { isStarted, pixelSize } = useGameContext();

  return (
    <PixelWrapper
      left={positionX}
      bottom={positionY}
      size={pixelSize}
      isGameStarted={isStarted}
    />
  );
};

export default Pixel;
