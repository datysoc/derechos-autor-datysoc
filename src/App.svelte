<script>
  import { Router, Route } from "svelte-routing";
  import Header from './components/Header.svelte';

  import Home from './screens/Home.svelte';
  import Map from './screens/Map.svelte';
  import Glossary from './screens/Glossary.svelte';
  import PrivacyPolicy from './screens/PrivacyPolicy.svelte';

  export let url = '';
</script>

<div class='layout'>
  <Router url={url}>
    <Header />

    <Route path="/glosario">
      <Glossary />
    </Route>

    <Route path="/mapa">
      <Map />
    </Route>

    <Route path="/politica-privacidad">
      <PrivacyPolicy />
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
