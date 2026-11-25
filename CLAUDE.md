# Upstream (upstream.mickla.se)

## Syfte
Upstream är ett spel för Plan B AB:s medarbetare. Det handlar om LYFT: att ta sig närmare kunden, så att man är med när problemen formuleras och inte bara när de ska lösas. Budskapet bärs av spelet och sägs aldrig rakt ut. Humor och lättsamhet går före affärsmässighet, och det ska vara roligt att bara simma.

Spelet görs på uppdrag av Plan B AB och ligger tills vidare på mickla.se. Det kan senare flyttas till Plan B:s intranät, som länk eller som ett paket som IT hanterar.

## Principer
- Helt statiskt. Inget sparas eller skickas; ingen localStorage, inga anrop, ingen statistik.
- Inga externa resurser. Typsnitt, bilder och skript ligger på den egna domänen.
- Plan B:s grafiska profil i gränssnittet: Grön 1 #00826E, Röd 1 #F07878, Lila 1 #8C82E6, Grön 2 #1EA08C, Natursvart #05232D, Beige #F0F0E1. Pulp Display är licensierat och finns inte på webben här; Helvetica används som reserv. Chakra Petch (OFL) används för siffror och etiketter.
- Världen i spelet är realistisk och behöver inte följa Plan B:s färger.
- Inga tankstreck i texter. Svenska.
- Repot är publikt. Fråga innan något läggs in som inte tål att vara offentligt.

## Struktur
- `site/index.html`: sidan med kort användarinstruktion och sidfot.
- `site/js/game.js`: hela spelet (canvas, ljud syntetiseras i webbläsaren).
- `site/css/site.css`, `site/fonts/`, `site/img/`: formgivning, typsnitt, logotyper.
- `tests/smoke.mjs`: röktest som kör spelet utan webbläsare och kontrollerar att inget laddas externt.
- `.github/workflows/pages.yml`: kör testet och publicerar `site/` till GitHub Pages. Publiceringen stoppas om testet fallerar.

## Spelet i korthet
- Falsk 3D med kameran bakom och ovanför laxen, samma perspektiv som deidre.mickla.se.
- Ström, lä bakom stenar, ork, hopp (över stenar, föremål och fiskar, och uppför forsar), tre forsar och tre öar.
- Kvistar, stockar och båtar flyter nedströms och kostar ork vid krock (3, 8, 16). De studsar mot stenar.
- Överraskningar utan kostnad: kanot med två oense turister, badanka, älg, skyddshjälm, flaskpost, häger.
- Stim som flyter nedströms (det bekväma valet). Nedströmssimning går att styra bara lite.
- Når man källan kommer man till Källsjön, belöningen: ingen ström, ork kostar inget, hopp är gratis. Där finns hinder (stockar att hoppa över), ringar att hoppa igenom, en slalombana med sex bojar, skygga badbarn som skriker och simmar undan när man nuddar dem, och en röd stuga med brygga. Räknare för hinder, ringar, slalom och skrämda badgäster. Samtidigt flyttas stenar nedströms så att älven blir lättare nästa tur. Spökfisken visar bästa tur.
- Lägen: Specifikationer (teknisk annotering) och BIM-läge (modellprogram med egenskapspanel, projektbläddrare och kollisionsvarningar). Plan B:s symbol i fönstrets titelrad, ingen annan programvaras logotyp.

## Beslut
- Namn: Upstream (först Beat the stream). Fisk, inte fågel.
- Spökfisk går att slå av och på.
- Copyright: © Plan B AB 2026, gjort av Engströms Mickla AB.
