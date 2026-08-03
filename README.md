# Simby Studio — website

Public website for the Simby Studio creator tool, used as the official website,
Terms of Service, and Privacy Policy source for the TikTok and YouTube developer apps.

Static site, no build step. Every link is relative, so the same files work both
under the GitHub Pages project sub-path and at a custom domain root.

## Pages

| Path | Purpose |
|---|---|
| `/` | Landing page: what the tool does, screenshots, CTA |
| `/features/` | Feature detail and the API scopes requested |
| `/how-it-works/` | Six-step publishing walkthrough |
| `/post/` | Live TikTok Content Posting API publishing UX |
| `/support/` | Contact, data deletion procedure, FAQ |
| `/terms/` | Terms of Service |
| `/privacy-policy/` | Privacy Policy |
| `/privacy/` | Legacy path, redirects to `/privacy-policy/` |
| `/oauth/callback/` | OAuth redirect target, hands off to the desktop app |

## Assets

- `icon.svg` — icon source. Regenerate the raster sizes from it, do not edit the PNGs by hand.
- `favicon.ico`, `icon-192.png`, `icon-512.png` — must stay identical to the icon uploaded to the developer consoles.
- `assets/site.css` — shared stylesheet.
- `assets/shot-1..3.png` — screenshots captured from the live `/post/` page.

Regenerate the icons:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --screenshot=icon-512.png --window-size=512,512 "file://$PWD/icon.svg"
cp icon-512.png icon-192.png && sips -z 192 192 icon-192.png
```

## Local preview

```bash
python3 -m http.server 8123
open http://127.0.0.1:8123/
```

## Deployment

Pushing to `main` publishes via GitHub Pages.

See `HANDOFF.md` for the remaining manual steps: domain purchase, DNS, the `CNAME`
file, email forwarding, and the TikTok developer console fields.
