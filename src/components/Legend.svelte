<script>
  import Icon from 'svelte-awesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import { COLORS, STATE_COlORS } from '../resources/colors';

  export let states;
  export let onCloseLegend;

  $: legend = css`
    width: 100%;
    height: auto;
    background-color: ${COLORS.transparentGray20} 
    border-radius: 8px;
    padding: 16px 22px;
  `;

  $: legendDetail = css`
    display: flex;
    align-items: center;
  `;

  $: stateIndicator = state => css`
    background-color: ${STATE_COlORS[state]};
    padding: 10px;
    border-radius: 10px;
    height: 2px;
    width: 2px;
  `;

  $: legendTitle = css`
    color: ${COLORS.white};
    display: flex;
    flex-direction: column;
    margin-left: 12px;
  `;

  $: stateTitle = css`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  `;

  $: stateDescription = css`
    font-size: 12px;
    font-weight: 500;
  `;
</script>

<div class={legend}>
  <button
    class="closeButton"
    on:click={onCloseLegend}
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
  {#each states as state (state.id)}
    <div class={legendDetail}>
      <span class={stateIndicator(state.id)} />
      <p class={legendTitle}>
        <span class={stateTitle}>{state.state}</span>
        <span class={stateDescription}>{state.description}</span>
      </p>
    </div>
  {/each}
</div>

<style>
  .closeButton {
    border: 0;
    background-color: transparent;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0;
    position: absolute;
    top: 2px;
    right: 0;
    transform: translateX(39px);
  }
</style>
