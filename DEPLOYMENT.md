# Legatech deployment

## Local build

`npm run build` first fetches published WordPress posts and then writes the static website to `out/`. Use `npm run build:offline` only to test the last successfully synchronized blog snapshot.

Preview the export with `npm run preview:static` and open `http://localhost:3000`.

## SiteGround contact configuration

1. Copy `server/contact/contact-config.example.php` to a directory outside `public_html`, normally `private/legatech-contact.php` next to `public_html`.
2. Add the real SiteGround SMTP password and a random `rate_limit_salt` of at least 24 characters.
3. Run Composer through the workflow or SiteGround SSH; `public/api/vendor/` must exist in the deployed output.
4. The endpoint sends only to `info@legatech.hr` and accepts requests only from the configured production origins.

## GitHub repository and secrets

Create the private repository `legatech-web`, push the `main` branch, and configure:

- `SITEGROUND_SSH_HOST`
- `SITEGROUND_SSH_PORT`
- `SITEGROUND_SSH_USER`
- `SITEGROUND_SSH_PRIVATE_KEY`
- `SITEGROUND_KNOWN_HOSTS`
- `SITEGROUND_DEPLOY_PATH` (absolute `public_html` path for `legatech.hr`)

The deploy workflow backs up only files from its previous manifest and never deletes unmanaged hosting files.

## WordPress publish trigger

The file `wordpress/mu-plugins/legatech-static-deploy.php` belongs in `wp-content/mu-plugins/` on `staging2.legatech.hr`.

Create a fine-grained GitHub token limited to `legatech-web` with permission to create repository dispatch events. Store it in `wp-config.php`, not in WordPress options:

```php
define('LEGATECH_GITHUB_REPOSITORY', 'GITHUB_KORISNIK/legatech-web');
define('LEGATECH_GITHUB_TOKEN', 'github_pat_...');
```

Publishing, updating, unpublishing, scheduling or deleting a post then starts one production build. The public website changes only after the workflow completes successfully.
