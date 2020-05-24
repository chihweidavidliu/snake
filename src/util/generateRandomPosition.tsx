import { IPosition } from "../types/position";
import { getRandomInt } from "./getRandomInt";
import { checkForOverlap } from "./checkForOverlap";

export const generateRandomPosition = (
  areaSize: number,
  pixelSize: number,
  excludedPositions?: IPosition[]
): IPosition => {
  const unitsAvailable = Math.round(areaSize / pixelSize);
  const positionX = getRandomInt(unitsAvailable) * pixelSize;
  const positionY = getRandomInt(unitsAvailable) * pixelSize;
  const position = { positionX, positionY };

  if (excludedPositions) {
    const clash = checkForOverlap(position, excludedPositions);
    if (clash) {
      return generateRandomPosition(areaSize, pixelSize, excludedPositions);
    }
  }

  return position;
};
