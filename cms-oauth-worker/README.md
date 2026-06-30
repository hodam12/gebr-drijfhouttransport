# Inlog-koppeling voor de website-editor (/admin)

Dit mapje zorgt ervoor dat de beheerder kan inloggen op `/admin` met een GitHub-account.
Dit hoeft maar **één keer** ingesteld te worden. Het kost niets (gratis Cloudflare Worker).

## Stap 1 — GitHub OAuth-app aanmaken

1. Ga naar https://github.com/settings/developers → "New OAuth App".
2. Application name: bijvoorbeeld "Gebr. Drijfhout website".
3. Homepage URL: de live website-URL (bijv. `https://gebr-drijfhouttransport.pages.dev`).
4. Authorization callback URL: `https://decap-oauth.<JOUW-SUBDOMEIN>.workers.dev/callback`
   (de exacte URL krijg je pas na stap 2 — kom hier dus na stap 2 op terug).
5. Klik "Register application", noteer de **Client ID**, en klik daarna "Generate a new client secret" en noteer die ook (deze is maar één keer zichtbaar).

## Stap 2 — Worker deployen

In deze map (`cms-oauth-worker`):

```
npm install -g wrangler   # eenmalig, als wrangler nog niet geïnstalleerd is
wrangler login
wrangler deploy
```

Wrangler toont na het deployen een URL zoals `https://decap-oauth.<jouw-account>.workers.dev`.
Ga terug naar de GitHub OAuth-app (stap 1) en vul de callback-URL aan met die echte URL + `/callback`.

## Stap 3 — Geheimen instellen op de Worker

```
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
```
(plak bij elke prompt de waarde die je in stap 1 hebt genoteerd)

## Stap 4 — Koppelen aan de CMS

Open `src/admin/config.yml` in de hoofdmap van de site en vervang de `base_url` door
de echte Worker-URL uit stap 2, bijvoorbeeld:

```yaml
backend:
  name: github
  repo: hodam12/gebr-drijfhouttransport
  branch: main
  base_url: https://decap-oauth.<jouw-account>.workers.dev
  auth_endpoint: auth
```

Commit en push deze wijziging. Daarna kan de beheerder naar `https://<jouw-site>/admin`
gaan en inloggen met GitHub.
