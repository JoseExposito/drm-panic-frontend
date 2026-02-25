import {
  getBugzillaReportBugURL,
  getFedoraVersion,
  isNumeric,
} from "../src/bugzilla.js";

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

describe("getBugzillaReportBugURL()", () => {
  const originalEnv = process.env.BUGZILLA_URL;

  beforeEach(() => {
    process.env.BUGZILLA_URL = "https://bugzilla.redhat.com";
  });

  afterEach(() => {
    process.env.BUGZILLA_URL = originalEnv;
  });

  test("Constructs URL with numeric Fedora version", () => {
    expect(getBugzillaReportBugURL("42")).toBe(
      "https://bugzilla.redhat.com/enter_bug.cgi?product=Fedora&version=42&component=kernel",
    );
  });

  test("Constructs URL with rawhide version", () => {
    expect(getBugzillaReportBugURL("rawhide")).toBe(
      "https://bugzilla.redhat.com/enter_bug.cgi?product=Fedora&version=rawhide&component=kernel",
    );
  });

  test("Constructs URL with single digit Fedora version", () => {
    expect(getBugzillaReportBugURL("2")).toBe(
      "https://bugzilla.redhat.com/enter_bug.cgi?product=Fedora&version=2&component=kernel",
    );
  });
});
