<script>
  import {slide} from 'svelte/transition';
  import { find, isEmpty, map, partition } from 'lodash';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS, STATE_COlORS } from '../resources/colors';
  import LawsDetails from '../components/LawsDetails.svelte';

  export let categoryDesc;
  export let exceptions;
  export let states;

  const toggleCollapse = state => {
    const [stateToToggle, others] = partition(collapsedState, anState => anState.state === state);
    const { isCollapsed: prevState = false } = stateToToggle[0] || {};

    others.push({ state, isCollapsed: !prevState })

    collapsedState = others;
  };

  const subcategoryFor = subcategoryId =>
    find(categoryDesc, { id: subcategoryId });


  $: stateIndicator = state => css`
    background-color: ${STATE_COlORS[state]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-radius: 8px;
  `;

  $: stateDetailsContainer = state => css`
    margin: 16px 0;
    border-left: solid 3px ${STATE_COlORS[state]};
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  `;


  $: collapsedState = map(exceptions, ({ state }, idx) => {
    return { state, isCollapsed: idx !==0 };
  });

  $: shouldCollapse = state => {
    const { isCollapsed = false } = find(collapsedState, anState => anState.state === state) || {};

    return isCollapsed;
  };

  $: stateLabelFor = stateId => find(states, { id: stateId });
</script>

{#each exceptions as exception (exception.id)}
  <div class={stateDetailsContainer(exception.state)}>
    <div class={stateIndicator(exception.state)}>
      <p class="stateLabel">
        <span>• {subcategoryFor(exception.id).label}</span>
        <br />
        <span class="exceptionState">( {stateLabelFor(exception.state).state} )</span>
      </p>
      {#if !isEmpty(exception.norms)}
        <button
          class={`
            button
            angleDown
            ${!shouldCollapse(exception.state) ? 'angleUp' : ''}
          `}
          on:click={() => toggleCollapse(exception.state)}
        >
          <Icon
            data={faAngleDown}
            scale={1.5}
            style={`color: ${COLORS.white}`}
          />
        </button>
      {/if}
    </div>
    {#if !shouldCollapse(exception.state) || isEmpty(exception.norms)}
      <div class="stateDetails" transition:slide|local={{ duration: 500 }}>
        <LawsDetails
          details={exception.norms}
        />
      </div>
    {/if}
  </div>
{/each}

<style>
  .stateDetails {
    padding: 0 2px 0 12px;
  }

  .stateLabel {
    color: white;
    font-weight: 500;
    font-size: 1.2em;
  }

  .stateLabel > .exceptionState {
    font-size: 0.8em;
    margin-left: 12px;
  }

  .angleDown {
    display: inline-block;
    transition-duration: 500ms;
    transition-property: transform;
  }

  .angleUp {
    transform: rotate(180deg);
  }

  .button {
    background: 0;
    height: 32px;
    padding: 6px;
    margin: 0;
    border: 0;
    cursor: pointer;
  }
</style>
