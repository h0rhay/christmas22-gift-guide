import { collectUniqueRandomNumbers } from "../collectUniqueRandomNumbers";

describe("collectUniqueRandomNumbers", () => {
  it(`Should 
  1. return 3 values or selected amount of values (2nd argument)
  2. collect array of unique numbers (3 by default) without repeating them`, () => {
    expect(collectUniqueRandomNumbers(10)).toHaveLength(3);
    expect(collectUniqueRandomNumbers(10, 5)).toHaveLength(5);
  });

  expect.extend({
    toBeUnique(array: number[]) {
      const pass = Array.isArray(array) && new Set(array).size === array.length;
      if (pass) {
        return {
          message: () =>
            `No duplicates, all values are unique`,
          pass: true,
        };
      } else {
        return {
          message: () => 'Found some duplicates, fix the method',
          pass: false,
        };
      }
    },
  });


  it(`Should return only unique characters in the array`, () => {
    expect(collectUniqueRandomNumbers(100, 10)).toBeUnique();
    expect(collectUniqueRandomNumbers(10, 3)).toBeUnique();
  })
});