<script>
  import { map } from 'lodash';
  import {slide} from 'svelte/transition';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Map from '../components/Map.svelte';
  import BoxDetail from '../components/BoxDetail.svelte';
  import Radio from '../components/Radio.svelte';
  import { horizontalSlide } from '../components/horizontalSlide';
  import { COLORS } from '../resources/colors';

  const categoryA = {
    id: 'foo',
    value: 'foo',
    items: [
      {
        id: 1,
        label: 'bar',
        value: 'bar',
      },
      {
        id: 2,
        label: 'lorem',
        value: 'lorem',
      },
    ],
  };

  const categoryB = {
    id: 'test',
    value: 'test',
    items: [
      {
        id: 4,
        label: 'coffee',
        value: 'coffee',
      },
      {
        id: 5,
        label: 'soda',
        value: 'soda',
      },
    ],
  };

  const details = [
    {
      id: 'detail-a',
      state: 'inexistent',
      title: 'Ley 9739 art. 45 num. 4',
      description: `
Lorem ipsum dolor sit amet
consectetur adipiscing elit.

Nunc dictum risus eu odio
consectetur elementum. Maecenas
maximus, ligula vehicula porta
luctus.`,
    },
    {
      id: 'detail-b',
      state: 'suficient',
      title: 'Ley 9764 art. 25 num. 2',
      description: `
Lorem ipsum dolor sit amet
consectetur adipiscing elit.

Nunc dictum risus eu odio
consectetur elementum. Maecenas
maximus, ligula vehicula porta
luctus.`,
    },
    {
      id: 'detail-c',
      state: 'suficient',
      title: 'Ley 364 art. 25 num. 6',
      description: `
Lorem ipsum dolor sit amet
consectetur adipiscing elit.

Nunc dictum risus eu odio
consectetur elementum. Maecenas
maximus, ligula vehicula porta
luctus.`,
    },
  ];

  const countriesLaws = [
    {
      id: 'Uruguay',
      name: 'Uruguay',
      details,
    },
    {
      id: 'Ecuador',
      name: 'Ecuador',
      details: [
        {
          id: 'ecuador-b',
          state: 'insuficient',
          title: 'Ley something something',
          description: `
    Lorem ipsum dolor sit amet
    consectetur adipiscing elit.

    Nunc dictum risus eu odio
    consectetur elementum. Maecenas
    maximus, ligula vehicula porta
    luctus.`,
        },
      ],
    },
  ];

  const countriesInStudy = map(countriesLaws, country => country.id);

  let slideDetails = false;

  const onChecked = checkedValue => {
    console.log('yeah', checkedValue)
  };

  $: countryId = null;
  const shouldShowDetails = countryName => {
    countryId = countryName;
    slideDetails = !!countryName;
  };

  const onClose = () => {
    countryId = '';
    slideDetails = false;
  };

  $: detailsFor = {...(countriesLaws.find(({ id }) => id === countryId) || {})};

  $: boxContainer = css`
    background-color: ${COLORS.transparentGray10};
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    position: absolute;
    width: 400px;
    height: calc(100vh - 92px);
    top: 69px;
    right: 0;
    padding: 8px;
  `;
</script>

<main class="container">
  <div class="filters">
    <Radio
      categories={[categoryA, categoryB]}
      onChecked={onChecked}
    />
  </div>

  <div class='map'>
    <Map
      countriesInStudy={countriesInStudy}
      onCountrySelected={shouldShowDetails}
      countryToToggle={countryId}
    />
    {#if slideDetails}
      <div class={boxContainer} transition:horizontalSlide={{ duration: 500 }}>
        <BoxDetail
          countryDetails={detailsFor}
          onClose={onClose}
        />
      </div>
    {/if}
  </div>
</main>

<style>
  .container {
    display: flex;
  }

  .filters {
    width: 300px;
  }

  .map {
    width: calc(100% - 300px);
    height: calc(100vh - 68px);
  }
</style>

