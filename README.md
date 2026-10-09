# GoldHunterTech

React + TypeScript + Vite, a Hono API on Cloudflare Workers, and D1 enquiry storage. Frontend and API share one origin. No Python or IMAP server is needed to receive quotations.

## Local development

Use Node 22 or later. From the root:

```sh
npm ci
npm ci --prefix frontend
npm run build
npm run db:local
npm run dev
```

Open http://localhost:8787. For frontend hot reload, also run `npm --prefix frontend run dev`; Vite proxies `/api` to the local Worker.

## Production and Git flow

Live site: https://goldhuntertech.orozone08.workers.dev

The Wrangler config targets Orozone08@gmail.com's Cloudflare account. A dedicated D1 database stores every quotation field with an ID and timestamp. `/api/health` checks database connectivity. No public API exposes customer records; inspect them in the authenticated Cloudflare D1 console.

Create feature branches and open PRs into `main`. The Cloudflare workflow validates PRs without production access. Pushes to `main` build, migrate, deploy and verify production. Configure repository Actions secret `CLOUDFLARE_API_TOKEN` with Workers Scripts Edit, D1 Edit and Account Settings Read scoped to this account. Add Workers R2 Storage Edit after R2 activation. Never store a short-lived local OAuth token as a CI secret.

For manual deployment, run `npm run deploy` after authenticating Wrangler. Revert and push a commit to roll back code. Preserve migrations already applied; fix schema with new additive migrations. Code rollback does not revert database data.

## Optional R2 uploads

Normal enquiries work without R2. File inputs stay disabled until health reports `attachments: true`.

1. Activate R2 in the target account.
2. Run `npx wrangler r2 bucket create goldhuntertech-attachments`.
3. Add the commented `r2_buckets` binding in `wrangler.jsonc`.
4. Push to `main` to deploy and enable uploads automatically.

Attachments are private, limited to 5 MB and stored under UUID keys. Filename, MIME type and size are retained in D1. No public download route is exposed. Failed database writes remove the corresponding uploaded object. Production R2 upload verification is pending activation.

The original Python backend's enquiry log and uploads are not in this repository. If a previously hosted copy contains records, import those separately before retiring that service.
