import { useState, useEffect } from "react";
import { Direction } from "../types/direction";

export const useDirectionController = () => {
  const [direction, setDirection] = useState(Direction.RIGHT);

  useEffect(() => {
    const handleMove = (e: KeyboardEvent) => {
      const { key } = e;

      switch (key) {
        case "ArrowUp":
          return setDirection(prevDirection => {
            if (prevDirection !== Direction.DOWN) {
              return Direction.UP;
            }
            return prevDirection;
          });
        case "ArrowDown":
          return setDirection(prevDirection => {
            if (prevDirection !== Direction.UP) {
              return Direction.DOWN;
            }
            return prevDirection;
          });
        case "ArrowLeft":
          return setDirection(prevDirection => {
            if (prevDirection !== Direction.RIGHT) {
              return Direction.LEFT;
            }
            return prevDirection;
          });
        case "ArrowRight":
          return setDirection(prevDirection => {
            if (prevDirection !== Direction.LEFT) {
              return Direction.RIGHT;
            }
            return prevDirection;
          });
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleMove);

    return () => document.removeEventListener("keydown", handleMove);
  }, [setDirection]);

  return { direction, setDirection };
};
