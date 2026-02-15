const STORAGE_KEY = "lightMode";

const themes =
{
    dark:
    {
        "--bg-color": "#09090b",
        "--card-bg": "rgba(24, 24, 27, 0.6)",
        "--border-color": "#27272a",
        "--text-color": "#fafafa",
        "--text-muted": "#a1a1aa",
        "--header-bg": "rgba(9, 9, 11, 0.8)",
        "--mesh-opacity": "0.2",
        "--mesh-blur": "120px",
    },
    light:
    {
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

function safeGetStorage()
{
    try
    {
        return localStorage.getItem(STORAGE_KEY);
    }
    catch
    {
        return null;
    }
}

function safeSetStorage(value)
{
    try
    {
        localStorage.setItem(STORAGE_KEY, value);
    }
    catch { } // Ignore write failures (private mode or blocked storage).
}

function applyTheme(themeName, persist = true)
{
    const theme = themes[themeName] || themes.dark;
    const root = document.documentElement;

    for (const key in theme)
    {
        root.style.setProperty(key, theme[key]);
    }

    root.dataset.theme = themeName;

    if (persist)
    {
        safeSetStorage(themeName === "light" ? "enabled" : "disabled");
    }
}

function resolveInitialTheme()
{
    const stored = safeGetStorage();
    if (stored === "enabled") { return "light"; }
    if (stored === "disabled") { return "dark"; }

    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
        ? "light" : "dark";
}

applyTheme(resolveInitialTheme(), false);

if (window.matchMedia)
{
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncSystemTheme = ((event) =>
    {
        const stored = safeGetStorage();

        if (stored === null)
        {
            applyTheme(event.matches ? "light" : "dark", false);
        }
    });

    if (typeof media.addEventListener === "function")
    {
        media.addEventListener("change", syncSystemTheme);
    }
}

export function toggleTheme()
{
    const toggled = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(toggled);

    //So that dropdowns instantly change colour
    let dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++)
    {
        dropdowns[i].style.transition = "height 0.2s cubic-bezier(0.1, 0.9, 1, 1)";
        requestAnimationFrame(() =>
        {
            dropdowns[i].style.transition =
            "background-color 0.2s cubic-bezier(0.1, 0.9, 1, 1), height 0.2s cubic-bezier(0.1, 0.9, 1, 1)";
        });
    }
}