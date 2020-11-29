export const wikiResult = customElements.define('wiki-result', class extends HTMLElement {

  template(item) {
    return `
      <article>
        <strong>${item.title}</strong>
        <small>${item.terms.description}</small>    
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

    const item = JSON.parse(this.getAttribute('item'));
    const template = document.createElement('template');
    template.innerHTML = this.template(item);
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.addEventListener('click', () => {
      document.querySelector('wiki-article').setAttribute('page', item.pageid);
    });
  }
});