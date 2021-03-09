<script>
  import {slide} from 'svelte/transition';
  import { find, map, partition } from 'lodash';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS } from '../resources/colors';
  import ExceptionsDetails from '../components/ExceptionsDetails.svelte';
  import LawsDetails from '../components/LawsDetails.svelte';

  export let onClose;
  export let countryDetails;
  export let states;
  export let categories;

  const toggleCollapse = categoryId => {
    const [categoryToToggle, others] = partition(collapsedCategories, cat => cat.categoryId === categoryId);
    const { isCollapsed: prevState = false } = categoryToToggle[0] || {};

    others.push({ categoryId, isCollapsed: !prevState })

    collapsedCategories = others;
  };

  $: countryName = css`
    color: ${COLORS.white};
    font-size: 24px;
    margin: 0 0 22px;
  `;

  $: categoryContainer = css`
    padding: 0 10px 8px 12px;
    background-color: ${COLORS.transparentWhite10};
    border-radius: 12px;
    margin: 2px 0 18px;
  `;

  $: categoryDescription = css`
    color: ${COLORS.white};
    font-family: "Space Mono", Arial, sans-serif;
    font-size: 14px;
    margin: 0 0 30px;
  `;

  const categoryFor = categoryId =>
    find(categories, { id: categoryId });

  $: collapsedCategories = map(countryDetails.categories, (cat, idx) => {
    return { categoryId: cat.id, isCollapsed: idx !==0 };
  });

  $: shouldCollapse = categoryId => {
    const { isCollapsed = false } = find(collapsedCategories, { categoryId }) || {};

    return isCollapsed;
  };
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
    <div class="scrollContainer">
      {#each countryDetails.categories as category (category.id)}
        <div class={categoryContainer}>
          <div class="category">
            <div class="categoryDetail">
              <p class="stateLabel">
                <span>{categoryFor(category.id).value}</span>
              </p>
              <button
                class={`
                  button
                  angleDown
                  ${!shouldCollapse(category.id) ? 'angleUp' : ''}
                `}
                on:click={() => toggleCollapse(category.id)}
              >
                <Icon
                  data={faAngleDown}
                  scale={1.5}
                  style={`color: ${COLORS.white}`}
                />
              </button>
            </div>
            <p class={categoryDescription}>
              {categoryFor(category.id).description}
            </p>
          </div>

          {#if !shouldCollapse(category.id)}
            <div class="categoryDetails" transition:slide|local={{ duration: 500 }}>
              <ExceptionsDetails
                categoryDesc={categoryFor(category.id).items}
                exceptions={category.exceptions}
                states={states}
              />
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .box {
    width: 100%;
    height: 100%;
  }

  .stateLabel {
    color: white;
    font-weight: 500;
    font-size: 1.2em;
  }

  .detailsContainer {
    padding: 2px 20px 30px;
  }

  .scrollContainer {
    border-radius: 6px;
    height: calc(100vh - 200px);
    overflow: hidden;
    overflow-y: auto;
  }

  .category {}

  .categoryDetail {
    align-items: center;
    display: flex;
    justify-content: space-between;
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
