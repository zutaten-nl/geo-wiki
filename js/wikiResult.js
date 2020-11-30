export const wikiResult = customElements.define('wiki-result', class extends HTMLElement {
  constructor() {
    super();

    this._result = {};
  }

  set result(value) {
    this._result = value;
  }

  template() {
    return `
      <article>
        <strong>${this._result.title}</strong>
        <small>${this._result.terms === undefined ? '' : this._result.terms.description}</small>    
      </article>
    `
  }

  style() {
    return `
      article {
        line-height: 1.5;
        margin: .3rem 0;
      }
      
      strong,small {
        display: block;
      }
      
      small {
        color: gray;
      }
    `;
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});

    const style = document.createElement('style');
    style.textContent = this.style();
    this.shadowRoot.appendChild(style);

    const template = document.createElement('template');
    template.innerHTML = this.template();
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.addEventListener('click', () => {
      document.querySelector('wiki-article').setAttribute('page', this._result.pageid);
    });
  }
});