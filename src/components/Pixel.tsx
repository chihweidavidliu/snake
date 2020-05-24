import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";

interface IPixelWrapperProps {
  left?: number;
  bottom?: number;
  size: number;
  isGameStarted: boolean;
  index: number;
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
  background: ${(props) => (props.isGameStarted ? "#567f35" : "grey")};
  border: 1px solid white;
  border-radius: 5px;
`;

interface IPixelProps {
  positionX: number;
  positionY: number;
  index: number;
}

const Pixel = ({ positionX, positionY, index }: IPixelProps) => {
  const { isStarted, pixelSize } = useGameContext();

  return (
    <PixelWrapper
      index={index}
      left={positionX}
      bottom={positionY}
      size={pixelSize}
      isGameStarted={isStarted}
    />
  );
};

export default Pixel;
