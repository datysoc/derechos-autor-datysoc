<script>
  import {
    find,
    flatten,
    filter,
    first,
    groupBy,
    isEmpty,
    map,
  } from 'lodash';
  import {slide} from 'svelte/transition';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Map from '../components/Map.svelte';
  import BoxDetail from '../components/BoxDetail.svelte';
  import Radio from '../components/Radio.svelte';
  import { horizontalSlide } from '../components/horizontalSlide';
  import { COLORS } from '../resources/colors';

  import { categories } from '../data/categories';
  import { states } from '../data/states';
  import { countriesLaws } from '../data/countries';

  const countriesInStudy = map(countriesLaws, country => country.id);

  let slideDetails = false;

  let checkedFilters = [];

  const onChecked = checkedValues => {
    itemsChecked = checkedValues;

    if (isEmpty(checkedValues)) {
      slideDetails = false;
    } else {
      const [categoryIdToUse] = first(checkedValues).split('_');
      currentCategory = categoryIdToUse;
    };

    checkedFilters = map(checkedValues, checkedValue => {
      const [categoryId, subcategoryId] = checkedValue.split('_');

      return { categoryId, subcategoryId };
    });
  };

  $: itemsChecked = [];

  const firstCategory = first(categories);
  $: itemsChecked = map(firstCategory.items, item => `${firstCategory.id}_${item.id}`);

  $: countryId = '';

  const shouldShowDetails = countryName => {
    countryId = countryName;
    slideDetails = !!countryName;

    if (countryName && isEmpty(checkedFilters)) {
      const categoryToSelect = find(categories, { id: currentCategory });
      const allFilters = map(categoryToSelect.items, item => `${categoryToSelect.id}_${item.id}`);

      onChecked(allFilters);
    }
  };

  const onClose = () => {
    countryId = '';
    slideDetails = false;
  };

  $: detailsFor = () => {
    const countryRow = find(countriesLaws, ({ id }) => id === countryId);

    const filteredByCategories = filter(countryRow.categories, category => {
      return !!find(checkedFilters, { categoryId: category.id });
    });

    const categories = map(filteredByCategories, category => {
      const filteredExceptions = filter(category.exceptions, exception => {
        return !!find(checkedFilters, {
          categoryId: category.id,
          subcategoryId: exception.id,
        });
      });

      const exceptions = map(filteredExceptions, filteredException => {
        return filteredException;
      });

      return {
        ...category,
        exceptions,
      };
    });

    return {
      ...countryRow,
      categories,
    };
  };

  $: currentCategory = first(categories).id;

  $: boxContainer = css`
    background-color: ${COLORS.transparentGray10};
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    position: absolute;
    width: 400px;
    height: calc(100vh - 92px);
    top: 69px;
    right: 0;
    padding: 8px;
  `;

  $: filters = css`
    width: 300px;
    height: calc(100vh - 68px);
    overflow: hidden;
    overflow-y: auto;
    background-color: ${COLORS.lighGray30};
  `;
</script>

<main class="container">
  <div class={filters}>
    <Radio
      categories={categories}
      itemsChecked={itemsChecked}
      onChecked={onChecked}
    />
  </div>

  <div class='map'>
    <Map
      countriesInStudy={countriesInStudy}
      onCountrySelected={shouldShowDetails}
      countryToToggle={countryId}
    />
    {#if slideDetails}
      <div class={boxContainer} transition:horizontalSlide={{ duration: 500 }}>
        <BoxDetail
          states={states}
          categories={categories}
          countryDetails={detailsFor()}
          onClose={onClose}
        />
      </div>
    {/if}
  </div>
</main>

<style>
  .container {
    display: flex;
  }

  .map {
    width: calc(100% - 300px);
    height: calc(100vh - 68px);
  }
</style>

