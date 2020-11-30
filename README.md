# Geo Wiki
Browse your neighbourhood on Wikipedia.

See: https://zutaten-nl.github.io/geo-wiki/

## Background

This sketch uses the geolocation API in the browser to pass your location to the Wikipedia API that has an option for
localised searches based on longitude and latitude.

Wikipedia allows using Javascripts fetch API without CORS-restrictions if you add the parameter `origin: '*'`.

Three different customElements (native components) are used:
 
- wikiRadius: that triggers geolocation request and wikipedia search
- wikiResult: that has a public setter `.result` to pass the JSON result to the element
- wikiArticle: that uses `attributeChangedCallback` and `observedAttributes` to load the wikipedia page in the element

