<script>
  import { beforeUpdate } from 'svelte';
  import {
    countBy,
    find,
    flatten,
    forEach,
    last,
    map,
    reduce,
  } from 'lodash';
  import { Map, controls } from '@beyonk/svelte-mapbox'
  import { COLORS, STATE_COlORS } from '../resources/colors';

  export let countriesInStudy;
  export let onCountrySelected;
  export let countryToToggle = '';
  export let filtersSelectedWithCountries = [];

  const { ScaleControl } = controls

  let mapComponent;

  const heatmapCountriesIds = map(countriesInStudy, countryName => ({
    heatmapCountryId: `countries-fills-heatmap-${countryName}`,
    countryName,
  }));

  $: heatmapIdsHighlighted = map(heatmapCountriesIds, heatmapCountry => ({
    ...heatmapCountry,
    highlighted: !!find(filtersSelectedWithCountries, { country: heatmapCountry.countryName }),
  }));

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

    forEach(heatmapCountriesIds, ({ heatmapCountryId }) => {
      mapComponent.getMap().addLayer({
        id: heatmapCountryId,
        type: 'heatmap',
        source: 'countries',
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': 1,
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [0, 30],
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 0.6,
            stops: [
              [14, 0.6],
              [15, 0.6]
            ]
          },
        },
        filter: ['==', 'NAME', ''],
      });
    });

    mapComponent.getMap().addLayer({
      id: 'country-fill',
      type: 'fill',
      source: 'countries',
      layout: {},
      paint: {
        'fill-color': COLORS.blue,
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

  const resetHeatmapLayerFor = countryName => {
    mapComponent
      .getMap()
      .setFilter(`countries-fills-heatmap-${countryName}`, ['==', 'NAME', '']);
  };

  const toggleHeatmapFor = ({ filterId, country, isOn }) => {
    const { states = [] } = find(filtersSelectedWithCountries, { country }) || {};

    const statesCount = countBy(states, state => state);

    const a = map(statesCount, (stateCount, state) => [
      stateCount/states.length,
      STATE_COlORS[state],
    ]);

    const densityValues = flatten(reduce(statesCount, (densityColors, stateCount, state) => {
      const [lastRange = 0] = last(densityColors) || [];
      const range = (stateCount/states.length) + lastRange;

      densityColors.push([
        range,
        STATE_COlORS[state],
      ]);

      return densityColors;
    }, []));

    if (isOn) {
      mapComponent
        .getMap()
        .setFilter(filterId, [
          '==', 'NAME', country
        ])
        .setPaintProperty(
          filterId,
          'heatmap-color',
          [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(236,222,239,0)',
            ...densityValues
          ]
        );
    } else {
      mapComponent
        .getMap()
        .setFilter(filterId, ['==', 'NAME', '']);
    }
  };

  beforeUpdate(() => {
    if (mapComponent && mapComponent.getMap()) {
      mapComponent
        .getMap()
        .setFilter('country-fill', [
          'any',
          ...map(filtersSelectedWithCountries, filteredCountry => ['==', 'NAME', filteredCountry.country]),
        ]);

      forEach(heatmapIdsHighlighted, heatmapIdHighlighted => {
        const { countryName, heatmapCountryId, highlighted } = heatmapIdHighlighted;

        toggleHeatmapFor({
          filterId: heatmapCountryId,
          country: countryName,
          isOn: highlighted,
        });
      });
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
  minZoom: 2.5,
  maxZoom: 2.5,
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
