<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { beer, refresh, comment, codeFork, camera, ban } from 'svelte-awesome/icons';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS } from '../resources/colors';

  export let category = {};

  const { value: categoryValue, items = [] } = category;

  $: categoryGroup = css`
    margin: 8px 12px;
  `;

  $: categoryLabel = css`
    color: ${COLORS.gray20};
    font-size: 20px;
    font-weight: 500;
  `;

  $: itemsGroup = css`
    padding: 4px 12px 4px 18px;
  `;

  $: itemLabel = css`
    color: ${COLORS.gray10};
    font-size: 16px;
    font-weight: 400;
  `;
</script>

<div class={categoryGroup}>
  <label class={categoryLabel}>
    {categoryValue}
    <Icon data={faAngleDown} scale={1.5} />
  </label>
  <div class={itemsGroup}>
    {#each items as item (item.id)}
      <label class={itemLabel}>
        {item.label}
        <input type=radio bind:group={category.id} value={item.value}>
      </label>
    {/each}
  </div>
</div>
