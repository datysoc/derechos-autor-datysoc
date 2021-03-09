<script>
  import { find, filter, map } from 'lodash';
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

  const checkedFilters = [
    { category: 'libertadExpresion', subcategory: 'cita' },
    { category: 'libertadExpresion', subcategory: 'noticiasDeActualidad' },
  ];

  const onChecked = checkedValue => {
    console.log('yeah', checkedValue);
    /*
    * { category: 'libertadExpresion', subcategory: 'cita' }
     */
  };

  $: countryId = null;
  const shouldShowDetails = countryName => {
    countryId = countryName;
    slideDetails = !!countryName;
  };

  const onClose = () => {
    countryId = '';
    slideDetails = false;
  };

  $: detailsFor = () => {
    const countryRow = find(countriesLaws, ({ id }) => id === countryId);

    const filteredByCategories = filter(countryRow.categories, category => {
      return !!find(checkedFilters, { category: category.id });
    });

    const categories = map(filteredByCategories, category => {
      const filteredExceptions = filter(category.exceptions, exception => {
        return !!find(checkedFilters, {
          category: category.id,
          subcategory: exception.id,
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
    overflow: hidden;
    overflow-y: auto;
  `;
</script>

<main class="container">
  <div class="filters">
    <Radio
      categories={categories}
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

  .filters {
    width: 300px;
  }

  .map {
    width: calc(100% - 300px);
    height: calc(100vh - 68px);
  }
</style>

