(() => {
  const config = window.SITE_CONFIG || {};
  const content = window.SITE_CONTENT || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const fmt = (iso) => (iso ? new Date(`${iso}T12:00`).toLocaleDateString('de-CH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '');
  const today = new Date().toISOString().slice(0, 10);

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

  // Inhalte aus content.js
  const emptyNote = (text) => `<p class="empty">${esc(text)}</p>`;

  // Kennzeichnung der Schuleinheit; ohne Angabe gilt ein Eintrag für alle
  const unitOf = (x) => (x.schuleinheit && x.schuleinheit !== 'Alle' ? x.schuleinheit : 'Alle Schuleinheiten');
  const unitTag = (x) => `<span class="tag">${esc(unitOf(x))}</span>`;
  const matches = (x, unit) => !unit || unitOf(x) === unit || unitOf(x) === 'Alle Schuleinheiten';

  const news = (content.news || []).slice().sort((a, b) => String(b.datum).localeCompare(String(a.datum)));
  $('#news').innerHTML = news.length
    ? news.map((n) => `<article class="item"><p class="meta">${esc(fmt(n.datum))} ${unitTag(n)}</p><h3>${esc(n.titel)}</h3><p>${esc(n.text)}</p></article>`).join('')
    : emptyNote('Im Moment gibt es keine neuen Mitteilungen. Abonnieren Sie den Newsletter, dann verpassen Sie nichts.');

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
              <h3>${esc(e.titel)}</h3>
              ${e.text ? `<p>${esc(e.text)}</p>` : ''}
              ${e.anmeldung ? `<a class="btn btn-small" href="${mailto(`Anmeldung: ${e.titel} (${unitOf(e)})`, 'Ich melde mich an.\n\nName:\nAnzahl Personen:')}">Anmelden</a>` : ''}
            </article>`
          )
          .join('')
      : emptyNote(unit ? 'Für diese Schuleinheit sind im Moment keine Anlässe geplant.' : 'Die nächsten Anlässe werden bald bekannt gegeben. Schreiben Sie uns, welche Themen Sie interessieren.');

    const nd = needs.filter((n) => matches(n, unit));
    $('#needs').innerHTML = nd.length
      ? nd
          .map(
            (n) => `<article class="card need">
              <p class="meta">${esc(fmt(n.datum))} ${unitTag(n)}</p>
              <h3>${esc(n.titel)}</h3>
              <p>${esc(n.text)}</p>
              <a class="btn btn-small" href="#projekte" data-pick="${esc(n.titel)}" data-pick-unit="${esc(n.schuleinheit || '')}">Ich helfe mit</a>
            </article>`
          )
          .join('')
      : emptyNote('Im Moment suchen wir keine Unterstützung für einen bestimmten Anlass. Melden Sie sich trotzdem gerne unter «Mithelfen».');

    const pr = projects.filter((p) => matches(p, unit));
    $('#projects').innerHTML = pr.length
      ? pr.map((p) => `<article class="card"><p class="meta">${p.status ? `${esc(p.status)} ` : ''}${unitTag(p)}</p><h3>${esc(p.titel)}</h3><p>${esc(p.text)}</p></article>`).join('')
      : emptyNote('Die Projekte der Elternräte werden hier bald vorgestellt.');
  }

  // Ein Filter gilt für beide Seiten, damit die Auswahl beim Wechseln erhalten bleibt
  $$('[data-unit-filter]').forEach((sel) =>
    sel.addEventListener('change', () => {
      $$('[data-unit-filter]').forEach((s) => (s.value = sel.value));
      renderLists(sel.value);
    })
  );
  renderLists();

  const select = $('#project-select');
  for (const t of [...needs.map((n) => n.titel), ...projects.map((p) => p.titel)]) {
    const o = document.createElement('option');
    o.textContent = t;
    select.append(o);
  }
  document.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-pick]');
    if (!pick) return;
    e.preventDefault();
    select.value = pick.dataset.pick;
    const unitSelect = $('select[name=schuleinheit]', select.closest('form'));
    if (pick.dataset.pickUnit && pick.dataset.pickUnit !== 'Alle') unitSelect.value = pick.dataset.pickUnit;
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
    $('#fb-contact').innerHTML = `Folgen Sie uns auf <a href="${esc(config.facebookUrl)}" target="_blank" rel="noopener">Facebook</a>.`;
  } else {
    $('#fb-contact').textContent = 'Eine Facebook-Seite des Elternrats ist in Vorbereitung.';
  }

  // Impressum: Verantwortliche je Elternrat
  const resp = config.verantwortliche || {};
  $('#responsible').innerHTML = ['Butzen/Semper', 'Chilefeld/Stigeli', 'Zwillikon']
    .map((u) => `<tr><td>${esc(u)}</td><td>${resp[u] ? esc(resp[u]) : '<span class="empty">wird ergänzt</span>'}</td></tr>`)
    .join('');

  // Formulare: per Formulardienst senden oder als E-Mail öffnen
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
    return data;
  }

  async function deliver(subject, data) {
    if (config.formEndpoint) {
      const res = await fetch(config.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: subject, ...data }),
      });
      if (!res.ok) throw new Error('Das Senden hat nicht geklappt. Bitte versuchen Sie es später erneut oder schreiben Sie uns eine E-Mail.');
      return 'Vielen Dank! Wir haben Ihre Nachricht erhalten und melden uns.';
    }
    const body = Object.entries(data).map(([k, v]) => `${LABELS[k] || k}: ${v}`).join('\n');
    location.href = mailto(subject, body);
    return 'Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Nachricht. Bitte senden Sie sie dort ab.';
  }

  $$('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.form-status', form);
      const data = collect(form);
      if (form.dataset.form === 'themen' && !data.themen && !data.vorschlag) {
        status.className = 'form-status error';
        status.textContent = 'Bitte wählen Sie mindestens ein Thema oder schreiben Sie einen eigenen Vorschlag.';
        return;
      }
      try {
        status.className = 'form-status ok';
        const unit = data.schuleinheit && !['Alle Schuleinheiten', 'Weiss ich noch nicht'].includes(data.schuleinheit) ? data.schuleinheit : 'Alle';
        status.textContent = await deliver(`[${unit}] ${SUBJECTS[form.dataset.form]}`, data);
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
      status.textContent = 'Bitte wählen Sie mindestens eine Schuleinheit.';
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
      status.textContent = 'Fast geschafft: Bitte bestätigen Sie die Anmeldung über den Link in der E-Mail, die Sie gleich erhalten.';
    } else {
      location.href = mailto('Anmeldung Newsletter', `Bitte nehmen Sie mich in den Newsletter der Elternräte auf.\n\nE-Mail: ${email}\nSchuleinheiten: ${units.join(', ')}`);
      status.className = 'form-status ok';
      status.textContent = 'Ihr E-Mail-Programm öffnet sich mit der Anmeldung. Bitte senden Sie die Nachricht dort ab.';
    }
  });

  route();
})();
