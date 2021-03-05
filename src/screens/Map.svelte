<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Map from '../components/Map.svelte';
  import BoxDetail from '../components/BoxDetail.svelte';
  import Radio from '../components/Radio.svelte';
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
      title: 'Ley 9764 art. 25 num. 2',
      description: `
Lorem ipsum dolor sit amet
consectetur adipiscing elit.

Nunc dictum risus eu odio
consectetur elementum. Maecenas
maximus, ligula vehicula porta
luctus.`,
    },
  ];

  const countryDetails = {
    country: 'Uruguay',
    details,
  };

  const onChecked = checkedValue => {
    console.log('yeah', checkedValue)
  };

  const onClose = () => {
    console.log('closed');
  };

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
    <Map />
    <div class={boxContainer}>
      <BoxDetail
        countryDetails={countryDetails}
        onClose={onClose}
      />
    </div>
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

