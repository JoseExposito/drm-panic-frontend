import { getUrlQuery, parseTrace, validParams } from "../src/url-parser";

describe("getUrlQuery()", () => {
  const search = "?a=x86_64&v=6.17.8-200.fc42.x86_64+&z=12345";
  const hash = "#?a=x86_64&v=6.17.8-200.fc42.x86_64+&z=12345";

  test("Returns null when search and hash are empty", () => {
    const location = {
      search: "",
      hash: "",
    };

    expect(getUrlQuery(location)).toBeNull();
  });

  test("Returns search when only search is present", () => {
    const location = {
      search,
      hash: "",
    };

    expect(getUrlQuery(location)).toBe(search);
  });

  test("Returns search when search and hash are present", () => {
    const location = {
      search,
      hash,
    };

    expect(getUrlQuery(location)).toBe(search);
  });

  test("Returns hash when search is empty", () => {
    const location = {
      search: "",
      hash,
    };

    expect(getUrlQuery(location)).toBe(search);
  });

  test('Returns hash unchanged if it does not start with "#"', () => {
    const location = {
      search: "",
      hash: "only=in&a=test",
    };

    expect(getUrlQuery(location)).toBe("only=in&a=test");
  });
});

describe("validParams()", () => {
  test("Returns true if all params are present", () => {
    const params = new URLSearchParams(
      "?a=x86_64&v=6.17.8-200.fc42.x86_64+&z=12345",
    );
    expect(validParams(params)).toBeTruthy();
  });

  test("Returns false if a param is missing", () => {
    const params = new URLSearchParams("?v=6.17.8-200.fc42.x86_64+&z=12345");
    expect(validParams(params)).toBeFalsy();
  });

  test("Returns false if there are no params", () => {
    const params = new URLSearchParams("");
    expect(validParams(params)).toBeFalsy();
  });
});

describe("parseTrace()", () => {
  test("Decodes data", () => {
    const trace = parseTrace(
      "22850245147461960127479103797202645679929458617911856021402989363788",
    );
    expect(trace).toBe("Test compressed zlib");
  });
});
