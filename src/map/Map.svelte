<script>
  import { Map, controls } from '@beyonk/svelte-mapbox'
  
  const { ScaleControl } = controls
</script>

<Map
  accessToken="pk.eyJ1IjoiZGlhYmxvdXJiYW5vIiwiYSI6ImNqemt2aDRwYjBwMHEzY3BnbmVxdjRweGIifQ.cvEBixyqUDlB-uK5B9D5tg"
  style="mapbox://styles/diablourbano/ck1lia3kk31m61co3atvllcbd"
  on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) }
  options={{ scrollZoom: true }}
>
  <ScaleControl />
</Map>

<style>
    :global(.mapboxgl-map) {
        height: 200px;
    }
</style>
