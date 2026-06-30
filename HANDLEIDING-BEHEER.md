# De website aanpassen (zonder programmeren)

## Inloggen

1. Ga naar `https://<jouw-website>/admin`.
2. Klik op "Login with GitHub" en log in met het GitHub-account dat toegang heeft.
3. Je ziet links een menu met onderdelen: **Algemeen & Hero**, **Pagina-secties**, **Contact**.

## Een tekst aanpassen

1. Kies het juiste onderdeel in het menu links.
2. Pas het tekstveld aan.
3. Klik rechtsboven op **Save** (concept) — of **Publish** als je meteen live wilt gaan.
4. Na ongeveer 1 minuut staat de wijziging live op de website.

## Een nieuwe sectie toevoegen

De homepage bestaat (los van de Hero bovenaan en Contact onderaan) uit een lijst van
secties die je zelf samenstelt onder **Pagina-secties**. Je kunt kiezen uit vier types:

- **Kaarten** — een rij kaartjes met icoon, titel en tekst (zoals "Diensten").
- **Fotogalerij** — een rasterweergave van foto's die uitklappen bij een klik.
- **Tekst met foto** — een tekstblok naast een foto (zoals "Over ons").
- **Tekstblok** — alleen tekst, bijvoorbeeld voor een aankondiging of FAQ-intro.

Zo voeg je er een toe:

1. Ga naar **Pagina-secties**.
2. Klik onderaan de lijst met secties op **Add** en kies het gewenste type.
3. Vul de velden in. Let op het veld **"Anker"**: dat is een kort, uniek
   linkje-stukje zonder spaties of hoofdletters (bijv. `acties` of `faq`) —
   gebruikt om er vanuit het menu naartoe te kunnen springen.
4. Zet **"Tonen in menu"** aan/uit en vul **"Tekst in menu"** in als je wilt dat
   de sectie in de navigatiebalk bovenaan verschijnt.
5. Sleep aan het handvat (⠿) links van een sectie om de volgorde op de pagina
   te wijzigen — dat bepaalt ook de volgorde in het menu.
6. Klik **Publish**.

Een sectie verwijderen kan met het prullenbak-icoon naast die sectie.

## Een eigen icoon kiezen (bij "Kaarten")

Bij elk kaartje in een "Kaarten"-sectie kun je bij **"Icoon"** een eigen
afbeelding uploaden (bijv. een PNG of SVG-bestandje) — er is geen vaste
keuzelijst meer. Zoek gerust gratis icoontjes op een site als
[flaticon.com](https://www.flaticon.com) of [iconscout.com](https://iconscout.com)
en upload die.

## Een foto toevoegen aan een fotogalerij

1. Ga naar **Pagina-secties** en open de gewenste "Fotogalerij"-sectie.
2. Klik bij "Foto's" op **Add**.
3. Klik op het foto-veld en upload een foto vanaf je computer of telefoon.
   Je hoeft de foto niet zelf te verkleinen — dat gebeurt automatisch.
4. Vul een korte omschrijving in (voor toegankelijkheid/Google).
5. Sla op.

## Een hele sectie tijdelijk verbergen

Elke sectie (en ook de Hero bovenaan en Contact) heeft een schakelaar
**"Zichtbaar"**. Zet die uit om de sectie van de website te halen zonder de
inhoud te verwijderen.

## Telefoonnummer, adres of openingstijden wijzigen

Ga naar **Contact** (voor adres/telefoon/fax) of **Algemeen & Hero** (voor het
telefoonnummer dat rechtsboven in het menu staat).

## Wat als ik een fout maak?

- Zolang je niet op **Publish** hebt geklikt, staat er niets live.
- Bij twijfel: sluit de pagina zonder op te slaan, er verandert dan niets.
- Eerdere versies zijn altijd terug te vinden in de geschiedenis op GitHub
  (zie de uitleg die je eerder hebt gekregen over commits en "Revert"), of via
  **Rollback** op een eerdere deployment in het Cloudflare-dashboard.
