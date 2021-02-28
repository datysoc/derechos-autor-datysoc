<script>
  import Header from './Header.svelte';
  import Map from './map/Map.svelte';
  import Radio from './radioGroup/Radio.svelte';

  const category = {
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
</script>

<div class='layout'>
  <Header />
  <main class="container">
    <div class="filters">
      <Radio category={category} />
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
