<script>
  import { Router, Route } from "svelte-routing";
  import Header from './components/Header.svelte';

  import Home from './screens/Home.svelte';
  import Map from './screens/Map.svelte';

  export let url = '';
</script>

<div class='layout'>
  <Router url={url}>
    <Header />

    <Route path="/map">
      <Map />
    </Route>

    <Route path="/">
      <Home />
    </Route>
  </Router>
</div>

<style>
	.layout {
    display: flex;
    flex-direction: column;
	}
</style>
