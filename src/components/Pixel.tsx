import React from "react";
import styled, { css } from "styled-components";
import { useGameContext } from "../context/GameContext";
import { Direction } from "../types/direction";

interface IPixelWrapperProps {
  left?: number;
  bottom?: number;
  size: number;
  isGameStarted: boolean;
  index: number;
  direction: Direction;
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
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => {
    // clip path for snake head
    if (props.index === 0) {
      switch (props.direction) {
        case Direction.UP:
          return css`
            clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          `;
        case Direction.DOWN:
          return css`
            clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
          `;
        case Direction.RIGHT:
          return css`
            clip-path: polygon(0 0, 100% 20%, 100% 80%, 0% 100%);
            flex-direction: column;
          `;

        case Direction.LEFT:
          return css`
            clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
            flex-direction: column;
          `;
        default:
          return "";
      }
    }
    return "";
  }}
`;

const Eye = styled.div`
  margin: 1px;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  bottom: 5px;
  left: 2px;
  background: white;
`;

interface ITongueProps {
  direction: Direction;
  left: number;
  bottom: number;
}
const Tongue = styled.div<ITongueProps>`
  position: absolute;
  background: red;
  ${(props) => {
    switch (props.direction) {
      case Direction.UP:
        return css`
          height: 5px;
          width: 2px;
          left: ${props.left + 9}px;
          bottom: ${props.bottom + 19}px;
        `;
      case Direction.DOWN:
        return css`
          height: 5px;
          width: 2px;
          left: ${props.left + 9}px;
          bottom: ${props.bottom - 4}px;
        `;
      case Direction.RIGHT:
        return css`
          height: 2px;
          width: 5px;
          left: ${props.left + 19}px;
          bottom: ${props.bottom + 9}px;
        `;

      case Direction.LEFT:
        return css`
          height: 2px;
          width: 5px;
          left: ${props.left - 5}px;
          bottom: ${props.bottom + 9}px;
        `;
      default:
        return "";
    }
  }}
`;

interface IPixelProps {
  positionX: number;
  positionY: number;
  index: number;
}

const Pixel = ({ positionX, positionY, index }: IPixelProps) => {
  const { isStarted, pixelSize, direction } = useGameContext();

  const isHead = index === 0;

  return (
    <>
      <PixelWrapper
        index={index}
        left={positionX}
        bottom={positionY}
        size={pixelSize}
        isGameStarted={isStarted}
        direction={direction}
      >
        {isHead && (
          <>
            <Eye />
            <Eye />
          </>
        )}
      </PixelWrapper>
      {isHead && isStarted && (
        <Tongue direction={direction} left={positionX} bottom={positionY} />
      )}
    </>
  );
};

export default Pixel;
