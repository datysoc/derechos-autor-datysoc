<script>
  import {slide} from 'svelte/transition';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { partition } from 'lodash';
  import { beer, refresh, comment, codeFork, camera, ban } from 'svelte-awesome/icons';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS, UICOLORS } from '../resources/colors';

  export let category = {};
  export let onChecked;

  const { id: categoryId, value: categoryValue, items = [] } = category;

  const { value: itemValue } = items.find(item => item.isChecked) || items[0];

  let itemChecked;

  const toggleChecked = e => {
    itemChecked = e.currentTarget.value;
    onChecked(itemChecked);
  };

  let collapsedState = [{ id: categoryId, isCollapsed: false }];
  const toggleCollapse = catId => {
    const [catToToggle, others] = partition(collapsedState, catToFilter => catToFilter.id);
    const { isCollapsed: prevState = false } = catToToggle[0] || {};

    others.push({ id: catId, isCollapsed: !prevState })

    collapsedState = others;
  };

  $: categoryGroup = css`
    margin: 8px 12px;
  `;

  $: category = css`
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

  $: button = css`
    background: 0;
    height: 32px;
    padding: 6px;
    margin: 0;
    border: 0;
    cursor: pointer;
  `;

  $: radioControl = css`
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 0.1em solid ${UICOLORS.highlight};
  `;

  $: radioControlChecked = css`
    background-color: ${UICOLORS.highlight};
  `;

  $: radio = css`
  `;

  $: radioInput = css`
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  `;
  
  $: shouldCollapse = categoryId => {
    const { isCollapsed = false } = collapsedState.find(cat => cat.id === categoryId) || {};

    return isCollapsed;
  };
</script>

<div class={categoryGroup}>
  <div class={category}>
    <p class={categoryLabel}>
      <span>{categoryValue}</span>
    </p>
    <button
      class={`
        ${button}
        angleDown
        ${!shouldCollapse(categoryId) ? 'angleUp' : ''}
      `}
      on:click={() => toggleCollapse(categoryId)}
    >
      <Icon data={faAngleDown} scale={1.5} />
    </button>
  </div>
  {#if !shouldCollapse(categoryId)}
    <div transition:slide={{ duration: 500 }} class={itemsGroup}>
      {#each items as item (item.id)}
        <label for={`category_${item.id}`} class={itemLabel}>
          <span>{item.label}</span>

          <span class={radio}>
            <input
              id={`category_${item.id}`}
              type=radio
              class={radioInput}
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

<style>
  .angleDown {
    display: inline-block;
    transition-duration: 500ms;
    transition-property: transform;
  }

  .angleUp {
    transform: rotate(180deg);
  }
</style>
