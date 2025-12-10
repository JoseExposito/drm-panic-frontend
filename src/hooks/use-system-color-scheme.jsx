import { useEffect } from "react";

const useSystemColorScheme = () => {
  useEffect(() => {
    const updateColorScheme = (preferDarkSchema) => {
      const root = document.documentElement;
      root.classList.remove("pf-v6-theme-light", "pf-v6-theme-dark");
      root.classList.add(
        preferDarkSchema ? "pf-v6-theme-dark" : "pf-v6-theme-light",
      );
    };

    const onColorSchemeChanged = (event) => {
      const preferDarkSchema = event.matches;
      updateColorScheme(preferDarkSchema);
    };

    const preferDarkSchema =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    updateColorScheme(preferDarkSchema);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onColorSchemeChanged);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onColorSchemeChanged);
    };
  }, []);
};

export default useSystemColorScheme;
