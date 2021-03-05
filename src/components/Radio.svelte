<script>
  import {slide} from 'svelte/transition';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { partition, map } from 'lodash';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS, UICOLORS } from '../resources/colors';

  export let categories = {};
  export let onChecked;

  let itemChecked;

  const toggleChecked = e => {
    itemChecked = e.currentTarget.value;
    onChecked(itemChecked);
  };

  let collapsedState = map(categories, category => {
    return { id: category.id, isCollapsed: false };
  });

  const toggleCollapse = catId => {
    const [catToToggle, others] = partition(collapsedState, catToFilter => catToFilter.id === catId);
    const { isCollapsed: prevState = false } = catToToggle[0] || {};

    others.push({ id: catId, isCollapsed: !prevState })

    collapsedState = others;
  };

  $: categoryGroup = css`
    margin: 8px 12px;

    &:first-child {
      margin-top: 28px;
    }
  `;

  $: categoryContainer = css`
    align-items: center;
    display: flex;
    justify-content: space-between;
  `;

  $: categoryLabel = css`
    color: ${COLORS.gray20};
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
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 0.1em solid ${UICOLORS.mainChecked};
  `;

  $: radioControlChecked = css`
    background-color: ${UICOLORS.mainChecked};
  `;

  $: shouldCollapse = categoryId => {
    const { isCollapsed = false } = collapsedState.find(cat => cat.id === categoryId) || {};

    return isCollapsed;
  };
</script>

{#each categories as category (category.id)}
  <div class={categoryGroup}>
    <div class={categoryContainer}>
      <p class={categoryLabel}>
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
          style={`color: ${shouldCollapse(category.id) ? COLORS.gray20 : COLORS.gray}`}
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
                type=radio
                class="radioInput"
                checked={itemChecked === item.value}
                name={category.id}
                on:change={toggleChecked}
                value={item.value}
              />
              <span class={`${radioControl} ${itemChecked === item.value ? radioControlChecked : ''}`} />
          </label>
        {/each}
      </div>
    {/if}
  </div>
{/each}

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
