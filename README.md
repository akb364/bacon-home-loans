# Bacon Home Loans

Static Next.js website for Austin Bacon, NMLS ID: 2728600, powered by Artemis Mortgage.

## Local Development

This project uses Next.js 16 and requires Node 20.9 or newer.

```bash
npm install
npm run dev
```

## GitHub Pages

The project is configured to deploy from GitHub Actions. After pushing to `main`, enable GitHub Pages in the repository settings and choose **GitHub Actions** as the source.

The workflow automatically sets the base path for a project Pages URL such as:

```text
https://YOUR-GITHUB-USERNAME.github.io/bacon-home-loans/
```

When the final domain is ready, update DNS and set `NEXT_PUBLIC_SITE_URL` / canonical settings to `https://www.baconhomeloans.com`.
