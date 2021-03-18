<script>
  import {slide} from 'svelte/transition';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { cloneDeep, find, flatten, partition, map, isEmpty } from 'lodash';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS, UICOLORS } from '../resources/colors';

  export let categories = {};
  export let itemsChecked = [];
  export let onChecked;

  const possibleFilters = flatten(map(categories, cat =>
    map(cat.items, subcat => `${cat.id}_${subcat.id}`)));

  const toggleChecked = e => {
    const itemChecked = e.currentTarget.value;

    const [preExistenItem, otherItems] = partition(itemsChecked, anItem => anItem === itemChecked);


    if (isEmpty(preExistenItem)) {
      otherItems.push(itemChecked);
    }

      onChecked(otherItems);
  };

  let collapsedState = map(categories, (category, idx) => {
    return { id: category.id, isCollapsed: idx > 0 };
  });

  const toggleCollapse = catId => {
    const collapsedStateToModify = map(collapsedState, colState => {
      const isThisCatagory = colState.id === catId;
      const isCollapsed = isThisCatagory ? !colState.isCollapsed : true;

      if (isThisCatagory && isCollapsed) {
        onChecked([]);
      }

      if (!isCollapsed) {
        const { items } = find(categories, { id: colState.id });

        const categoryToSelect = map(items, item => `${colState.id}_${item.id}`);

        onChecked(categoryToSelect);
      }

      return {
        id: colState.id,
        isCollapsed,
      };
    });

    collapsedState = collapsedStateToModify;
  };

  $: categoryGroup = css`
    margin: 8px 12px;

    &:first-child {
      margin-top: 28px;
    }
  `;

  $: categoriesToSelect = css`
    padding: 0 8px;
  `;

  $: categoryContainer = css`
    align-items: center;
    display: flex;
    justify-content: space-between;
  `;

  $: categoryLabel = isCollapsed => css`
    color: ${isCollapsed ? COLORS.lighGray5 : COLORS.gray};
    font-size: 20px;
    font-weight: 500;
    margin: 3px 0;
  `;

  $: itemsGroup = css`
    padding: 4px 4px 4px 18px;
  `;

  $: itemLabel = css`
    color: ${COLORS.gray10};
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 12px 0;

    &:first-child {
      margin-top: 8px;
    }
  `;

  $: radioControl = css`
    display: flex;
    width: 1em;
    height: 1em;
    border-radius: 4px;
    border: 0.1em solid ${UICOLORS.mainChecked};
    padding: 1px 1px 2px 2px;
  `;

  $: radioControlChecked = css`
    background-color: ${UICOLORS.mainChecked};
    border-radius: 2px;
    width: 1em;
    height: 1em;
  `;

  $: shouldCollapse = categoryId => {
    const { isCollapsed = false } = find(collapsedState, cat => cat.id === categoryId) || {};

    return isCollapsed;
  };

  $: isChecked = itemValue => !!find(itemsChecked, itemChecked => itemChecked === itemValue);
</script>

<div class="filtersContainer">
  {#each categories as category (category.id)}
    <div class={`${categoryGroup} ${categoriesToSelect}`}>
      <div class={categoryContainer}>
        <p class={categoryLabel(shouldCollapse(category.id))}>
          <span>{category.value}</span>
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
            style={`color: ${shouldCollapse(category.id) ? COLORS.lighGray20 : COLORS.gray}`}
          />
        </button>
      </div>
      {#if !shouldCollapse(category.id)}
        <div transition:slide={{ duration: 500 }} class={itemsGroup}>
          {#each category.items as item (item.id)}
            <label for={`category_${item.id}`} class={itemLabel}>
              <span>{item.label}</span>

              <span>
                <input
                  id={`category_${item.id}`}
                  type="checkbox"
                  class="radioInput"
                  checked={isChecked(`${category.id}_${item.value}`)}
                  name={category.id}
                  on:change={toggleChecked}
                  value={`${category.id}_${item.value}`}
                />
                  <div class={radioControl}>
                    <div class={`${isChecked(`${category.id}_${item.value}`) ? radioControlChecked : ''}`} />
                  </div>
                </span>
            </label>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
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

  .radioInput {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }
</style>
