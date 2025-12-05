import { inflate } from "pako";

const UrlParams = {
  ARCHITECTURE: "a",
  VERSION: "v",
  ENCODED_DATA: "z",
};

const getUrlQuery = () => {
  let query = window.location.search || window.location.hash;

  if (!query) {
    return null;
  }

  if (query.startsWith("#")) {
    query = query.substring(1);
  }

  return query;
};

const validParams = (params) => {
  return Object.values(UrlParams).every((key) => params.has(key));
};

const parseTrace = (encodedData) => {
  // 17 decimal digits are converted to 7 bytes
  const mainLen = Math.floor(encodedData.length / 17) * 7;
  // and the remaining bytes, compute the reverse of  [0, 3, 5, 8, 10, 13, 15, 17]
  const remLen = Math.floor(((encodedData.length % 17) * 2) / 5);

  const data = new Uint8Array(mainLen + remLen);
  let offset = 0;

  for (let i = 0; i < encodedData.length; i += 17) {
    const chunk = encodedData.substring(i, i + 17);
    const numBytes = chunk.length < 17 ? remLen : 7;
    let num = BigInt(chunk);

    for (let j = 0; j < numBytes; j++) {
      data[offset] = Number(num % 256n);
      num = num / 256n;
      offset++;
    }
  }

  try {
    const uncompressed = inflate(new Uint8Array(data));
    const trace = String.fromCharCode.apply(null, uncompressed);
    return trace;
  } catch {
    return null;
  }
};

const parseUrl = () => {
  const query = getUrlQuery();
  if (!query) {
    return null;
  }

  const params = new URLSearchParams(query);
  if (!validParams(params)) {
    return null;
  }

  const architecture = params.get(UrlParams.ARCHITECTURE);
  const version = params.get(UrlParams.VERSION);
  const encodedData = params.get(UrlParams.ENCODED_DATA);

  const trace = parseTrace(encodedData);

  return { architecture, version, trace };
};

export default parseUrl;
