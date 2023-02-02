<script>
  import { Button} from 'flowbite-svelte';
  import {slide} from 'svelte/transition';
  import { ArrowUpTray, ChevronDown } from 'svelte-heros-v2';
  import { cloneDeep, find, first, flatten, map } from 'lodash';
  import { COLORS } from '../resources/colors';

  export let categories = {};
  export let itemsChecked = [];
  export let onChecked;
  export let onCloseFilters = null;

  const possibleFilters = flatten(map(categories, cat =>
    map(cat.items, subcat => `${cat.id}_${subcat.id}`)));

  const toggleChecked = e => {
    const itemChecked = e.currentTarget.value;

    const preExistenItem = find(itemsChecked, anItem => anItem === itemChecked) || null;


    if (!preExistenItem) {
      onChecked([itemChecked])
    }
  };

  let collapsedState = map(categories, (category, idx) => {
    return { id: category.id, isCollapsed: idx > 0 };
  });

  const toggleCollapse = catId => {
    const currentCategory = find(collapsedState, { id: catId, isCollapsed: false });

    if (currentCategory) return;

    const collapsedStateToModify = map(collapsedState, colState => {
      const isThisCatagory = colState.id === catId;
      const isCollapsed = isThisCatagory ? !colState.isCollapsed : true;

      if (!isCollapsed) {
        const { items } = find(categories, { id: colState.id });

        onChecked([`${colState.id}_${first(items).id}`]);
      }

      return {
        id: colState.id,
        isCollapsed,
      };
    });

    collapsedState = collapsedStateToModify;
  };

  $: shouldCollapse = categoryId => {
    const { isCollapsed = false } = find(collapsedState, cat => cat.id === categoryId) || {};

    return isCollapsed;
  };

  $: isChecked = (catId, itemVal) =>
  !!find(itemsChecked, itemChecked => itemChecked === `${catId}_${itemVal}`);
</script>

<div class="absolute top-0 right-0 md:hidden">
  <Button
    outline={true}
    class="!p-0 hover:!bg-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-white focus-visible:ring-white bg-highlight p-2 rounded-none rounded-bl-md"
    size="md"
    on:click={onCloseFilters}
  >
    <ArrowUpTray
      color={COLORS.white}
      class="w-6 h-6 -rotate-90 m-1"
    />
  </Button>
</div>

{#each categories as category (category.id)}
  <div class="mb-2">
    <div class="flex flex-row items-center justify-between text-left">
      <p
        class={`
        ${!shouldCollapse(category.id)
          ? 'font-semibold text-mainLink'
          : 'font-regular text-inactive'}
          text-sm
          lg:text-base
        `}
      >
        <span>{category.value}</span>
      </p>
      <button
        class={`
        ${!shouldCollapse(category.id) ? 'text-mainLink' : 'text-inactive'}
        bg-gray-50
        `}
        on:click={() => toggleCollapse(category.id)}
      >
        <ChevronDown class={shouldCollapse(category.id) ? 'transition-transform' : 'transition-transform rotate-180'} />
      </button>
    </div>
    {#if !shouldCollapse(category.id)}
      <div
        transition:slide={{ duration: 500 }}
        class="flex flex-col items-start pl-2 pr-6"
      >
        {#each category.items as item (item.id)}
          <label
            for={`category_${item.id}`}
            class="flex flex-row items-center justify-between w-full font-semibold font-body my-1"
          >
            <span
              class={`
              ${isChecked(category.id, item.value) ? 'text-mainTitle' : 'text-inactive'}
              text-xs lg:text-sm text-left
              `}
            >
              {item.label}
            </span>

            <span>
              <input
                id={`category_${item.id}`}
                type="radio"
                class="w-0 h-0 opacity-0 absolute"
                name={category.id}
                on:change={toggleChecked}
                value={`${category.id}_${item.value}`}
              />
              <div
                class={`flex items-center justify-center w-4 h-4 rounded-lg border border-solid
                ${isChecked(category.id, item.value) ? 'border-mainLink' : 'border-inactive'}
                p-2`}
              >
                {#if isChecked(category.id, item.value)}
                  <div class="bg-mainLink w-3 h-3 rounded-lg grow-1 shrink-0" />
                {/if}
              </div>
            </span>
          </label>
        {/each}
      </div>
    {/if}
  </div>
{/each}
