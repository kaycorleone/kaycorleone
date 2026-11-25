// Inhalte, die die Elternräte selbst pflegen. Neue Einträge nach dem Muster in den
// Kommentaren einfügen. Leere Listen zeigen auf der Website einen kurzen Hinweis.
// Feld «schuleinheit»: 'Butzen/Semper', 'Chilefeld/Stigeli', 'Zwillikon' oder 'Alle'.
// Englische Seite: optional «titel_en», «text_en» und «status_en» ergänzen. Fehlen sie,
// zeigt die englische Seite den deutschen Text.
window.SITE_CONTENT = {
  // Mitteilungen auf der Startseite
  // { datum: '2027-01-15', schuleinheit: 'Alle', titel: 'Titel', text: 'Kurzer Text' }
  news: [],

  // Anlässe der Elternbildung
  // { datum: '2027-02-10', zeit: '19.30 Uhr', schuleinheit: 'Alle', titel: 'Kinder und Medien', ort: 'Aula Schulhaus …', text: 'Vortrag mit …', anmeldung: true }
  events: [],

  // Aufrufe: wofür Unterstützung gesucht wird
  // Mit Schichten (je Anzahl gesuchter Personen; «zugesagt» von Hand nachführen):
  // { titel: 'Sporttag', datum: '2027-06-12', ort: 'Sportanlage', schuleinheit: 'Zwillikon',
  //   text: 'Wir suchen Helferinnen und Helfer an den Posten.',
  //   schichten: [ { zeit: '08.00–10.00', personen: 3, zugesagt: 1 }, { zeit: '10.00–12.30', personen: 5, zugesagt: 0 } ] }
  // Ohne Schichten: { titel: 'Kuchen für den Flohmarkt', datum: '2027-05-08', schuleinheit: 'Alle', personen: 6, zugesagt: 2 }
  // Optional: link: 'https://…' (zum Beispiel zum Padlet), titel_en / text_en für die englische Seite
  needs: [],

  // Laufende Projekte
  // { titel: 'Bücher-Tauschregal', schuleinheit: 'Chilefeld/Stigeli', status: 'läuft', text: 'Kurze Beschreibung', link: 'https://…' }
  projects: [],
};
