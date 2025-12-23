/**
 * Check if a string is a valid positive number.
 * @param {string} str String to check.
 * @returns If "str" is a number or not.
 */
export const isNumeric = (str) => /^\d+$/.test(str);

/**
 * Given a kernel version like "6.17.8-200.fc42.x86_64" returns the Fedora
 * version as string, in the example, "42".
 * Defaults to "rawhide" if there was an error parsing the string.
 *
 * @param {string} version Version to parse.
 * @returns {string} The Fedora version as string.
 */
export const getFedoraVersion = (version) => {
  const fcIndex = version.indexOf("fc");
  if (fcIndex === -1) {
    return "rawhide";
  }

  const dotIndex = version.indexOf(".", fcIndex);
  if (dotIndex === -1) {
    return "rawhide";
  }

  const fedoraVersion = version.substring(fcIndex + "fc".length, dotIndex);
  if (!isNumeric(fedoraVersion)) {
    return "rawhide";
  }

  return fedoraVersion;
};

const reportBug = async (architecture, version, trace) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiKey = process.env.WEBPACK_BUGZILLA_API_KEY;
  const url = `${process.env.WEBPACK_BUGZILLA_URL}/rest/bug`;

  let headers = {};

  // bugzilla.redhat.com uses the Authorization header:
  // https://bugzilla.redhat.com/docs/en/html/api/core/v1/general.html#authentication
  if (isProduction) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const description =
    "This is a bug report generated from a DRM Panic:\n" +
    `Linux kernel version: ${version}\n` +
    `Architecture: ${architecture}\n` +
    `Error trace:\n${trace}`;

  // Common parameters
  let body = {
    product: "Fedora",
    component: "kernel",
    summary: "DRM Panic bug report",
    description,
  };

  // Additional parameters required by bugzilla.redhat.com:
  // https://bugzilla.redhat.com/docs/en/html/api/core/v1/bug.html#create-bug
  // And by the local Bugzilla web server.
  if (isProduction) {
    body.version = getFedoraVersion(version);
  } else {
    body.version = "unspecified";
    body.priority = "normal";
    body.op_sys = "Linux";
    body.platform = "pc";

    // The local Bugzilla server uses this authentication method:
    body.Bugzilla_api_key = apiKey;
  }

  try {
    let res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const { id } = await res.json();
    return `${process.env.WEBPACK_BUGZILLA_URL}/show_bug.cgi?id=${id}`;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default reportBug;
