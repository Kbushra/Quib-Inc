const STORAGE_KEY = "lightMode";

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

function resolveInitialTheme()
{
    const stored = safeGetStorage();
    if (stored !== null) { return stored; }

    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
        ? "light" : "dark";
}

document.documentElement.dataset.theme = resolveInitialTheme();

if (window.matchMedia)
{
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncSystemTheme = ((event) =>
    {
        const stored = safeGetStorage();

        if (stored === null)
        {
            document.documentElement.dataset.theme = resolveInitialTheme();
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
    document.documentElement.dataset.theme = toggled;
    safeSetStorage(toggled);

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