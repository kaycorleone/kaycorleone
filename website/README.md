# Website des Elternrats der Primarschule Affoltern am Albis

Einfache, statische Website ohne Server und ohne Datenbank. Sie besteht aus wenigen Dateien und lässt sich bei jedem Webhosting oder kostenlos (zum Beispiel GitHub Pages oder Netlify) veröffentlichen.

## Inhalt

- **Start:** Wer wir sind, aktuelle Mitteilungen
- **Elternbildung:** eigene Anlässe, Formular «Schreiben Sie uns Ihre Themen», Angebote für Eltern in der Region und in der Schweiz
- **Projekte:** wofür Unterstützung gesucht wird, laufende Projekte, Anmeldung zum Mithelfen, Projektideen
- **Mithelfen:** Möglichkeiten, die Schule zu unterstützen, und Anmeldung als Helferin oder Helfer
- **Neu an der Schule:** erste Schritte, kleines ABC, Eltern-Buddy, Hilfe und Beratung
- **So geht's:** Anleitung zur Website und zur Mitwirkung
- **Kontakt und Links:** Elternrat, Schulverwaltung, wichtige Adressen
- **Newsletter:** Anmeldung auf jeder Seite

## Anpassen

| Datei | Inhalt |
| --- | --- |
| `config.js` | E-Mail-Adresse des Elternrats, Facebook-Seite, Newsletter-Dienst, optionaler Formulardienst |
| `content.js` | Mitteilungen, Anlässe, Aufrufe und Projekte. Die Listen sind zu Beginn leer; das Muster steht jeweils im Kommentar. |
| `index.html` | Feste Texte und Links |

Vor dem Veröffentlichen muss in `config.js` die echte E-Mail-Adresse eingetragen werden. Der Platzhalter `elternrat@example.org` ist keine gültige Adresse des Elternrats.

### Formulare

Ohne weitere Einrichtung öffnen die Formulare das E-Mail-Programm der Besucherin oder des Besuchers mit einer vorbereiteten Nachricht an den Elternrat. Wenn die Angaben direkt gesendet werden sollen, kann in `config.js` unter `formEndpoint` die Adresse eines Formulardienstes eingetragen werden, der JSON entgegennimmt (zum Beispiel Formspree).

### Newsletter

Für den Newsletter braucht es einen Newsletter-Dienst. Dort wird ein Anmeldeformular mit Bestätigung per E-Mail (Double-Opt-in) eingerichtet. Die Adresse aus dem Feld `action` dieses Formulars kommt in `config.js` unter `newsletterAction`, der Name des E-Mail-Feldes unter `newsletterEmailField`. Bis dahin wird die Anmeldung per E-Mail an den Elternrat gesendet.

Bei der Wahl des Dienstes sollte geprüft werden, wo die Daten gespeichert werden, da es sich um Personendaten von Eltern handelt.

### Facebook

Sobald es eine Facebook-Seite gibt, ihre Adresse in `config.js` unter `facebookUrl` eintragen. Die Website verlinkt die Seite nur und bettet keine Inhalte von Facebook ein. Dadurch werden beim Besuch der Website keine Daten an Facebook übermittelt.

## Ansehen

`index.html` im Browser öffnen. Es wird nichts installiert.
