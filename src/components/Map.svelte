<script>
  import { beforeUpdate } from 'svelte';
  import { map } from 'lodash';
  import { Map, controls } from '@beyonk/svelte-mapbox'
  import { COLORS } from '../resources/colors';

  export let countriesInStudy;
  export let onCountrySelected;
  export let countryToToggle = null;

  const { ScaleControl } = controls

  let mapComponent;

  const onMapReady = () => {
    mapComponent.getMap().addSource("countries", {
      type: 'geojson',
      data: 'resources/ne_110m_admin_0_countries.geojson',
    })

    mapComponent.getMap().addLayer({
      id: 'countries-fills',
      type: 'fill',
      source: 'countries',
      paint: {
        'fill-color': COLORS.blue,
        'fill-opacity': 0.1,
      },
      filter: [
        'any',
        ...map(countriesInStudy, countryName => ['==', 'NAME', countryName])
      ],
    });

    mapComponent.getMap().addLayer({
      id: 'country-fill',
      type: 'fill',
      source: 'countries',
      layout: {},
      paint: {
        'fill-color': 'yellow',
        'fill-opacity': 0.3,
      },
      filter: ['==', 'NAME', ''],
    });
  };

  const shouldHighlightCountry = e => {
    const clickedPoint = mapComponent.getMap().project(e.detail);
    const features = mapComponent.getMap().queryRenderedFeatures(clickedPoint, { layers: ['countries-fills'] });

    if (features.length) {
      const [operator, property, currentCountry] = mapComponent.getMap().getFilter('country-fill');
      const { properties: { NAME: countryName } } = features[0];

      const valueToApply = countryName === currentCountry ? '' : countryName;

      onCountrySelected(valueToApply);
    }
  };

  beforeUpdate(() => {
    if (mapComponent && mapComponent.getMap()) {
      mapComponent.getMap().setFilter('country-fill', ['==', 'NAME', countryToToggle]);
    }
  });
</script>

<Map
  accessToken="pk.eyJ1IjoiZGlhYmxvdXJiYW5vIiwiYSI6ImNrbHhibThyaDBzb2gyd282NGtnM3kzNjUifQ.8pnavCVU4tlLBlg2jO17Og"
  bind:this={mapComponent}
  style="mapbox://styles/diablourbano/cklxjjmez1ree17pj7x1lgcdo"
  on:ready={onMapReady}
  on:click={shouldHighlightCountry}
  options={{
  scrollZoom: true,
  zoom: 0,
  minZoom: 0,
  maxZoom: 8,
  }}
>
  <ScaleControl />
</Map>

<style>
  :global(.mapboxgl-map) {
    height: 200px;
  }

  :global(.mapboxgl-canvas:focus) {
    outline: none;
  }
</style>
