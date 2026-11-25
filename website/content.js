// Inhalte, die die Elternräte selbst pflegen. Neue Einträge nach dem Muster in den
// Kommentaren einfügen. Leere Listen zeigen auf der Website einen kurzen Hinweis.
// Feld «schuleinheit»: 'Butzen/Semper', 'Chilefeld/Stigeli', 'Zwillikon' oder 'Alle'.
// Englische Seite: optional «titel_en», «text_en», «status_en», «ort_en» und «hinweis_en» ergänzen. Fehlen sie,
// zeigt die englische Seite den deutschen Text.
//
// Quelle der Einträge für Butzen/Semper: Padlet «Projekte Elternrat Butzen/Semper/Breiten»
// (Stand November 2026). Namen und Telefonnummern von Privatpersonen sind bewusst nicht übernommen.
window.SITE_CONTENT = {
  // Mitteilungen auf der Startseite
  // { datum: '2027-01-15', schuleinheit: 'Alle', titel: 'Titel', text: 'Kurzer Text' }
  news: [],

  // Termine auf der Startseite. Vergangene Termine werden automatisch ausgeblendet.
  // { datum: '2027-01-17', zeit: '10.00–12.00 Uhr', ort: 'Turnhallen Butzen', ort_en: 'Butzen gyms', schuleinheit: 'Butzen/Semper', titel: '…', titel_en: '…', hinweis: '…', hinweis_en: '…' }
  termine: [
    { datum: '2026-12-13', zeit: '10.00–12.00 Uhr', ort: 'Turnhallen Butzen', ort_en: 'Butzen gyms', schuleinheit: 'Butzen/Semper', titel: 'Offene Turnhalle', titel_en: 'Open gym' },
    { datum: '2026-12-15', zeit: 'ca. 10 Uhr', ort: 'vor der Turnhalle Stigeli', ort_en: 'in front of the Stigeli gym', schuleinheit: 'Butzen/Semper', titel: 'Elternkaffee (Besuchsmorgen)', titel_en: 'Parents’ coffee (Besuchsmorgen)', hinweis: 'gemeinsam mit Chilefeld/Stigeli', hinweis_en: 'together with Chilefeld/Stigeli' },
    { datum: '2027-01-15', zeit: 'ca. 10 Uhr', ort: 'vor der Turnhalle Stigeli', ort_en: 'in front of the Stigeli gym', schuleinheit: 'Butzen/Semper', titel: 'Elternkaffee (Besuchsmorgen)', titel_en: 'Parents’ coffee (Besuchsmorgen)', hinweis: 'gemeinsam mit Chilefeld/Stigeli', hinweis_en: 'together with Chilefeld/Stigeli' },
    { datum: '2027-01-17', zeit: '10.00–12.00 Uhr', ort: 'Turnhallen Butzen', ort_en: 'Butzen gyms', schuleinheit: 'Butzen/Semper', titel: 'Offene Turnhalle', titel_en: 'Open gym' },
    { datum: '2027-02-07', zeit: '10.00–12.00 Uhr', ort: 'Turnhallen Butzen', ort_en: 'Butzen gyms', schuleinheit: 'Butzen/Semper', titel: 'Offene Turnhalle', titel_en: 'Open gym' },
    { datum: '2027-02-15', zeit: 'ca. 10 Uhr', ort: 'vor der Turnhalle Stigeli', ort_en: 'in front of the Stigeli gym', schuleinheit: 'Butzen/Semper', titel: 'Elternkaffee (Besuchsmorgen)', titel_en: 'Parents’ coffee (Besuchsmorgen)', hinweis: 'gemeinsam mit Chilefeld/Stigeli', hinweis_en: 'together with Chilefeld/Stigeli' },
    { datum: '2027-03-15', zeit: 'ca. 10 Uhr', ort: 'vor der Turnhalle Stigeli', ort_en: 'in front of the Stigeli gym', schuleinheit: 'Butzen/Semper', titel: 'Elternkaffee (Besuchsmorgen)', titel_en: 'Parents’ coffee (Besuchsmorgen)', hinweis: 'gemeinsam mit Chilefeld/Stigeli', hinweis_en: 'together with Chilefeld/Stigeli' },
    { datum: '2027-04-15', zeit: 'ca. 10 Uhr', ort: 'vor der Turnhalle Stigeli', ort_en: 'in front of the Stigeli gym', schuleinheit: 'Butzen/Semper', titel: 'Elternkaffee (Besuchsmorgen)', titel_en: 'Parents’ coffee (Besuchsmorgen)', hinweis: 'gemeinsam mit Chilefeld/Stigeli', hinweis_en: 'together with Chilefeld/Stigeli' },
    { datum: '2027-05-11', schuleinheit: 'Butzen/Semper', titel: 'Sporttag Unterstufe', titel_en: 'Sports day, lower school', hinweis: 'Verschiebedatum 18.05.2027', hinweis_en: 'alternative date 18 May 2027' },
    { datum: '2027-05-21', schuleinheit: 'Butzen/Semper', titel: 'Sporttag Kindergarten', titel_en: 'Sports day, kindergarten', hinweis: 'Verschiebedatum 11.06.2027', hinweis_en: 'alternative date 11 June 2027' },
    { datum: '2027-05-28', schuleinheit: 'Butzen/Semper', titel: 'Nationentag', titel_en: 'Nations day', hinweis: 'Verschiebedatum 04.06.2027', hinweis_en: 'alternative date 4 June 2027' },
    { datum: '2027-06-03', schuleinheit: 'Butzen/Semper', titel: 'Sporttag Mittelstufe', titel_en: 'Sports day, middle school', hinweis: 'Verschiebedatum 10.06.2027', hinweis_en: 'alternative date 10 June 2027' },
    { datum: '2027-06-08', schuleinheit: 'Butzen/Semper', titel: 'Flohmarkt', titel_en: 'Flea market' },
    { datum: '2027-06-15', zeit: 'ca. 10 Uhr', ort: 'vor der Turnhalle Stigeli', ort_en: 'in front of the Stigeli gym', schuleinheit: 'Butzen/Semper', titel: 'Elternkaffee (Besuchsmorgen)', titel_en: 'Parents’ coffee (Besuchsmorgen)', hinweis: 'gemeinsam mit Chilefeld/Stigeli', hinweis_en: 'together with Chilefeld/Stigeli' },
    { datum: '2027-06-30', ort: 'Badi Stigeli', ort_en: 'Stigeli outdoor pool', schuleinheit: 'Butzen/Semper', titel: 'Sebuki-Fisch (Schwimmwettbewerb Mittelstufe)', titel_en: 'Sebuki-Fisch (swimming competition, middle school)', hinweis: 'Verschiebedatum 14.07.2027', hinweis_en: 'alternative date 14 July 2027' },
    { datum: '2027-07-15', schuleinheit: 'Butzen/Semper', titel: 'Verabschiedung der Sechstklässlerinnen und Sechstklässler', titel_en: 'Farewell for the 6th-grade pupils' },
    { datum: '2027-07-15', zeit: 'ca. 10 Uhr', ort: 'vor der Turnhalle Stigeli', ort_en: 'in front of the Stigeli gym', schuleinheit: 'Butzen/Semper', titel: 'Elternkaffee (Besuchsmorgen)', titel_en: 'Parents’ coffee (Besuchsmorgen)', hinweis: 'gemeinsam mit Chilefeld/Stigeli', hinweis_en: 'together with Chilefeld/Stigeli' },
    { datum: '2027-11-09', schuleinheit: 'Butzen/Semper', titel: 'Räbeliechtli-Umzug', titel_en: 'Räbeliechtli lantern parade', hinweis: 'seit 2026 nur Kindergarten und 1. Klassen', hinweis_en: 'since 2026 only kindergarten and 1st grade' },
    { datum: '2027-12-17', schuleinheit: 'Butzen/Semper', titel: 'Schulsilvester', titel_en: 'School New Year’s Eve party' },
  ],

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
  needs: [
    {
      titel: 'Schulsilvester: Hot-Dog-Stand',
      titel_en: 'School New Year’s Eve party: hot dog stand',
      ort: 'Schulhaus Semper', ort_en: 'Semper school building',
      schuleinheit: 'Butzen/Semper',
      text: 'Vor den Weihnachtsferien verwandeln sich die Schulklassen in Spiel- und Märchenwelten. Für den Hot-Dog-Stand im Schulhaus Semper suchen wir Eltern, die mithelfen.',
      text_en: 'Before the Christmas holidays the classes turn into worlds of games and fairy tales. We are looking for parents to help at the hot dog stand in the Semper school building.',
    },
    {
      titel: 'Kletterwand: Auf- und Abbau',
      titel_en: 'Climbing wall: setting up and taking down',
      ort: 'Turnhalle Butzen', ort_en: 'Butzen gym',
      schuleinheit: 'Butzen/Semper',
      text: 'Im Januar 2027 wird in der Turnhalle Butzen wieder die Kletterwand aufgebaut. Wir suchen Helferinnen und Helfer für den Auf- und Abbau. Die genauen Daten folgen.',
      text_en: 'In January 2027 the climbing wall will be set up again in the Butzen gym. We are looking for helpers to set it up and take it down. Exact dates will follow.',
    },
    {
      titel: 'Spielkiste Breiten: Outdoor-Spielzeug gesucht',
      titel_en: 'Spielkiste Breiten: outdoor toys wanted',
      ort: 'Pausenplatz Breiten', ort_en: 'Breiten playground',
      schuleinheit: 'Butzen/Semper',
      text: 'Für die offenen Spielnachmittage suchen wir gut erhaltenes Spielzeug: Springseile, Kreide, Stelzen, Unihockey- und Badmintonschläger, Wurf- und Fangspiele, Frisbees.',
      text_en: 'For the open play afternoons we are looking for toys in good condition: skipping ropes, chalk, stilts, floorball and badminton rackets, throwing and catching games, frisbees.',
    },
  ],

  // Laufende Projekte
  // { titel: 'Bücher-Tauschregal', schuleinheit: 'Chilefeld/Stigeli', status: 'läuft', text: 'Kurze Beschreibung', link: 'https://…' }
  projects: [
    {
      titel: 'Offene Turnhalle',
      titel_en: 'Open gym',
      schuleinheit: 'Butzen/Semper',
      status: 'Elternratsprojekt',
      status_en: 'Parent council project',
      text: 'Ein offenes Spiel- und Sportangebot ausserhalb der Unterrichtszeit, viermal im Winterhalbjahr, jeweils sonntags von 10 bis 12 Uhr in den beiden Turnhallen Butzen. Für alle Kinder der Primarschule; Kindergartenkinder in Begleitung einer erwachsenen Person. In der oberen Halle gibt es Geräte und einen (Ninja-)Parcours, in der unteren Ballspiele. Die Teilnahme erfolgt auf Verantwortung der Eltern. Gemeinsam mit dem Elternrat Chilefeld/Stigeli.',
      text_en: 'An open play and sports afternoon outside school hours, four times in the winter half-year, on Sundays from 10 am to 12 noon in the two Butzen gyms. For all children of the primary school; kindergarten children accompanied by an adult. The upper gym has equipment and a (ninja) obstacle course, the lower gym ball games. Participation is at the parents’ own risk. Together with the Chilefeld/Stigeli parent council.',
    },
    {
      titel: 'Spielkiste Breiten',
      titel_en: 'Spielkiste Breiten (play box)',
      schuleinheit: 'Butzen/Semper',
      status: 'Elternratsprojekt',
      status_en: 'Parent council project',
      text: 'Offene Spielnachmittage auf dem Pausenplatz Breiten am Mittwochnachmittag.',
      text_en: 'Open play afternoons in the Breiten playground on Wednesday afternoons.',
    },
    {
      titel: 'Elternkaffee (Besuchsmorgen)',
      titel_en: 'Parents’ coffee (Besuchsmorgen)',
      schuleinheit: 'Butzen/Semper',
      status: 'Elternratsprojekt',
      status_en: 'Parent council project',
      text: 'Jeweils am 15. des Monats um etwa 10 Uhr vor der Turnhalle Stigeli, gemeinsam mit Chilefeld/Stigeli. Eltern lernen sich kennen und tauschen sich aus. Anliegen und Fragen können eingebracht und im Elternrat besprochen werden.',
      text_en: 'On the 15th of each month at around 10 am in front of the Stigeli gym, together with Chilefeld/Stigeli. Parents get to know each other and exchange ideas. Concerns and questions can be raised and discussed in the parent council.',
    },
    {
      titel: 'Fundgrube',
      titel_en: 'Lost and found',
      schuleinheit: 'Butzen/Semper',
      status: 'Elternratsprojekt',
      status_en: 'Parent council project',
      text: 'Zweimal im Jahr werden die Fundgegenstände inventarisiert und fotografiert, damit Eltern online nachsehen können, ob Vermisstes darunter ist.',
      text_en: 'Twice a year the lost property is listed and photographed so that parents can check online whether anything missing is among it.',
    },
    {
      titel: 'Elternpicknick',
      titel_en: 'Parents’ picnic',
      schuleinheit: 'Butzen/Semper',
      status: 'Elternratsprojekt',
      status_en: 'Parent council project',
      text: 'Ein gemeinsamer Anlass für Familien und Lehrpersonen der 1. und 4. Klassen zu Beginn des Schuljahres, zum Kennenlernen und Austauschen.',
      text_en: 'A get-together for families and teachers of the 1st and 4th grades at the beginning of the school year, to get to know each other.',
    },
    {
      titel: 'Elternbildung',
      titel_en: 'Parent education',
      schuleinheit: 'Alle',
      status: 'Elternratsprojekt',
      status_en: 'Parent council project',
      text: 'Drei Informations- und Weiterbildungsveranstaltungen pro Jahr zu Themen rund um Erziehung, Schule und Familie, gemeinsam von den drei Elternräten.',
      text_en: 'Three information and training events per year on parenting, school and family, organised jointly by the three parent councils.',
    },
    {
      titel: 'Schulhauskultur Breiten',
      titel_en: 'School culture at Breiten',
      schuleinheit: 'Butzen/Semper',
      status: 'Elternratsprojekt',
      status_en: 'Parent council project',
      text: 'Im neuen Schulhaus Breiten gibt es noch keine gewachsene Schulhauskultur. Die Breiten-Eltern organisieren deshalb einen Weihnachtsbaum, Bauprojekte auf dem Pausenplatz (zum Beispiel Hütte und Sitzgelegenheiten, Werk-Feierabende) und helfen bei den Lesemorgen mit Kuchen und Kaffee.',
      text_en: 'The new Breiten school building does not yet have its own school culture. The Breiten parents therefore organise a Christmas tree, building projects in the playground (for example a hut and seating, crafting evenings) and help with the reading mornings with cake and coffee.',
    },
    {
      titel: 'Schachturnier',
      titel_en: 'Chess tournament',
      schuleinheit: 'Butzen/Semper',
      status: 'Schulprojekt, nur Schulhaus Butzen',
      status_en: 'School project, Butzen building only',
      text: 'Alle Kinder der 1. bis 6. Klasse spielen ein schulhausinternes Schachturnier. Die Schule organisiert, der Elternrat führt einen Getränkestand.',
      text_en: 'All children from 1st to 6th grade take part in a chess tournament within the school building. The school organises it, the parent council runs a drinks stand.',
    },
    {
      titel: 'Nationentag',
      titel_en: 'Nations day',
      schuleinheit: 'Butzen/Semper',
      status: 'Schulprojekt',
      status_en: 'School project',
      text: 'Alle drei Jahre, voraussichtlich wieder 2027. Die Kinder erhalten Einblick in Traditionen und Bräuche verschiedener Länder. Am Nachmittag und Abend kommen Kinder und Eltern zusammen und geniessen ein internationales Buffet mit Spezialitäten aus verschiedenen Nationen.',
      text_en: 'Every three years, expected again in 2027. The children learn about traditions and customs of different countries. In the afternoon and evening children and parents come together and enjoy an international buffet with specialities from many nations.',
    },
  ],

  // Ideen, die ein Elternrat prüft. Eltern können sich melden, wenn sie mitmachen möchten.
  // { titel: '…', titel_en: '…', text: '…', text_en: '…', schuleinheit: '…' }
  ideen: [
    { titel: 'Kino-Nachmittag oder -Abend', titel_en: 'Cinema afternoon or evening', schuleinheit: 'Butzen/Semper', text: 'Filme für Kleine und Grosse, mit Popcorn und Sirup.', text_en: 'Films for younger and older children, with popcorn and syrup.' },
    { titel: 'Projektgruppe Schulweg', titel_en: 'Way to school group', schuleinheit: 'Butzen/Semper', text: 'Eine Gruppe, die sich um Themen rund um den Schulweg kümmert, zum Beispiel Lotsen, Elterntaxis oder Umfragen bei Eltern.', text_en: 'A group dealing with the way to school, for example school crossing helpers, parent taxis or surveys among parents.' },
    { titel: 'Offene Halle am Abend', titel_en: 'Open gym in the evening', schuleinheit: 'Butzen/Semper', text: 'Eine offene Halle für ältere Schülerinnen und Schüler, eventuell mit der Jugendarbeit.', text_en: 'An open gym for older pupils, possibly together with youth work.' },
    { titel: 'Disco oder Schulfest für die Unterstufe', titel_en: 'Disco or school party for the lower school', schuleinheit: 'Butzen/Semper', text: '', text_en: '' },
    { titel: 'Familien-Waldtag', titel_en: 'Family day in the forest', schuleinheit: 'Butzen/Semper', text: 'Schnitzeljagd und gemeinsames Grillieren.', text_en: 'Treasure hunt and barbecue together.' },
    { titel: 'Eltern machen Schule', titel_en: 'Parents at school', schuleinheit: 'Butzen/Semper', text: 'Eltern teilen ihr Wissen und ihre Erfahrung aus Beruf oder Hobby mit den Kindern, zum Beispiel am Nationentag oder am Zukunftstag.', text_en: 'Parents share knowledge and experience from their job or hobby with the children, for example on nations day or future day.' },
  ],
};
