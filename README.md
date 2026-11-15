# miaosando.com — Miao Sando 喵三哆 · 喵三哆的猫生日记

Static site for **Miao Sando（喵三哆）**, a real silver British Shorthair starring in AI-made YouTube Shorts.

- `site/` — the website source (HTML/CSS/JS). Images (favicon + `img/`) live in `assets/assets.tgz.b64.part*` — a base64 tar.gz bundle unpacked into the site at build time.
- `.github/workflows/publish.yml` — on every push to `main`, decodes images and publishes `site/` to the `gh-pages` branch (served by GitHub Pages).
- **Edit `site/config.js`** to set the YouTube channel URL, episode video IDs and contact email.
- Custom domain: `site/CNAME` → `miaosando.com`.
