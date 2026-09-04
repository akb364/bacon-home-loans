# Vercel deployment

This application is deployed as a second project from the existing `akb364/bacon-home-loans` repository. The original GitHub Pages project remains at the repository root.

## 1. Publish the application to GitHub

The app currently exists locally and must be committed before Vercel can see it.

```powershell
cd C:\Users\akbac\OneDrive\Documents\Projects\bacon-home-loans
gh auth login -h github.com
git switch -c feature/property-report-engine
git add -- property-report-engine
git commit -m "Add property report engine scaffold"
git push -u origin feature/property-report-engine
```

Open the pull request, review it, and merge it into `main`. The existing GitHub Pages workflow continues to build the repository-root application; the nested application is deployed separately by Vercel.

## 2. Import the repository into Vercel

1. In Vercel, select **Add New → Project**.
2. Connect GitHub if prompted and import `akb364/bacon-home-loans`.
3. Set the project name to `bacon-property-report-engine`.
4. Set **Root Directory** to `property-report-engine`.
5. Set **Framework Preset** to Next.js.
6. Under **Build & Development Settings**, use the Next.js defaults:
   - Build Command: `next build` (do not override)
   - Output Directory: Next.js default (turn off the override; do not enter `public`)
   - Install Command: `npm install` (do not override)
7. Add these environment variables for Production, Preview, and Development:

```text
PROPERTY_DATA_PROVIDER=manual
NEXT_PUBLIC_APP_URL=https://report.baconhomeloans.com
```

Do not add an empty `RENTCAST_API_KEY` or `DATABASE_URL`. Add real values later through Vercel's encrypted environment settings. Never create a `NEXT_PUBLIC_RENTCAST_API_KEY`.

8. Select **Deploy**.

The included `vercel.json` also pins the framework to Next.js. A `public` folder is optional in Next.js and is not the application's build output; Vercel consumes the framework build directly.

## 3. Connect the subdomain

After the first deployment succeeds:

1. Open the Vercel project.
2. Go to **Settings → Domains**.
3. Add `report.baconhomeloans.com`.
4. Copy the exact CNAME target Vercel displays.
5. At the current DNS provider for `baconhomeloans.com`, add:

```text
Type:  CNAME
Name:  report
Value: [the exact target supplied by Vercel]
TTL:   Automatic/default
```

Do not change the apex (`@`) or `www` records; those continue serving the existing GitHub Pages site. Remove only a pre-existing conflicting record named `report`, if one exists.

6. Return to Vercel and wait for the domain status to become valid. Vercel provisions HTTPS automatically after DNS verification.

## 4. Verify

- Open the Vercel-generated URL first.
- Open `https://report.baconhomeloans.com` after DNS validates.
- Generate a sample report and use **Export PDF**.
- Confirm `https://baconhomeloans.com` still serves the original site.

## Future production variables

Add these only when their integrations are implemented and credentials exist:

```text
PROPERTY_DATA_PROVIDER=rentcast
RENTCAST_API_KEY=[server-side secret]
DATABASE_URL=[server-side Supabase/PostgreSQL connection]
```
