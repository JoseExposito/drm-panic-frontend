import { getFedoraVersion, isNumeric } from "../src/bugzilla.js";

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

describe("getFedoraVersion()", () => {
  test("Parses valid kernel version", () => {
    expect(getFedoraVersion("6.17.8-200.fc42.x86_64")).toBe("42");
  });

  test("Parses single digit kernel version", () => {
    expect(getFedoraVersion("6.17.8-200.fc2.x86_64")).toBe("2");
  });

  test("Custom compiled kernels default to Rawhide", () => {
    expect(getFedoraVersion("6.17.0-rc2")).toBe("rawhide");
  });

  test("Truncated kernel versions default to Rawhide", () => {
    expect(getFedoraVersion("6.17.8-200.fc42")).toBe("rawhide");
  });

  test("Non numeric kernel versions default to Rawhide", () => {
    expect(getFedoraVersion("6.17.8-200.fcAB.x86_64")).toBe("rawhide");
  });
});
