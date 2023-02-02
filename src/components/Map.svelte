<script>
  import { beforeUpdate } from 'svelte';
  import {
    countBy,
    find,
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

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapboxStyle = import.meta.env.VITE_MAPBOX_STYLE;

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
        'fill-opacity': 0,
      },
      filter: [
        'any',
        ...map(countriesInStudy, countryName => ['==', 'NAME', countryName])
      ],
    });

    forEach(heatmapCountriesIds, ({ heatmapCountryId }) => {
      mapComponent.getMap().addLayer({
        id: heatmapCountryId,
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': COLORS.red,
          'fill-opacity': 0.1,
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
        'fill-opacity': 0,
      },
      filter: ['==', 'NAME', ''],
    });

    fillColorForCountries();

    mapComponent.setCenter([-65, -15]);
  };

  const shouldHighlightCountry = e => {
    const clickedPoint = mapComponent.getMap().project(e.detail);
    const features = mapComponent.getMap().queryRenderedFeatures(clickedPoint, { layers: ['countries-fills'] });

    if (features.length) {
      const [equalOp, propertyName, currentCountry] = mapComponent.getMap().getFilter('country-fill');
      const { properties: { NAME: countryName } } = features[0];

      const valueToApply = countryName === currentCountry ? '' : countryName;

      onCountrySelected(valueToApply);
    }
  };

  const toggleHeatmapFor = ({ filterId, country, isOn }) => {
    const { states = [] } = find(filtersSelectedWithCountries, { country }) || {};

    const statesCount = countBy(states, state => state);

    mapComponent
      .getMap()
      .setFilter(filterId, [
        '==', 'NAME', country
      ])
      .setPaintProperty(
        filterId,
        'fill-color',
        STATE_COlORS[states[0]],
      );

    if (isOn) {
      mapComponent
        .getMap()
        .setPaintProperty(
          filterId,
          'fill-opacity',
          0.5,
        );
    } else {
      mapComponent
        .getMap()
        .setPaintProperty(
          filterId,
          'fill-opacity',
          0.2,
        );
    }
  };

  const fillColorForCountries = () => {
    forEach(heatmapCountriesIds, heatmapCountry => {
      const { countryName, heatmapCountryId } = heatmapCountry;

      const isOn = countryToToggle ? countryName === countryToToggle : false;

      toggleHeatmapFor({
        filterId: heatmapCountryId,
        country: countryName,
        isOn,
      });
    });
  };

  beforeUpdate(() => {
    if (mapComponent && mapComponent.getMap()) {
      fillColorForCountries();
    }
  });
</script>

<div class="relative w-screen h-screen">
  <Map
    accessToken={mapboxToken}
    bind:this={mapComponent}
    style={mapboxStyle}
    on:ready={onMapReady}
    on:click={shouldHighlightCountry}
    options={{
      scrollZoom: true,
      zoom: 2.5,
      minZoom: 2.4,
      maxZoom: 5,
    }}
  >
    <ScaleControl />
  </Map>
</div>
