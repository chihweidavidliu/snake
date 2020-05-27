import { useState, useEffect } from "react";
import { Direction } from "../types/direction";

export const useDirectionController = () => {
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [directionsQueue, setDirectionsQueue] = useState<Direction[]>([]);

  useEffect(() => {
    const handleMove = (e: KeyboardEvent) => {
      e.preventDefault();
      const { key } = e;

      switch (key) {
        case "ArrowUp":
          if (direction !== Direction.DOWN) {
            setDirectionsQueue((prevQueue) => [...prevQueue, Direction.UP]);
          }

          return setDirection((prevDirection) => {
            if (prevDirection !== Direction.DOWN) {
              return Direction.UP;
            }
            return prevDirection;
          });
        case "ArrowDown":
          if (direction !== Direction.UP) {
            setDirectionsQueue((prevQueue) => [...prevQueue, Direction.DOWN]);
          }
          return setDirection((prevDirection) => {
            if (prevDirection !== Direction.UP) {
              return Direction.DOWN;
            }
            return prevDirection;
          });
        case "ArrowLeft":
          if (direction !== Direction.RIGHT) {
            setDirectionsQueue((prevQueue) => [...prevQueue, Direction.LEFT]);
          }
          return setDirection((prevDirection) => {
            if (prevDirection !== Direction.RIGHT) {
              return Direction.LEFT;
            }
            return prevDirection;
          });
        case "ArrowRight":
          if (direction !== Direction.LEFT) {
            setDirectionsQueue((prevQueue) => [...prevQueue, Direction.RIGHT]);
          }
          return setDirection((prevDirection) => {
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
  }, [direction, setDirection]);

  return { direction, setDirection, directionsQueue, setDirectionsQueue };
};
