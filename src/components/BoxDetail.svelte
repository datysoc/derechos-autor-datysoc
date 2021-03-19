<script>
  import {slide} from 'svelte/transition';
  import { find, first } from 'lodash';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { COLORS } from '../resources/colors';
  import ExceptionsDetails from '../components/ExceptionsDetails.svelte';
  import LawsDetails from '../components/LawsDetails.svelte';

  export let onClose;
  export let countryDetails;
  export let states;
  export let categories;

  $: countryName = css`
    color: ${COLORS.white};
    font-size: 24px;
    margin: 0 0 22px;
  `;

  $: categoryDescription = css`
    color: ${COLORS.white};
    font-family: "Space Mono", Arial, sans-serif;
    font-size: 14px;
    margin: 0 0 30px;
  `;

  const categoryFor = categoryId =>
    find(categories, { id: categoryId });

  $: categoryToShow = first(countryDetails.categories);
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
      <div class="categoryContainer">
        <div class="category">
          <div class="categoryDetail">
            <p class="stateLabel">
              <span>{categoryFor(categoryToShow.id).value}</span>
            </p>
          </div>
          <p class={categoryDescription}>
            {categoryFor(categoryToShow.id).description}
          </p>
        </div>

        <div class="categoryDetails" transition:slide|local={{ duration: 500 }}>
          <ExceptionsDetails
            categoryDesc={categoryFor(categoryToShow.id).items}
            exceptions={categoryToShow.exceptions}
            states={states}
          />
        </div>
      </div>
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

  .categoryContainer {}

</style>
