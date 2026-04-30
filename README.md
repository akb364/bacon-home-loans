# Bacon Home Loans

Static Next.js website for Austin Bacon, NMLS ID: 2728600, powered by Artemis Mortgage.

## Local Development

This project uses Next.js 16 and requires Node 20.9 or newer.

```bash
npm install
npm run dev
```

## Headshot

Add Austin's headshot here:

```text
public/austin-bacon-headshot.JPG
```

Use a square or portrait-oriented JPG if possible. The site includes an initials fallback until the
image is added.

## GitHub Pages

The project is configured to deploy from GitHub Actions. After merging a feature branch into `main`, enable GitHub Pages in the repository settings and choose **GitHub Actions** as the source.

The production site is configured for:

```text
https://baconhomeloans.com
```

The custom domain is set by `public/CNAME`, which GitHub Pages uses during deployment.

### Configure DNS

In the DNS settings where `baconhomeloans.com` was purchased, add these records for the apex domain:

```text
Type   Name  Value
A      @     185.199.108.153
A      @     185.199.109.153
A      @     185.199.110.153
A      @     185.199.111.153
AAAA   @     2606:50c0:8000::153
AAAA   @     2606:50c0:8001::153
AAAA   @     2606:50c0:8002::153
AAAA   @     2606:50c0:8003::153
```

Add this record for `www.baconhomeloans.com`:

```text
Type   Name  Value
CNAME  www   akb364.github.io
```

Remove any conflicting `A`, `AAAA`, `CNAME`, `ALIAS`, `URL Redirect`, `Masked Redirect`, or parking records for `@` or `www`.

After DNS is added, open the repository on GitHub and go to:

```text
Settings -> Pages -> Custom domain
```

Enter:

```text
baconhomeloans.com
```

Then enable **Enforce HTTPS** once GitHub finishes checking DNS.

## Branch Workflow

Use feature branches for changes:

```bash
git checkout main
git pull origin main
git checkout -b feature/descriptive-name
```

After making changes:

```bash
git add .
git commit -m "Describe the change"
git push -u origin feature/descriptive-name
```

Then open a pull request on GitHub and merge into `main` after review.

## Contact Form Lead Capture

The site is static, so the contact form sends leads to a Google Apps Script web app. That script sends an email and appends the lead to Google Sheets.

### Create The Google Sheet

1. Create a Google Sheet named `Bacon Home Loans Leads`.
2. Open `Extensions` -> `Apps Script`.
3. Paste the contents of `integrations/google-apps-script/lead-capture.gs`.
4. Save the project.

### Deploy The Script

1. In Apps Script, click `Deploy` -> `New deployment`.
2. Choose `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Deploy and authorize the permissions.
6. Copy the Web app URL.

### Configure GitHub Pages

Add the Apps Script Web app URL as a GitHub repository secret:

```text
Settings -> Secrets and variables -> Actions -> New repository secret
Name: LEAD_ENDPOINT
Value: YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL
```

The GitHub Pages workflow passes that value into the static build as `NEXT_PUBLIC_LEAD_ENDPOINT`.

For local testing, create `.env.local`:

```bash
NEXT_PUBLIC_LEAD_ENDPOINT=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL
```

Then restart the dev server.
