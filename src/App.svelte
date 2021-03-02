<script>
  import Header from './Header.svelte';
  import Map from './map/Map.svelte';
  import Radio from './Radio.svelte';

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

  const onChecked = checkedValue => {
    console.log('yeah', checkedValue)
  };
</script>

<div class='layout'>
  <Header />
  <main class="container">
    <div class="filters">
      <Radio
        categories={[categoryA, categoryB]}
        onChecked={onChecked}
      />
    </div>

    <div class='map'>
      <Map />
    </div>
  </main>
</div>

<style>
	.layout {
    display: flex;
    flex-direction: column;
	}

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
