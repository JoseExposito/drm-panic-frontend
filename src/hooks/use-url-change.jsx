import { useEffect } from "react";

const useUrlChange = (callback) => {
  useEffect(() => {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const handleChange = () => {
      callback();
    };

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleChange();
    };

    window.addEventListener("popstate", handleChange);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handleChange);
    };
  }, [callback]);
};

export default useUrlChange;
