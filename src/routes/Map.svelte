<script>
  import {
    Button,
    Popover,
    Sidebar,
    SidebarWrapper,
    Breadcrumb,
    BreadcrumbItem,
  } from 'flowbite-svelte'
  import { XCircle, QuestionMarkCircle, AdjustmentsHorizontal } from 'svelte-heros-v2';
  import {
    find,
    flatten,
    filter,
    first,
    groupBy,
    isEmpty,
    map,
  } from 'lodash';
  import Map from '../components/Map.svelte';
  import BoxDetail from '../components/BoxDetail.svelte';
  import Radio from '../components/Radio.svelte';
  import { categories } from '../data/categories';
  import { states } from '../data/states';
  import { countries } from '../data/countries';
  import { COLORS } from '../resources/colors';

  const countriesInStudy = map(countries, country => country.id);

  let slideDetails = false;
  let shouldShowLegend = true;

  let checkedFilters = [];

  $: slidePos = '-right-full';
  $: filtersPos = '-left-full';

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
    let shouldWaitForSlide = false

    if (isEmpty(checkedValues)) {
      slideDetails = false;
      countryId = '';
    } else {
      const [categoryIdToUse] = first(checkedValues).split('_');

      shouldWaitForSlide = currentCategory === categoryIdToUse;

      currentCategory = categoryIdToUse;
    };

    filtersSelectedWithCountries = filter(countriesWithExceptionsStates(checkedValues), countryWithException =>
      !isEmpty(countryWithException.states));

    if (isEmpty(filtersSelectedWithCountries)) {
      countryId = '';
    }

    setTimeout(() => {
      filtersPos = '-left-full';
    }, shouldWaitForSlide ? 300 : 900);
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
    slidePos = slideDetails ? 'right-0' : '-right-full';
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
    slidePos = '-right-full';
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

  $: categoryTitleClass = categoryId =>
  currentCategory === categoryId ? '!text-mainLink' : 'text-inactive';

  $: subcategoryBreadcrumb = () => {
    const selectedCategory = find(categories, { id: currentCategory });

    const [_, subcategoryId] = first(itemsChecked).split('_');

    const selectedSubcat = find(selectedCategory.items, { id: subcategoryId })

    return selectedSubcat.label;
  };

  $: openFilters = () => {
    filtersPos = 'left-0';
  };

  $: closeFilters = () => {
    filtersPos = '-left-full';
  };

  $: isLegendOnTop = () => window.innerWidth >= 768;
</script>

<main class="container">
  <Sidebar>
    <SidebarWrapper
      id="filtersWrapper"
      class="absolute top-0 md:top-32 xl:top-20 left-0 z-30 w-80 !rounded-r-lg rounded-l-none shadow-lg pb-10 duration-500 {filtersPos} md:transform-none md:left-0"
    >
      <Radio
        categories={categories}
        itemsChecked={itemsChecked}
        onChecked={onChecked}
        onCloseFilters={closeFilters}
      />
    </SidebarWrapper>
  </Sidebar>

  {#if filtersPos === 'left-0'}
    <div
      class="absolute top-0 left-0 w-full h-full rounded-none bg-transparentGray10 z-20 md:hidden"
    />
  {/if}

  <div
    class="absolute top-32 xl:top-20 left-0 md:left-80 z-10 px-0 md:px-8 w-full md:w-auto"
  >
    <Breadcrumb aria-label="filtes applied" class="bg-white px-4 py-1 shadow-lg text-xs lg:text-sm xl:text-base">
    <BreadcrumbItem spanClass="text-mainLink">
    <svelte:fragment slot="icon">
      <AdjustmentsHorizontal class="mr-2 text-mainLink text-sm md:hidden lg:text-sm" on:click={openFilters} />
      <AdjustmentsHorizontal class="mr-2 text-mainLink text-xs hidden md:block lg:text-sm" />
    </svelte:fragment>

    <span class="md:hidden text-sm" on:click={openFilters}>
      {find(categories, { id: currentCategory }).value}
    </span>
    <span class="hidden md:block">
      {find(categories, { id: currentCategory }).value}
    </span>
  </BreadcrumbItem>
  <BreadcrumbItem>
  {subcategoryBreadcrumb()}
</BreadcrumbItem>
</Breadcrumb>
</div>

<Map
  countriesInStudy={countriesInStudy}
  onCountrySelected={shouldShowDetails}
  countryToToggle={countryId}
  filtersSelectedWithCountries={filtersSelectedWithCountries}
/>

<div class="legend absolute bottom-8 md:bottom-8 right-3/4 md:right-44 z-10">
  <Button 
    id="statesLegend"
    btnClass="bg-transparent flex flex-col items-center"
    on:click={onShowLegend}
  >
    <QuestionMarkCircle variation="solid" color={COLORS.gray} size="36" />
    <span class="font-semibold font-body text-sm xl:text-base text-mainTitle">Leyenda</span>
  </Button>
</div>

<div class="legend-detail absolute bottom-28 md:bottom-28 xsleft-0 md:right-12 lg:right-44 z-20">
  {#if shouldShowLegend}
    <div class="w-80 md:w-96 bg-transparentGray10 py-2 px-6 rounded-lg">
      <div class="flex justify-end">
        <Button
          outline={true}
          class="!p-0 hover:!bg-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-white focus-visible:ring-white"
          size="md"
          on:click={onCloseLegend}
        >
          <XCircle
            color="white"
            class="w-8 h-8"
          />
        </Button>
      </div>

      {#each states as state (state.id)}
        <div class="flex flex-row my-2">
          <div class="grow-1 shrink-0 w-4 h-4 rounded-lg bg-{state.id} mr-1" />
          <p class="flex flex-col ml-1 font-body text-left text-white">
            <span class="font-semibold text-sm xl:text-base">{state.state}</span>
            <span class="text-xs xl:text-sm">{state.description}</span>
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<Sidebar>
  <SidebarWrapper
    id="slideDetailsWrapper"
    divClass="absolute top-0 md:top-32 xl:top-20 right-0 z-20 w-full md:w-2/4 xl:w-1/4 !rounded-l-lg !rounded-r-none !overflow-y-auto bg-transparentGray5 pt-2 px-2 duration-500 {slidePos}"
  >
    {#if slideDetails}
      <BoxDetail
        states={states}
        categories={categories}
        countryDetails={detailsFor()}
        onClose={onClose}
      />
    {/if}
  </SidebarWrapper>
</Sidebar>
  </main>
