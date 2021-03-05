<script>
  import Header from './components/Header.svelte';
  import Map from './screens/Map.svelte';
</script>

<div class='layout'>
  <Header />
  <Map />
</div>

<style>
	.layout {
    display: flex;
    flex-direction: column;
	}
</style>
