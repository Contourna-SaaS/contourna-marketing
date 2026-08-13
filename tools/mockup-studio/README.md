# Mockup Studio

Local-only tool for turning raw app screenshots into marketing-ready mockup images
(device frames + brand illustrations) for the Contourna marketing site.

Not part of the Next build. Nothing here is deployed — it lives outside `src/` and `public/`.

## Run

```bash
./tools/mockup-studio/serve.sh          # http://localhost:4321/tools/mockup-studio/
PORT=5000 ./tools/mockup-studio/serve.sh
```

Or just open `tools/mockup-studio/index.html` in a browser — everything works except the
"quick load existing image" buttons, which need the server to read `/public/images/*.png`.

## Use

1. Pick a preset (Hero / Feature / Web + phone / Mobile only / Square card).
2. Load screenshots: drag a file onto a slot, click the slot to browse, or ⌘V to paste
   into the highlighted slot. Screen A is the primary, Screen B is the optional
   second device (phone overlap, side by side, or offset behind).
3. Tweak frame, crop, image fit, tilt, background, padding, shadow, scene, floating labels.
4. Set export width, then **Download PNG** (or **Copy** for straight-to-Figma/Slack).

Export width is the real pixel width. Use ~2400px for hero images, ~1800px for
feature sections, ~1600px for square cards.

## Adding an export to the site

```bash
mv ~/Downloads/mock.png public/images/hero-dashboard.png
```

Then reference it in `src/components/marketing/MarketingHome.tsx` with the real pixel
dimensions (`next/image` needs `width`/`height` to match the file):

```tsx
<Image src="/images/hero-dashboard.png" alt="…" width={2400} height={1500} />
```

If the mockup already carries its own shadow/background, drop the wrapper
`rounded-2xl border shadow-…` classes on the existing `<Image>` so it isn't framed twice.
Transparent background export is the option to use when the section already has one.

## Scenes

One composed backdrop instead of a pile of toggles, with a single Strength slider and
prev/next buttons to flip through them:

`Contour lines` (topographic, plays off the product name) · `Halftone fade` ·
`Blueprint grid` · `Colour blocks` · `Diagonal ribbon` · `Stacked windows` ·
`Floating documents` · `Spotlight` · `Concentric rings` · `Diagonal hatch` ·
`Rhythm bars` · `Approval checks` · `Duotone wedge` · `Offset outline` · `None`

No logo-mark scene on purpose — redrawing the mark in canvas never matches the real SVG.
If a mock needs the logo, composite `public/images/contourna-mark.svg` in afterwards.

Deliberately flat and geometric. The marketing sections already draw their own dot grid
(`.bg-dot-grid`) and blurred yellow circles, so repeating those inside the exported image
only muddies the section — pick a scene that adds something the section doesn't already have,
or `None` plus a transparent background.

## URL parameters

Handy for reloading a setup, or diffing scenes side by side:

```
?a=dashboard.png&b=manual.png&preset=duo&scene=contour&bg=cream&bare=1
```

`a` / `b` load from `public/images/`, `bare=1` hides the sidebar.

## Screenshot tips

- Web: capture the browser viewport only (no OS chrome) — the tool draws the browser
  window. Retina capture, ~1600px+ wide.
- Mobile: portrait device screenshot as-is. The phone frame always renders portrait — feed it
  a landscape shot and the sides get center-cropped hard, so the studio shows a red warning
  above the canvas when that happens. Switch the frame to Browser/Tablet, or set
  `Image fit: Contain` to letterbox the whole shot instead of cropping it.
- Frames that draw their own chrome: Browser, Laptop, Tablet, Phone. Use `Plain card`
  when the screenshot already includes chrome.
