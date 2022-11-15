import { getRandomNumber } from "../getRandomNumber";

describe("getRandomNumber", () => {
  it("should be less or equal to max, greater or equal than min", () => {
    expect(getRandomNumber(10)).toBeLessThanOrEqual(12);
    expect(getRandomNumber(10, 5)).toBeGreaterThanOrEqual(5);
  });
});
