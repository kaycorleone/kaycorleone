# Anmeldungen mit Google Tabellen und Google Formulare

Mit dieser Einrichtung pflegen die Elternräte alle Aufrufe in einer Google-Tabelle. Die Website zeigt die Aufrufe an und zählt die Anmeldungen automatisch. Eltern melden sich über ein Google-Formular an. Namen und E-Mail-Adressen sehen nur die Elternräte; auf der Website erscheint nur die Anzahl.

Alles wird im Google-Konto der Elternräte angelegt. Zeitbedarf beim ersten Mal: etwa 20 Minuten.

## 1. Tabelle anlegen

1. Im Google-Konto der Elternräte eine neue Google-Tabelle anlegen, zum Beispiel «Aufrufe Elternräte».
2. Das erste Tabellenblatt in **Aufrufe** umbenennen.
3. Die Datei `vorlage/aufrufe-vorlage.csv` öffnen und die erste Zeile in Zeile 1 der Tabelle übernehmen (oder über «Datei, Importieren» die Vorlage importieren). Die Spalten lauten:

| Spalte | Name | Inhalt |
| --- | --- | --- |
| A | id | Nummer des Aufrufs. Alle Schichten desselben Anlasses haben dieselbe Nummer. |
| B | titel | Titel, zum Beispiel «Sporttag» |
| C | titel_en | Titel auf Englisch (freiwillig) |
| D | datum | Datum, zum Beispiel 12.06.2027 |
| E | ort | Ort (freiwillig) |
| F | schuleinheit | Butzen/Semper, Chilefeld/Stigeli, Zwillikon oder Alle |
| G | text | Kurze Beschreibung |
| H | text_en | Beschreibung auf Englisch (freiwillig) |
| I | schicht | Zeit der Schicht, zum Beispiel 08.00–10.00 (leer, wenn es keine Schichten gibt) |
| J | personen | Anzahl gesuchter Personen |
| K | auswahl | wird automatisch berechnet, siehe unten |
| L | angemeldet | wird automatisch berechnet, siehe unten |
| M | link | Link für weitere Informationen, zum Beispiel zum Padlet (freiwillig) |

Pro Schicht eine Zeile. Ein Sporttag mit zwei Schichten hat also zwei Zeilen mit derselben id.

## 2. Formular anlegen

1. In der Tabelle im Menü «Tools» (je nach Sprache auch «Extras») «Neues Formular erstellen» wählen. So ist das Formular direkt mit der Tabelle verbunden. Google legt dabei ein zweites Tabellenblatt für die Antworten an, zum Beispiel «Formularantworten 1».
2. Fragen im Formular:
   - **Einsatz** (Drop-down, Pflicht)
   - **Name** (Kurzantwort, Pflicht)
   - **E-Mail** (Kurzantwort, Pflicht)
   - **Telefon** (Kurzantwort, freiwillig)
   - **Bemerkung** (Absatz, freiwillig)
   - Einwilligung als Kontrollkästchen, Pflicht: «Ich bin einverstanden, dass die Elternräte meine Angaben für die Organisation dieses Einsatzes verwenden.»
3. Die Antwortmöglichkeiten der Frage «Einsatz» müssen **genau** den Werten in Spalte K (auswahl) entsprechen. Am einfachsten die Werte aus Spalte K kopieren und einfügen.

## 3. Formeln in der Tabelle

In Zeile 2 eintragen und dann nach unten ziehen:

- **K2 (auswahl):** `=IF(I2="", B2, B2 & " – " & I2)`
- **L2 (angemeldet):** `=COUNTIF('Formularantworten 1'!B:B, K2)`

Hinweise:
- `'Formularantworten 1'` durch den tatsächlichen Namen des Antwortblatts ersetzen und `B:B` durch die Spalte, in der die Antwort auf «Einsatz» steht.
- Zeigt Google Tabellen einen Fehler an, die Kommas in den Formeln durch Semikolons ersetzen. Das hängt von der Spracheinstellung der Tabelle ab. Falls die Funktionsnamen nicht erkannt werden, die deutschen Namen verwenden: `WENN` statt `IF` und `ZÄHLENWENN` statt `COUNTIF`.

## 4. Tabellenblatt «Aufrufe» veröffentlichen

1. «Datei, Freigeben, Im Web veröffentlichen».
2. Nur das Blatt **Aufrufe** wählen (nicht die Formularantworten) und als Format **CSV**.
3. «Veröffentlichen» klicken und den Link kopieren. Er sieht etwa so aus: `https://docs.google.com/spreadsheets/d/e/…/pub?gid=0&single=true&output=csv`

Wichtig: Nie das Blatt mit den Formularantworten veröffentlichen. Darin stehen die Namen und E-Mail-Adressen der Eltern.

## 5. Kennung der Frage «Einsatz» herausfinden

1. Im Formular oben rechts auf die drei Punkte, dann «Vorausgefüllten Link abrufen».
2. Bei «Einsatz» irgendeine Antwort wählen und «Link abrufen», dann «Link kopieren».
3. Im kopierten Link steht ein Teil wie `entry.123456789=…`. Die Kennung ist `entry.123456789`.
4. Der Anfang des Links bis und mit `viewform` ist die Formularadresse.

## 6. Website einstellen

In `config.js` eintragen:

```js
sheetCsvUrl: 'https://docs.google.com/spreadsheets/d/e/…/pub?gid=0&single=true&output=csv',
formUrl: 'https://docs.google.com/forms/d/e/…/viewform',
formEntryAuswahl: 'entry.123456789',
```

Danach die Website im Browser öffnen und unter «Projekte» prüfen, ob die Aufrufe erscheinen und «Ich melde mich» das Formular mit dem richtigen Einsatz öffnet. Anmeldungen erscheinen nach wenigen Minuten als Zahl auf der Website, da Google die veröffentlichte Tabelle mit kurzer Verzögerung aktualisiert.

## Im Alltag

- Neuer Aufruf: Zeile(n) in «Aufrufe» ergänzen, Formel in K und L nach unten ziehen, neuen Wert aus Spalte K im Formular bei «Einsatz» hinzufügen.
- Vergangene Aufrufe blendet die Website automatisch aus.
- Wer sich angemeldet hat, steht im Blatt mit den Formularantworten. Nach dem Anlass diese Zeilen löschen, wie im Datenschutzhinweis der Website angegeben.
- Solange `sheetCsvUrl` leer ist oder die Tabelle nicht erreichbar ist, zeigt die Website die Aufrufe aus `content.js`.
