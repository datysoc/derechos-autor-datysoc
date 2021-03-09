<script>
  import {slide} from 'svelte/transition';
  import { find, flatten, map, partition, groupBy } from 'lodash';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS, STATE_COlORS } from '../resources/colors';
  import LawsDetails from '../components/LawsDetails.svelte';

  export let onClose;
  export let countryDetails;
  export let states;
  export let categories;

  let statesInCountry = flatten(map(countryDetails.categories, category => {
    return map(category.exceptions, exception => {
      return exception.state;
    })
  }));

  const toggleCollapse = state => {
    const [stateToToggle, others] = partition(collapsedState, anState => anState.state === state);
    const { isCollapsed: prevState = false } = stateToToggle[0] || {};

    others.push({ state, isCollapsed: !prevState })

    collapsedState = others;
  };

  $: countryName = css`
    color: ${COLORS.white};
    font-size: 24px;
    margin: 0 0 12px;
  `;

  $: stateIndicator = state => css`
    background-color: ${STATE_COlORS[state]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-radius: 8px;
  `;

  const categoryFor = categoryId =>
    find(categories, { id: categoryId });

  $: collapsedState = map(statesInCountry, (state, idx) => {
    return { state, isCollapsed: idx !==0 };
  });

  $: shouldCollapse = state => {
    const { isCollapsed = false } = find(collapsedState, anState => anState.state === state) || {};

    return isCollapsed;
  };

  $: stateLabelFor = stateId => find(states, { id: stateId });
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
    <h3 class={countryName}>{countryDetails.name}</h3>
    {#each countryDetails.categories as category (category.id)}
      <div>
        <div>
          <p class="stateLabel">
            <span>{categoryFor(category.id).value}</span>
          </p>
          <button
            class={`
              button
              angleDown
            `}
            on:click={() => console.log('so something')}
          >
            <Icon
              data={faAngleDown}
              scale={1.5}
              style={`color: ${COLORS.white}`}
            />
          </button>
        </div>

        {#each category.exceptions as exception (exception.id)}
          <div class="stateDetailsContainer">
            <div class={stateIndicator(exception.state)}>
              <p class="stateLabel">
                <span>• {stateLabelFor(exception.state).name}</span>
              </p>
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
            </div>
            {#if !shouldCollapse(exception.state)}
              <div class="stateDetails" transition:slide|local={{ duration: 500 }}>
                <LawsDetails
                  details={exception.norms}
                />
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .box {
    width: 100%;
    height: 100%;
  }

  .stateDetailsContainer {
    margin: 16px 0;
  }

  .stateDetails {
    padding: 0 12px;
  }

  .stateLabel {
    color: white;
    font-weight: 500;
    font-size: 1.2em;
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
    cursor: pointer;
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
