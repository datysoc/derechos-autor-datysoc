<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { COLORS } from '../resources/colors';
  import LawsDetails from '../components/LawsDetails.svelte';

  export let onClose = null;
  export let countryDetails = {};

  const { country, details } = countryDetails;

  $: countryName = css`
    color: ${COLORS.white};
    font-size: 24px;
    margin: 0 0 12px;
  `;
</script>

<div class="box">
  <button
    class="closeButton"
    on:click={onClose}
  >
    <Icon
      data={faTimesCircle}
      scale={1.5}
      style={`
        color: ${COLORS.white};
        border: 0;
        background-color: transparent;
      `}
    />
  </button>

  <div class="detailsContainer">
    <h3 class={countryName}>{country}</h3>
    <LawsDetails details={details} />
  </div>
</div>

<style>
  .box {
    width: 100%;
    height: 100%;
  }

  .detailsContainer {
    padding: 2px 20px 12px;
  }

  .closeButton {
    border: 0;
    background-color: transparent;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
