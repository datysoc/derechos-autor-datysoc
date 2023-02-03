<script>
  import { onMount } from 'svelte';
  import { Router, Route, navigate } from "svelte-routing";
  import { find } from 'lodash';
  import Footer from './components/Footer.svelte';
  import Header from './components/Header.svelte';
  import Home from './routes/Home.svelte';
  import Map from './routes/Map.svelte';
  import Glossary from './routes/Glossary.svelte';
  import EsLegal from './routes/EsLegal.svelte';
  import Privacy from './routes/Privacy.svelte';
  import NotFound from './routes/NotFound.svelte';

  const routes = [
    '/glosario',
    '/politica-privacidad',
    '/es-legal',
    '/mapa',
    '/',
  ];

  const currentPage = window.location.pathname;

  onMount(() => {
    if (!find(routes, route => route === currentPage)) {
      navigate("/404", { replace: true })
    }
  });

  export let url = '';
</script>

<main class="relative bg-white">
  <Router url={url}>
    <Header isMapRoute={currentPage === '/mapa'} />

    <Route path="/politica-privacidad">
      <Privacy />
    </Route>

    <Route path="/404">
      <NotFound />
    </Route>

    <Route path="/glosario">
      <Glossary />
    </Route>

    <Route path="/es-legal">
      <EsLegal />
    </Route>

    <Route path="/mapa">
      <Map />
    </Route>

    <Route path="/">
      <Home />
    </Route>

    {#if currentPage !== '/mapa'}
      <Footer />
    {/if}
  </Router>
</main>


  {@html `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-5ZLKVS90LE"></script>
    <script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-5ZLKVS90LE', {
    page_title : document.title,
    page_location: window.location.pathname,
});
  </script>
  `}
