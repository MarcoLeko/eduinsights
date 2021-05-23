function detectThemeSchema() {
  let theme;

  const userPreferredTheme = localStorage.getItem("theme");

  if (userPreferredTheme === "dark") {
    theme = "dark";
  } else if (!window.matchMedia) {
    theme = "light";
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }

  document.documentElement.setAttribute("data-theme", theme);

  return theme;
}

function setThemeSchema(theme) {
  const userTheme = theme === "dark" ? "dark" : "light";
  localStorage.setItem("theme", userTheme);
}

export { detectThemeSchema, setThemeSchema };
