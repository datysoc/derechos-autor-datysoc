<script>
  import { Map, controls } from '@beyonk/svelte-mapbox'
  
  const { ScaleControl } = controls
</script>

<Map
  accessToken="pk.eyJ1IjoiZGlhYmxvdXJiYW5vIiwiYSI6ImNrbHhibThyaDBzb2gyd282NGtnM3kzNjUifQ.8pnavCVU4tlLBlg2jO17Og"
  style="mapbox://styles/diablourbano/cklxerdyo2w5s17qop9qud88d"
  options={{
    scrollZoom: true,
    zoom: 0,
    minZoom: 0,
    maxZoom: 8,
  }}
>
  <ScaleControl />
</Map>

<style>
    :global(.mapboxgl-map) {
        height: 200px;
    }
</style>
