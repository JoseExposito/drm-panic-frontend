import { isNumeric } from "../src/bugzilla.js";

describe("isNumeric()", () => {
  test("Single digit numbers are numerics", () => {
    expect(isNumeric("0")).toBeTruthy();
    expect(isNumeric("9")).toBeTruthy();
  });

  test("Multiple digit numbers are numerics", () => {
    expect(isNumeric("0001")).toBeTruthy();
    expect(isNumeric("10")).toBeTruthy();
    expect(isNumeric("99")).toBeTruthy();
  });

  test("Negative numbers are not considered numerics", () => {
    expect(isNumeric("-1")).toBeFalsy();
  });
});
