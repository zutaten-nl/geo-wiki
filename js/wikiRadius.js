import {wikiApi} from "./wikiApi.js";

export const wikiRadius = customElements.define('wiki-radius', class extends HTMLElement {
  setNavigation(radius) {
    const nav = document.querySelector('nav');
    nav.innerHTML = '';
    nav.classList.add('loading');
    navigator.geolocation.getCurrentPosition(position => {
      (new wikiApi).getByLocation(position.coords.longitude, position.coords.latitude, radius).then(r => {
        if (r.query.pages === undefined) {
          nav.classList.remove('loading');
          nav.innerHTML = `<p>No results! Widen your radius.</p>`;

          return;
        }
        for (const i in r.query.pages) {
          const el = document.createElement('wiki-result');
          el.result = r.query.pages[i];
          nav.appendChild(el);
          nav.classList.remove('loading');
        }
      });
    }, e => {
      nav.classList.remove('loading');
      nav.innerHTML = `<p>This won't work: ${e.message}</p>`;
    });
  }

  template() {
    const select = document.createElement('select');
    for (let i = 1; i < 21; i++) {
      const option = document.createElement('option');
      const step = i * 100;
      option.setAttribute('value', step);
      option.innerText = step + ' meter';
      if (step === Number(this.getAttribute('radius'))) {
        option.setAttribute('selected', true);
      }
      select.appendChild(option);
    }
    this.shadowRoot.appendChild(select);
  }

  css() {
    return `
      select {
        border: .1rem solid black;
        padding: .2rem;
      }
    `;
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});

    const style = document.createElement('style');
    style.textContent = this.css();
    this.shadowRoot.appendChild(style);

    this.template();

    this.setNavigation(this.getAttribute('radius'));

    this.shadowRoot.querySelector('select').addEventListener('change', e => {
      this.setNavigation(e.target.value);
    });
  }
});