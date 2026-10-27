# Sadisu Hassan — portfolio

Personal portfolio site for Sadisu Hassan, IT support and systems specialist in Calgary.

Live site: https://citizen-sadi.github.io/portfolio/

## Structure

- `index.html` — the whole page
- `style.css` — styles, including light and dark themes
- `script.js` — mobile menu, the "What I do" line animation, and the contact form
- `assets/` — optimized photos and project screenshots
- `Sadisu_Hassan_Resume.pdf` — the résumé linked from the site

No build step. Edit the files and push to `main`; GitHub Pages serves them as they are.

## Updating

- **Résumé:** replace `Sadisu_Hassan_Resume.pdf` with a new file of the same name.
- **Experience:** each job is an `<li class="role">` inside `<ol class="timeline">` in `index.html`.
- **Projects:** copy an `<article class="project">` block and add a 3:2 screenshot to `assets/`.
- **Contact form:** submissions go to the Google Apps Script URL at the bottom of `script.js`.
