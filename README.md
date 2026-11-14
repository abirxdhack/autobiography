# The Autobiography of Abir Arafat Chawdhury

My personal autobiography website — my life told in my own words, across 21 stories: public speaking, the silence behind my personality, the battles nobody sees, code, football, family, faith and the future I am building.

Built with plain **HTML5, CSS3 and vanilla JavaScript (ES modules)**. No framework, no build step, no dependencies to install.

## Features

- Home page with my introduction, live age counter, skills, tech stack, projects, achievements, education, values, roadmap and résumé
- Photo gallery with filters and a full-screen photo viewer (keyboard and touch friendly)
- A separate page for every life story, with chapters, photos and previous / next navigation
- An "All Stories" library with search and theme filters
- Live GitHub section with profile stats, featured repositories and README widgets
- A live daily visits dashboard with charts
- Light, dark and system themes
- Works on phones, tablets, laptops and large screens

## Project structure

```text
index.html                     Home page
stories/index.html             All Stories library
stories/<story>/index.html     One page per story
public-speaking/index.html     Story pages with their own address
the-silence/index.html
battles-nobody-sees/index.html
404.html                       Page-not-found screen
assets/css/styles.css          All styles
assets/js/main.js              Starts every feature on the page
assets/js/theme-init.js        Applies the saved theme before the page paints
assets/js/not-found.js         Script for the 404 page
assets/js/modules/             One file per feature (theme, gallery, visits, GitHub…)
assets/js/data/photos.js       Photo captions for the photo viewer
assets/images/                 Photos, icons and social preview image
assets/icons/tech/             Tech stack logos
assets/docs/                   Résumé PDF
database/visits-counter.sql    Database setup for the visits counter
.github/workflows/deploy.yml   Automatic GitHub Pages deployment
```

## Run locally

The pages use JavaScript modules, so open them through a small local web server rather than double-clicking the file.

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Any static server works (for example `npx serve .`).

## Deploy to GitHub Pages

1. Create a repository on GitHub (for example `autobiography-`) and upload every file and folder from this project, including the hidden `.github` folder.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch. The **Deploy to GitHub Pages** workflow publishes the site automatically, and every later push to `main` redeploys it.
4. Your site will be live at `https://<your-username>.github.io/<repository-name>/`.

All links and files use relative paths, so the site works under any repository name or a custom domain.

If your web address is different from `https://abirxdhack.github.io/autobiography-/`, replace that address in `sitemap.xml`, `robots.txt` and the `og:image` / `twitter:image` tags in `index.html` so search engines and link previews point to the right place.

## Visits counter

The Daily Visits dashboard reads and records visits through the database address and public key in `assets/js/modules/config.js`. Visits are not recorded while you browse on `localhost`.

To move the counter to your own free Supabase project: create a project at <https://supabase.com>, run `database/visits-counter.sql` in its SQL editor, then put the new project URL and publishable (anon) key into `assets/js/modules/config.js`.

## Author

**Abir Arafat Chawdhury** — student developer and self-taught programmer.
