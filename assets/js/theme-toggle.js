(() => {
  const STORAGE_KEY = "lightMode";

  const themes = {
    dark: {
      "--black": "#fafafa",
      "--white-darkerer": "#3f3f46",
      "--white-darker": "#27272a",
      "--white": "#09090b",
      "--bg-color": "#09090b",
      "--card-bg": "rgba(24, 24, 27, 0.6)",
      "--border-color": "#27272a",
      "--text-color": "#fafafa",
      "--text-muted": "#a1a1aa",
      "--header-bg": "rgba(9, 9, 11, 0.8)",
      "--mesh-opacity": "0.2",
      "--mesh-blur": "120px",
    },
    light: {
      "--black": "#18181b",
      "--white-darkerer": "#d4d4d8",
      "--white-darker": "#e4e4e7",
      "--white": "#ffffff",
      "--bg-color": "#ffffff",
      "--card-bg": "rgba(24, 24, 27, 0.05)",
      "--border-color": "#e4e4e7",
      "--text-color": "#18181b",
      "--text-muted": "#52525b",
      "--header-bg": "rgba(255, 255, 255, 0.82)",
      "--mesh-opacity": "0.055",
      "--mesh-blur": "132px",
    },
  };

  function safeGetStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function safeSetStorage(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore write failures (private mode or blocked storage).
    }
  }

  function applyTheme(themeName, persist = true) {
    const theme = themes[themeName] || themes.dark;
    const root = document.documentElement;

    for (const key in theme) {
      root.style.setProperty(key, theme[key]);
    }

    root.dataset.theme = themeName;

    if (persist) {
      safeSetStorage(themeName === "light" ? "enabled" : "disabled");
    }
  }

  function resolveInitialTheme() {
    const stored = safeGetStorage();
    if (stored === "enabled") {
      return "light";
    }
    if (stored === "disabled") {
      return "dark";
    }

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  }

  applyTheme(resolveInitialTheme(), false);

  window.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (!target.closest(".mode")) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      toggleTheme();
    },
    true,
  );

  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (!target.classList.contains("mode")) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      toggleTheme();
    },
    true,
  );

  if (window.matchMedia) {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncSystemTheme = (event) => {
      const stored = safeGetStorage();
      if (stored === "enabled" || stored === "disabled") {
        return;
      }

      applyTheme(event.matches ? "light" : "dark", false);
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", syncSystemTheme);
    } else if (typeof media.addListener === "function") {
      media.addListener(syncSystemTheme);
    }
  }
})();
