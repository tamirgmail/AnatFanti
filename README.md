# Anat Fanti Website

Static, Vercel-ready bilingual website for a wellbeing researcher and speaker.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server.

## Hidden editor

Open `index.html#admin` or type `welledit` on the page. Prototype password:

```text
change-me
```

The editor saves changes to the current browser with `localStorage`. Use **Export JSON** to keep edited content. For a real private CMS on Vercel, wire the same content shape to a backend such as Sanity, Decap CMS, Supabase, or Vercel KV plus proper authentication.

## Deploy to Vercel

Deploy this folder as a static site. No build command is required.

Recommended environments:

- `main` branch: live production site, for example `something.com` or `www.something.com`.
- `staging` branch: staging site, for example `staging.something.com`.

In Vercel, import the GitHub repo, set `main` as the production branch, then add
`staging.something.com` as a custom domain assigned to the `staging` branch.
