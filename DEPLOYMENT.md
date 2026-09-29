# Legatech deployment

## Local build

`npm run build` first fetches published WordPress posts and then writes the static website to `out/`. Use `npm run build:offline` only to test the last successfully synchronized blog snapshot.

Preview the export with `npm run preview:static` and open `http://localhost:3000`.

## SiteGround contact configuration

1. Copy `server/contact/contact-config.example.php` to a directory outside `public_html`, normally `private/legatech-contact.php` next to `public_html`.
2. Add the real SiteGround SMTP password and a random `rate_limit_salt` of at least 24 characters.
3. Run Composer through the workflow or SiteGround SSH; `public/api/vendor/` must exist in the deployed output.
4. The endpoint sends only to `info@legatech.hr`. Keep `allowed_origins` limited to `https://legatech.hr` and `https://www.legatech.hr`.

## Production deployment

`staging2.legatech.hr` is the WordPress content source, **not** a frontend staging deployment. The new website is released directly to `legatech.hr` through a controlled production workflow.

Create a `production` environment in the GitHub repository with these secrets (never commit them):

- `SITEGROUND_SSH_HOST`
- `SITEGROUND_SSH_PORT`
- `SITEGROUND_SSH_USER`
- `SITEGROUND_SSH_PRIVATE_KEY`
- `SITEGROUND_SSH_KEY_PASSPHRASE` (only if the private key is encrypted; the workflow unlocks it in an ephemeral SSH agent)
- `SITEGROUND_KNOWN_HOSTS` (the verified SSH host-key line, including `[host]:port` for a non-default port)
- `SITEGROUND_DEPLOY_PATH` (the existing, canonical, absolute path ending in `/public_html` for `legatech.hr`)

Restrict the environment to the `main` branch. Verify the SiteGround SSH host-key fingerprint independently before saving `SITEGROUND_KNOWN_HOSTS`; do not trust an unverified `ssh-keyscan` result.

Set `SITEGROUND_SITE_URL=https://legatech.hr` as a repository variable. The workflow checks the homepage, a unique release marker, and that `GET /api/contact.php` returns JSON with HTTP 405; a static server that exposes PHP source fails this check. The private `private/legatech-contact.php` file must already exist next to the production `public_html` directory. Also create a plain-text `.legatech-environment` file **next to** `public_html` containing exactly `production`. This server-side marker guards against a wrongly scoped deploy path. Verify that the GitHub plan supports environment secrets for this repository before enabling deployment.

The release sequence is:

1. Push the reviewed changes to `main`. A push builds and uploads an artifact but **does not deploy**.
2. Confirm the build, deployment-script tests, PHP dependency packaging, and SEO export pass in GitHub Actions.
3. Manually run **Build and deploy Legatech** from `main`. This builds again and deploys to the production environment, with a server-side backup and rollback on failure.
4. On the live site, submit one controlled enquiry and confirm the success message, delivered email, and reply-to address. Check the key routes, cookie consent, and analytics.
5. Only then set repository variable `LEGATECH_AUTO_PUBLISH=true`. Publishing or updating a controlled WordPress post on `staging2.legatech.hr` will trigger a fresh build and automatic production deploy. Verify the new article appears on `legatech.hr`.

Keep `LEGATECH_AUTO_PUBLISH` unset until step 5. The workflow fails before upload if the production secrets, private contact configuration, environment marker, or URL are missing. Its release job is serialized and is never cancelled mid-deployment. If the live checks fail, leave auto-publishing disabled and restore the previous release.

On the first deployment, the server script backs up the existing `public_html` contents. Later releases back up only files owned by the previous manifest, and unmanaged hosting files are never deleted. Each workflow run has a unique backup directory under `$HOME/legatech-deploy/backups/`. A shell error during installation or a failed HTTP smoke test triggers rollback. If that rollback itself fails, inspect the matching backup before another release. The server-side script also accepts `--rollback <public_html path> <release ID> <staging|production>` for a controlled manual rollback of the currently active release.

Backups are retained rather than deleted automatically. Monitor hosting disk usage and archive or prune older verified backups deliberately after the release is accepted, especially if WordPress publishing is frequent.

## Analytics and Search Console

Create the repository variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` with value `G-956PBX0RC6`. The build has the same value as a safe fallback, but the repository variable keeps the deployment configuration explicit. Google Analytics is loaded only after affirmative cookie consent.

In the GA4 property settings:

- set event data retention to two months;
- keep Google Signals disabled;
- keep ads personalization and Google Ads linking disabled;
- mark `generate_lead` as a key event if contact submissions should appear as conversions.

Search Console requires an account-level action and a Google-generated DNS value:

1. Create a Domain property named `legatech.hr` in Google Search Console.
2. Copy the generated `google-site-verification=...` TXT value.
3. Add it to the DNS zone for `legatech.hr` in SiteGround, at the root host.
4. Return to Search Console and select **Verify** after DNS propagation.
5. Submit `https://legatech.hr/sitemap.xml` and inspect the homepage plus the four primary service URLs.

Search Console does not require any browser script or cookie on the public website.

## SiteGround CDN after a release

Static HTML responses send `Cache-Control: no-cache, no-store, must-revalidate` so a new deploy cannot remain hidden behind an old CDN copy. Hashed CSS, JavaScript, fonts and images remain cacheable.

After introducing these headers for the first time, clear the already stored CDN copy once in **Site Tools > Speed > SiteGround CDN > Purge Cache**. SiteGround notes that worldwide invalidation can take up to 180 seconds. Future HTML releases should then become visible without waiting for the previous static HTML TTL.

## WordPress publish trigger

The file `wordpress/mu-plugins/legatech-static-deploy.php` belongs in `wp-content/mu-plugins/` on `staging2.legatech.hr`.

Create a fine-grained GitHub token limited to `legatech-web` with repository permission `Contents: Read and write`, which GitHub requires for repository dispatch events. Store it in `wp-config.php`, not in WordPress options:

```php
define('LEGATECH_GITHUB_REPOSITORY', 'GITHUB_KORISNIK/legatech-web');
define('LEGATECH_GITHUB_TOKEN', 'github_pat_...');
```

Publishing, updating, unpublishing, scheduling or deleting a post starts one build. With `LEGATECH_AUTO_PUBLISH=true`, a successful build deploys to `legatech.hr`; otherwise it only uploads an artifact and the live site is unchanged.

GitHub Actions stores the last successful WordPress snapshot. Code deployments may use that snapshot when SiteGround temporarily blocks the REST request, while a WordPress content-change deployment fails safely unless fresh content was downloaded.
