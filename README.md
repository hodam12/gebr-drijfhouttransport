# Website Gebr. Drijfhout

Gebouwd met [Eleventy](https://www.11ty.dev/) (statische sitegenerator) en
[Decap CMS](https://decapcms.org/) als gratis editor voor niet-programmeurs.

## Projectstructuur

```
src/
  _data/        ← alle teksten/instellingen (yaml) — dit bewerkt de CMS
  _includes/    ← layout + herbruikbare onderdelen (secties) van de pagina
  admin/        ← de CMS-editor (/admin op de live site)
  assets/       ← foto's
  css/, js/     ← styling en interactie
  index.njk     ← bouwt de homepage op uit de secties
cms-oauth-worker/  ← eenmalige inlog-koppeling voor /admin (zie cms-oauth-worker/README.md)
```

## Lokaal ontwikkelen

```
npm install
npm run serve     # start een lokale preview op http://localhost:8080
npm run build     # bouwt de site naar _site/
```

## Cloudflare Pages instellen

In het Cloudflare Pages-project (Settings → Builds & deployments):
- **Build command**: `npm run build`
- **Build output directory**: `_site`

Elke keer dat er iets verandert op de `main`-branch (handmatig, of via de
CMS-editor op `/admin`) bouwt en publiceert Cloudflare Pages de site automatisch.

## De website beheren zonder te programmeren

Zie de handleiding in [`HANDLEIDING-BEHEER.md`](HANDLEIDING-BEHEER.md).

Eenmalige technische installatie van de inlogkoppeling: zie
[`cms-oauth-worker/README.md`](cms-oauth-worker/README.md).





To DO-

#Diensten
Geen aanhangwagen verhuur
Geen haakarm of containerauto
Geen containerbak verhuur

Particulier en zakelijk
-Open opleggers
-Beschikbaar met laadkraan
-Groot transport

Bedrijf vervoert nu hoofdzakelijk rijplaten en draglineschotten voor de bouw

#Historie
Stappen van vroeger naar nu

#Werkzaamheden
Machines
Rijplaten
Stenen
Container tot 20ft
Pallets 

#contact
Openingstijden toevoegen
Zondagen en feestdagen gesloten
08:00 - 17:00 ma-za




