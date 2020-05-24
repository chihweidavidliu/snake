import { IPosition } from "../types/position";

export const checkForOverlap = (
  pixelToTest: IPosition,
  otherPixels: IPosition[]
) => {
  const clash = otherPixels.find(
    pixel =>
      pixel.positionX === pixelToTest.positionX &&
      pixel.positionY === pixelToTest.positionY
  );

  return clash ? true : false;
};
