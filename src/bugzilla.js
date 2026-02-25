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

export const getBugzillaURL = () => process.env.WEBPACK_BUGZILLA_URL;

export const getBugzillaReportBugURL = (fedoraVersion) =>
  `${getBugzillaURL()}/enter_bug.cgi?product=Fedora&version=${fedoraVersion}&component=kernel`;
