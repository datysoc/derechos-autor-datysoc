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
  import Icon from 'svelte-awesome';
  import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Map from '../components/Map.svelte';
  import BoxDetail from '../components/BoxDetail.svelte';
  import Radio from '../components/Radio.svelte';
  import Legend from '../components/Legend.svelte';
  import { horizontalSlide } from '../components/horizontalSlide';
  import { COLORS } from '../resources/colors';

  import { categories } from '../data/categories';
  import { states } from '../data/states';
  import { countries } from '../data/countries';

  const countriesInStudy = map(countries, country => country.id);

  let slideDetails = false;
  let shouldShowLegend = false;

  let checkedFilters = [];

  const countriesWithExceptionsStates = (checkedValues) => {
    checkedFilters = map(checkedValues, checkedValue => {
      const [categoryId, subcategoryId] = checkedValue.split('_');

      return { categoryId, subcategoryId };
    });
    
    const groupedFilters = map(
      groupBy(checkedFilters, checkedFilter => checkedFilter.categoryId),
      groupedFilter => {
        const { categoryId } = groupedFilter[0];

        const subcategories = map(groupedFilter, aGroupedFilter => aGroupedFilter.subcategoryId);

        return { categoryId, subcategories };
      }
    );

    return map(countries, countryLaw => {
      const states = map(groupedFilters, groupedFilter => {
        const { categoryId, subcategories } = groupedFilter;

        const { exceptions = [] } = find(countryLaw.categories, { id: categoryId }) || {};

        const countryWithExceptions = filter(exceptions, exception =>
          !!find(subcategories, subcat => subcat === exception.id));

        return map(countryWithExceptions, countryWithException => countryWithException.state);
      });

      return { country: countryLaw.id, states: flatten(states) };
    });
  };

  const onChecked = checkedValues => {
    itemsChecked = checkedValues;

    if (isEmpty(checkedValues)) {
      slideDetails = false;
      countryId = '';
    } else {
      const [categoryIdToUse] = first(checkedValues).split('_');
      currentCategory = categoryIdToUse;
    };

    filtersSelectedWithCountries = filter(countriesWithExceptionsStates(checkedValues), countryWithException =>
      !isEmpty(countryWithException.states));

    if (isEmpty(filtersSelectedWithCountries)) {
      countryId = '';
    }
  };

  const firstCategory = first(categories);
  const firstItemChecked = `${firstCategory.id}_${first(firstCategory.items).id}`;

  $: itemsChecked = [firstItemChecked];

  $: filtersSelectedWithCountries = filter(countriesWithExceptionsStates([firstItemChecked]), countryWithException =>
      !isEmpty(countryWithException.states));

  $: countryId = '';

  const shouldShowDetails = countryName => {
    countryId = countryId === countryName ? '' : countryName;
    slideDetails = countryId === countryName;
  };

  const onShowLegend =  e => {
    e.preventDefault();
    e.stopPropagation();

    shouldShowLegend = !shouldShowLegend;
  };

  const onCloseLegend =  e => {
    e.preventDefault();
    e.stopPropagation();

    shouldShowLegend = false;
  };

  const onClose = e => {
    e.preventDefault();
    e.stopPropagation();

    countryId = '';
    slideDetails = false;
  };

  $: detailsFor = () => {
    const countryRow = find(countries, ({ id }) => id === countryId);

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
    height: 100vh;
    top: 0;
    right: 0;
    padding: 8px;
    z-index: 20;
  `;

  $: filters = css`
    width: 300px;
    height: 100vh;
    overflow: hidden;
    overflow-y: auto;
    background-color: ${COLORS.lighGray30};
    padding-top: 68px;
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
      filtersSelectedWithCountries={filtersSelectedWithCountries}
    />

    <div class="legend">
      {#if shouldShowLegend}
        <Legend
          states={states}
          onCloseLegend={onCloseLegend}
        />
      {/if}
      <button
        class="helpButton"
        on:click={onShowLegend}
      >
        <Icon
          data={faQuestionCircle}
          scale={2}
          style={`
            color: ${COLORS.gray};
            border: 0;
            background-color: transparent;
          `}
        />
        <span class="legendSpan">leyenda</span>
      </button>
    </div>
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

  .legend {
    position: absolute;
    bottom: 5%;
    left: 38px;
    width: 300px;
  }

  .map {
    width: calc(100% - 300px);
    height: 100vh;
    position: relative;
  }

  .helpButton {
    border: 0;
    background-color: transparent;
    border-radius: 50%;
    width: 40px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .legendSpan {
    margin-top: 8px;
  }
</style>

