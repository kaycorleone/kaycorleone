(() => {
  const config = window.SITE_CONFIG || {};
  const content = window.SITE_CONTENT || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const today = new Date().toISOString().slice(0, 10);

  // Sprache der Seite: index.html ist Deutsch, en.html Englisch
  const EN = document.documentElement.lang.startsWith('en');
  const T = EN
    ? {
        locale: 'en-GB',
        all: 'All school units',
        noNews: 'There is no news at the moment. Subscribe to the newsletter so you do not miss anything.',
        noEventsUnit: 'No events are planned for this school unit at the moment.',
        noEvents: 'The next events will be announced soon. Let us know which topics interest you.',
        noNeeds: 'We are not looking for help with a specific event at the moment. You are still welcome to sign up under «Help out».',
        noProjects: 'The projects of the parent councils will be presented here soon.',
        register: 'Register',
        helpBtn: 'I can help',
        signUp: 'Count me in',
        needed: (n) => `${n} ${n === 1 ? 'person' : 'people'} needed`,
        free: (n) => `${n} ${n === 1 ? 'place' : 'places'} left`,
        full: 'Fully booked, thank you!',
        shift: 'Shift',
        more: 'More information',
        fbFollow: 'Follow us on',
        fbSoon: 'A Facebook page of the parent councils is being prepared.',
        tbd: 'to be added',
        sendError: 'Sending did not work. Please try again later or write us an email.',
        sent: 'Thank you! We have received your message and will get back to you.',
        mailOpen: 'Your email program opens with the prepared message. Please send it from there.',
        pickTopic: 'Please choose at least one topic or write your own suggestion.',
        pickUnit: 'Please choose at least one school unit.',
        nlConfirm: 'Almost done: please confirm your subscription via the link in the email you will receive shortly.',
        nlMail: 'Your email program opens with the subscription. Please send the message from there.',
      }
    : {
        locale: 'de-CH',
        all: 'Alle Schuleinheiten',
        noNews: 'Im Moment gibt es keine neuen Mitteilungen. Abonnieren Sie den Newsletter, dann verpassen Sie nichts.',
        noEventsUnit: 'Für diese Schuleinheit sind im Moment keine Anlässe geplant.',
        noEvents: 'Die nächsten Anlässe werden bald bekannt gegeben. Schreiben Sie uns, welche Themen Sie interessieren.',
        noNeeds: 'Im Moment suchen wir keine Unterstützung für einen bestimmten Anlass. Melden Sie sich trotzdem gerne unter «Mithelfen».',
        noProjects: 'Die Projekte der Elternräte werden hier bald vorgestellt.',
        register: 'Anmelden',
        helpBtn: 'Ich helfe mit',
        signUp: 'Ich melde mich',
        needed: (n) => `${n} ${n === 1 ? 'Person' : 'Personen'} gesucht`,
        free: (n) => `noch ${n} ${n === 1 ? 'Platz' : 'Plätze'} frei`,
        full: 'Ausgebucht, vielen Dank!',
        shift: 'Schicht',
        more: 'Mehr erfahren',
        fbFollow: 'Folgen Sie uns auf',
        fbSoon: 'Eine Facebook-Seite der Elternräte ist in Vorbereitung.',
        tbd: 'wird ergänzt',
        sendError: 'Das Senden hat nicht geklappt. Bitte versuchen Sie es später erneut oder schreiben Sie uns eine E-Mail.',
        sent: 'Vielen Dank! Wir haben Ihre Nachricht erhalten und melden uns.',
        mailOpen: 'Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Nachricht. Bitte senden Sie sie dort ab.',
        pickTopic: 'Bitte wählen Sie mindestens ein Thema oder schreiben Sie einen eigenen Vorschlag.',
        pickUnit: 'Bitte wählen Sie mindestens eine Schuleinheit.',
        nlConfirm: 'Fast geschafft: Bitte bestätigen Sie die Anmeldung über den Link in der E-Mail, die Sie gleich erhalten.',
        nlMail: 'Ihr E-Mail-Programm öffnet sich mit der Anmeldung. Bitte senden Sie die Nachricht dort ab.',
      };
  const fmt = (iso) => (iso ? new Date(`${iso}T12:00`).toLocaleDateString(T.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '');
  // Texte aus content.js: auf der englischen Seite «titel_en» usw., sonst der deutsche Text
  const tx = (x, key) => (EN && x[`${key}_en`]) || x[key] || '';

  // Navigation über Reiter, die Adresse (#elternbildung usw.) bleibt teilbar
  const TABS = ['start', 'elternbildung', 'projekte', 'mithelfen', 'neu', 'so-gehts', 'kontakt', 'impressum'];
  const menuBtn = $('.menu-btn');
  const nav = $('#nav');

  function show(tab, focus = true) {
    if (!TABS.includes(tab)) tab = 'start';
    $$('[data-section]').forEach((s) => (s.hidden = s.dataset.section !== tab));
    $$('#nav a').forEach((a) => {
      const active = a.dataset.tab === tab;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (focus) {
      window.scrollTo(0, 0);
      $('#inhalt').focus({ preventScroll: true });
    }
  }

  function route() {
    const hash = location.hash.slice(1);
    if (hash === 'newsletter') {
      $('#newsletter').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    show(hash || 'start', Boolean(hash));
  }
  window.addEventListener('hashchange', route);
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Beim Sprachwechsel auf derselben Seite bleiben
  $$('[data-lang-link]').forEach((a) =>
    a.addEventListener('click', () => {
      a.href = a.getAttribute('href').split('#')[0] + location.hash;
    })
  );

  // Inhalte aus content.js
  const emptyNote = (text) => `<p class="empty">${esc(text)}</p>`;

  // Kennzeichnung der Schuleinheit; ohne Angabe gilt ein Eintrag für alle
  const unitOf = (x) => (x.schuleinheit && x.schuleinheit !== 'Alle' ? x.schuleinheit : '');
  const unitTag = (x) => `<span class="tag">${esc(unitOf(x) || T.all)}</span>`;
  const matches = (x, unit) => !unit || !unitOf(x) || unitOf(x) === unit;

  const news = (content.news || []).slice().sort((a, b) => String(b.datum).localeCompare(String(a.datum)));
  $('#news').innerHTML = news.length
    ? news.map((n) => `<article class="item"><p class="meta">${esc(fmt(n.datum))} ${unitTag(n)}</p><h3>${esc(tx(n, 'titel'))}</h3><p>${esc(tx(n, 'text'))}</p></article>`).join('')
    : emptyNote(T.noNews);

  const events = (content.events || []).filter((e) => !e.datum || e.datum >= today).sort((a, b) => String(a.datum).localeCompare(String(b.datum)));
  const needs = content.needs || [];
  const projects = content.projects || [];

  function renderLists(unit = '') {
    const ev = events.filter((e) => matches(e, unit));
    $('#events').innerHTML = ev.length
      ? ev
          .map(
            (e) => `<article class="card event">
              <p class="meta">${esc(fmt(e.datum))}${e.zeit ? `, ${esc(e.zeit)}` : ''}${e.ort ? ` · ${esc(e.ort)}` : ''} ${unitTag(e)}</p>
              <h3>${esc(tx(e, 'titel'))}</h3>
              ${tx(e, 'text') ? `<p>${esc(tx(e, 'text'))}</p>` : ''}
              ${e.anmeldung ? `<a class="btn btn-small" href="${mailto(`Anmeldung: ${e.titel} (${unitOf(e) || 'Alle'})`, 'Ich melde mich an.\n\nName:\nAnzahl Personen:')}">${T.register}</a>` : ''}
            </article>`
          )
          .join('')
      : emptyNote(unit ? T.noEventsUnit : T.noEvents);

    const nd = needs.filter((n) => matches(n, unit));
    $('#needs').innerHTML = nd.length ? nd.map(needCard).join('') : emptyNote(T.noNeeds);

    const pr = projects.filter((p) => matches(p, unit));
    $('#projects').innerHTML = pr.length
      ? pr.map((p) => `<article class="card"><p class="meta">${tx(p, 'status') ? `${esc(tx(p, 'status'))} ` : ''}${unitTag(p)}</p><h3>${esc(tx(p, 'titel'))}</h3><p>${esc(tx(p, 'text'))}</p>${p.link ? `<p><a href="${esc(p.link)}" target="_blank" rel="noopener">${T.more}</a></p>` : ''}</article>`).join('')
      : emptyNote(T.noProjects);
    $$('.bar i[data-pct]').forEach((i) => (i.style.width = `${i.dataset.pct}%`));
  }

  // Ein Aufruf hat entweder Schichten (je mit eigener Anzahl Personen) oder eine Gesamtzahl.
  // «zugesagt» trägt der Elternrat von Hand nach, sobald sich jemand gemeldet hat.
  function needCard(n) {
    const shifts = Array.isArray(n.schichten) && n.schichten.length ? n.schichten : [{ zeit: n.zeit, personen: n.personen, zugesagt: n.zugesagt }];
    const total = shifts.reduce((s, x) => s + (Number(x.personen) || 0), 0);
    const taken = shifts.reduce((s, x) => s + Math.min(Number(x.zugesagt) || 0, Number(x.personen) || 0), 0);
    const rows = shifts
      .map((s) => {
        const need = Number(s.personen) || 0;
        const left = Math.max(need - (Number(s.zugesagt) || 0), 0);
        const label = s.zeit ? `${T.shift} ${s.zeit}` : '';
        const status = !need ? '' : left ? T.free(left) : T.full;
        const button = !need || left
          ? `<a class="btn btn-small" href="#projekte" data-pick="${esc(n.titel)}" data-pick-unit="${esc(unitOf(n))}" data-pick-shift="${esc(s.zeit || '')}">${T.signUp}</a>`
          : '';
        return `<li class="shift${need && !left ? ' full' : ''}">
          <span><strong>${esc(label || (need ? T.needed(need) : ''))}</strong>${label && need ? ` · ${esc(T.needed(need))}` : ''}${status ? ` <span class="meta">${esc(status)}</span>` : ''}</span>
          ${button}
        </li>`;
      })
      .join('');
    const pct = total ? Math.round((taken / total) * 100) : 0;
    return `<article class="card need">
      <p class="meta">${esc(fmt(n.datum))}${n.ort ? ` · ${esc(n.ort)}` : ''} ${unitTag(n)}</p>
      <h3>${esc(tx(n, 'titel'))}</h3>
      ${tx(n, 'text') ? `<p>${esc(tx(n, 'text'))}</p>` : ''}
      ${total ? `<p class="meta">${taken} / ${total}</p><div class="bar" role="img" aria-label="${taken} / ${total}"><i data-pct="${pct}"></i></div>` : ''}
      <ul class="shifts">${rows}</ul>
      ${n.link ? `<p><a href="${esc(n.link)}" target="_blank" rel="noopener">${T.more}</a></p>` : ''}
    </article>`;
  }

  // Ein Filter gilt für beide Seiten, damit die Auswahl beim Wechseln erhalten bleibt
  $$('[data-unit-filter]').forEach((sel) =>
    sel.addEventListener('change', () => {
      $$('[data-unit-filter]').forEach((s) => (s.value = sel.value));
      renderLists(sel.value);
    })
  );
  renderLists();

  // Projektauswahl: Wert bleibt deutsch (für den Elternrat), angezeigt wird die Sprache der Seite
  const select = $('#project-select');
  for (const item of [...needs, ...projects]) {
    const o = document.createElement('option');
    o.value = item.titel;
    o.textContent = tx(item, 'titel');
    select.append(o);
  }
  document.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-pick]');
    if (!pick) return;
    e.preventDefault();
    select.value = pick.dataset.pick;
    const unitSelect = $('select[name=schuleinheit]', select.closest('form'));
    if (pick.dataset.pickUnit) unitSelect.value = pick.dataset.pickUnit;
    const message = $('textarea[name=nachricht]', select.closest('form'));
    if (pick.dataset.pickShift) message.value = `${T.shift}: ${pick.dataset.pickShift}\n${message.value.replace(/^(Schicht|Shift): .*\n?/, '')}`;
    select.closest('form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Kontakt und Facebook
  function mailto(subject, body) {
    return `mailto:${encodeURIComponent(config.email || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  $$('[data-email]').forEach((a) => {
    a.href = `mailto:${config.email}`;
    a.textContent = config.email;
  });
  const fbFooter = $('#fb-footer');
  if (config.facebookUrl) {
    fbFooter.href = config.facebookUrl;
    fbFooter.hidden = false;
    $('#fb-contact').innerHTML = `${T.fbFollow} <a href="${esc(config.facebookUrl)}" target="_blank" rel="noopener">Facebook</a>.`;
  } else {
    $('#fb-contact').textContent = T.fbSoon;
  }

  // Impressum: Verantwortliche je Elternrat
  const resp = config.verantwortliche || {};
  $('#responsible').innerHTML = ['Butzen/Semper', 'Chilefeld/Stigeli', 'Zwillikon']
    .map((u) => `<tr><td>${esc(u)}</td><td>${resp[u] ? esc(resp[u]) : `<span class="empty">${T.tbd}</span>`}</td></tr>`)
    .join('');

  // Formulare: per Formulardienst senden oder als E-Mail öffnen.
  // Betreff und Feldnamen bleiben deutsch, damit die Elternräte alle Nachrichten gleich weiterleiten können.
  const SUBJECTS = {
    themen: 'Themenvorschlag Elternbildung',
    projekt: 'Ich helfe bei einem Projekt mit',
    idee: 'Projektidee für die Schule',
    helfen: 'Anmeldung als Helferin oder Helfer',
    buddy: 'Eltern-Buddy',
  };
  const LABELS = {
    themen: 'Themen', vorschlag: 'Eigener Vorschlag', zeit: 'Bevorzugte Zeit', email: 'E-Mail', name: 'Name', projekt: 'Projekt',
    klasse: 'Klasse', nachricht: 'Nachricht', idee: 'Idee', telefon: 'Telefon', schuleinheit: 'Schuleinheit', bereiche: 'Bereiche',
    haeufigkeit: 'Wie oft', sprachen: 'Sprachen', art: 'Anliegen', einheiten: 'Schuleinheiten',
  };

  function collect(form) {
    const data = {};
    for (const [k, v] of new FormData(form)) {
      if (k === 'einwilligung' || !String(v).trim()) continue;
      data[k] = data[k] ? `${data[k]}, ${v}` : String(v).trim();
    }
    if (EN) data.sprache_der_seite = 'Englisch';
    return data;
  }
  LABELS.sprache_der_seite = 'Sprache der Website';

  async function deliver(subject, data) {
    if (config.formEndpoint) {
      const res = await fetch(config.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: subject, ...data }),
      });
      if (!res.ok) throw new Error(T.sendError);
      return T.sent;
    }
    const body = Object.entries(data).map(([k, v]) => `${LABELS[k] || k}: ${v}`).join('\n');
    location.href = mailto(subject, body);
    return T.mailOpen;
  }

  $$('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.form-status', form);
      const data = collect(form);
      if (form.dataset.form === 'themen' && !data.themen && !data.vorschlag) {
        status.className = 'form-status error';
        status.textContent = T.pickTopic;
        return;
      }
      try {
        status.className = 'form-status ok';
        const unit = data.schuleinheit && !['Alle Schuleinheiten', 'Weiss ich noch nicht'].includes(data.schuleinheit) ? data.schuleinheit : 'Alle';
        status.textContent = await deliver(`[${unit}] ${SUBJECTS[form.dataset.form]}${EN ? ' (EN)' : ''}`, data);
        if (config.formEndpoint) form.reset();
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = err.message;
      }
    });
  });

  // Newsletter: beim Newsletter-Dienst anmelden oder per E-Mail
  $('#newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const status = $('.form-status', form);
    const email = form.email.value.trim();
    const units = $$('input[name=einheiten]:checked', form).map((i) => i.value);
    if (!units.length) {
      status.className = 'form-status error';
      status.textContent = T.pickUnit;
      return;
    }
    if (config.newsletterAction) {
      const f = document.createElement('form');
      f.method = 'post';
      f.action = config.newsletterAction;
      f.target = '_blank';
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = config.newsletterEmailField || 'EMAIL';
      input.value = email;
      f.append(input);
      if (config.newsletterUnitsField) {
        const unitsInput = document.createElement('input');
        unitsInput.type = 'hidden';
        unitsInput.name = config.newsletterUnitsField;
        unitsInput.value = units.join(', ');
        f.append(unitsInput);
      }
      document.body.append(f);
      f.submit();
      f.remove();
      status.className = 'form-status ok';
      status.textContent = T.nlConfirm;
    } else {
      location.href = mailto('Anmeldung Newsletter', `Bitte nehmen Sie mich in den Newsletter der Elternräte auf.\n\nE-Mail: ${email}\nSchuleinheiten: ${units.join(', ')}${EN ? '\nSprache: Englisch' : ''}`);
      status.className = 'form-status ok';
      status.textContent = T.nlMail;
    }
  });

  route();
})();
