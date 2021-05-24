function detectTheme() {
  let theme;

  const userPreferredTheme = localStorage.getItem("theme");

  if (userPreferredTheme) {
    theme = userPreferredTheme;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  } else {
    theme = "light";
  }

  document.documentElement.setAttribute("data-theme", theme);

  return theme;
}

export { detectTheme };
