import {wikiApi} from "./wikiApi.js";

export const wikiArticle = customElements.define('wiki-article', class extends HTMLElement {
  static get observedAttributes() {
    return ['page'];
  }

  style() {
    return `
        :host > div {
          line-height: 1.5;
        }
        
        a {
          color: gray;
        }
        
        .float-right, .tright {
            float: right;
            margin: 1rem 0 1rem 1rem;
        }

        .mw-editsection {
            display: none;
        }
    `
  }

  setStyle() {
    const style = document.createElement('style');
    style.textContent = this.style();
    this.shadowRoot.appendChild(style);
  }

  attributeChangedCallback(name, old, value) {
    if (name === 'page') {
      this.shadowRoot.innerHTML = '';
      this.setStyle();
      (new wikiApi).getPage(value).then(r => {
        const h1 = document.createElement('h1');
        h1.innerHTML = r.parse.title;
        this.shadowRoot.appendChild(h1);
        const body = document.createElement('div');
        body.innerHTML = r.parse.text['*'];
        this.shadowRoot.appendChild(body);
      })
    }
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
  }
});