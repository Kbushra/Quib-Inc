//Execute top-level code for all scripts
import "./clickables.js";
import "./contact.js";
import "./content.js";
import "./game-ids.js";
import "./game-page.js";
import "./header-footer.js";
import "./iframes.js";
import "./news.js";
import "./shuffle-featured.js";
import "./theme-toggle.js";
import "./width-update.js";

//Import functions for running on observer
import { clickableListeners } from "./clickables.js";
import { formListeners } from "./contact.js";
import { iframeListeners } from "./iframes.js";
import { updateWidth } from "./width-update.js";

const observer = new MutationObserver(() =>
{
    clickableListeners();
    formListeners();
    iframeListeners();
    updateWidth();
});

observer.observe(document.body, { childList: true, subtree: true });
