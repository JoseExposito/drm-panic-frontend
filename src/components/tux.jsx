import React from "react";
import PropTypes from "prop-types";

const Tux = ({ isError }) => {
  const ok = `
     .--.        _
    |o_o |      | |
    |:_/ |      | |
   //   \\ \\     |_|
  (|     | )     _
 /'\\_   _/\`\\    (_)
 \\___)=(___/`;

  const error = `
     .--.         ___
    |o_o |      /  _  \\
    |:_/ |      \\_/ | |
   //   \\ \\        / /
  (|     | )      |_|
 /'\\_   _/\`\\       _
 \\___)=(___/      (_)`;

  const text = isError ? error : ok;

  return (
    <pre className="ascii-tux" aria-hidden>
      {text}
    </pre>
  );
};

Tux.propTypes = {
  isError: PropTypes.bool,
};

export default Tux;
