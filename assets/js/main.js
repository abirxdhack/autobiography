import { IS_LOCAL, sitePath } from "./modules/config.js";
import { initFooter } from "./modules/footer.js";
import { initGallery } from "./modules/gallery.js";
import { initGithub } from "./modules/github.js";
import { initHomeHeader } from "./modules/header.js";
import { initLibrary } from "./modules/library.js";
import { initLightbox } from "./modules/lightbox.js";
import { initLiveAge } from "./modules/live-age.js";
import { initResume } from "./modules/resume.js";
import { initReveal } from "./modules/reveal.js";
import { initPageScroll, initSmoothAnchors } from "./modules/scroll.js";
import { initSkills } from "./modules/skills.js";
import { initStatsStrip } from "./modules/stats-strip.js";
import { initStoryShelf } from "./modules/story-shelf.js";
import { initTheme } from "./modules/theme.js";
import { recordVisit } from "./modules/visits-api.js";
import { initVisits, refreshVisits } from "./modules/visits.js";

initTheme();
initReveal();
initFooter();
initSmoothAnchors();
initLightbox();
initPageScroll();
initHomeHeader();
initLiveAge();
initSkills();
initStatsStrip();
initGallery();
initStoryShelf();
initGithub();
initVisits();
initResume();
initLibrary();

if (!IS_LOCAL) {
  recordVisit(sitePath())
    .then(() => refreshVisits(true))
    .catch(() => {});
}
