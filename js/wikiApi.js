export class wikiApi {
  getByLocation(long, lat, radius) {
    const params = new URLSearchParams({
      origin: '*',
      action: 'query',
      prop: 'coordinates|pageimages|pageterms',
      colimit: 50,
      piprop: 'thumbnail',
      pithumbsize: 144,
      pilimit: 50,
      wbptterms: 'description',
      generator: 'geosearch',
      ggscoord: lat + '|' + long,
      ggsradius: radius,
      ggslimit: 50,
      format: 'json',
    });

    return this.get(params);
  }

  getPage(id) {
    const params = new URLSearchParams({
      origin: '*',
      action: 'parse',
      prop: 'text',
      pageid: id,
      format: 'json',
    });

    return this.get(params);
  }

  get(params) {
    const country = navigator.language.split('-')[1].toLowerCase();
    const url = `https://${country}.wikipedia.org/w/api.php?` + params.toString();

    return fetch(url)
      .then(r => r.json());
  }
}
