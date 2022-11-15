import { getRandomNumber } from "./getRandomNumber";

const collectionOfUniqueValues = new Set<number>()

export const collectUniqueRandomNumbers = (
  max: number,
  limit: number = 3
) => {
  do {
    const newValue = getRandomNumber(max);
    collectionOfUniqueValues.add(newValue)
  } while (collectionOfUniqueValues.size < limit)
  const array: number[] = [];
  collectionOfUniqueValues.forEach((uniqueValue) => array.push(uniqueValue));
  return array
};