// Einstellungen der Website. Nur diese Datei muss angepasst werden.
window.SITE_CONFIG = {
  // Gemeinsame E-Mail-Adresse der drei Elternräte. Alle Formulare öffnen eine E-Mail an diese Adresse.
  // Platzhalter: vor dem Veröffentlichen durch die echte Adresse ersetzen.
  email: 'elternrat@example.org',

  // Optional: Adresse eines Formulardienstes (z. B. Formspree). Wenn gesetzt, werden
  // Formulare direkt gesendet, statt das E-Mail-Programm zu öffnen.
  formEndpoint: '',

  // Gemeinsame Facebook-Seite der Elternräte. Leer lassen, solange es noch keine Seite gibt.
  facebookUrl: '',

  // Newsletter: Adresse des Anmeldeformulars beim Newsletter-Dienst (Feld «action»
  // des eingebetteten Formulars). Leer lassen, dann wird die Anmeldung per E-Mail gesendet.
  newsletterAction: '',
  // Name des E-Mail-Feldes beim Newsletter-Dienst (je nach Anbieter z. B. «EMAIL» oder «email»).
  newsletterEmailField: 'EMAIL',
  // Optional: Name des Feldes beim Newsletter-Dienst, in dem die gewählten Schuleinheiten
  // gespeichert werden (z. B. ein Feld oder eine Gruppe). Leer lassen, wenn der Dienst keines hat.
  newsletterUnitsField: '',

  // Verantwortliche für die Inhalte je Elternrat (für das Impressum).
  verantwortliche: {
    'Butzen/Semper': '',
    'Chilefeld/Stigeli': '',
    'Zwillikon': '',
  },
};
