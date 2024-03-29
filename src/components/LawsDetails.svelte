<script>
  import {slide} from 'svelte/transition';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import { partition, map } from 'lodash';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { COLORS, UICOLORS } from '../resources/colors';

  export let details = [];

  $: collapsedState = map(details, (detail, idx) => (
    { id: detail.id, isCollapsed: true }));

  const toggleCollapse = catId => {
    const [catToToggle, others] = partition(collapsedState, catToFilter => catToFilter.id === catId);
    const { isCollapsed: prevState = false } = catToToggle[0] || {};

    others.push({ id: catId, isCollapsed: !prevState })

    collapsedState = others;
  };

  $: detailGroup = css`
    background-color: ${COLORS.lighGray10};
    border-radius: 4px;
    font-family: "Space Mono", sans-serif;
    padding: 8px 16px 16px;
    margin-top: 18px;
  `;

  $: detailLabel = css`
    color: ${COLORS.gray10};
    font-size: 16px;
    font-weight: 500;
    margin: 3px 0;
  `;

  $: detailDesc = css`
    margin-top: 12px;
    min-height: 20px;
    color: ${COLORS.white};
    font-size: 14px;
  `;

  $: detailDescription = css`
    margin: 0 0 12px 0;
  `;

  $: detailLink = css`
    color: ${UICOLORS.mainLink};
  `;

  $: shouldCollapse = detailId => {
    const { isCollapsed = false } = collapsedState.find(cat => cat.id === detailId) || {};

    return isCollapsed;
  };
</script>

{#each details as detail (detail.id)}
  <div class={`${detailGroup} ${shouldCollapse(detail.id) ? 'detailGroupCollapsed' : ''}`}>
    <div class="detailContainer">
      <p class={detailLabel}>
        <span>• {detail.title}</span>
      </p>
      <button
        class={`
          button
          angleDown
          ${!shouldCollapse(detail.id) ? 'angleUp' : ''}
        `}
        on:click={() => toggleCollapse(detail.id)}
      >
        <Icon
          data={faAngleDown}
          scale={1.5}
          style={`color: ${shouldCollapse(detail.id) ? COLORS.gray20 : COLORS.gray}`}
        />
      </button>
    </div>
    {#if !shouldCollapse(detail.id)}
      <div transition:slide|local={{ duration: 500 }} class={detailDesc}>
        <p class={detailDescription}>
          {detail.description}
        </p>
        {#if detail.link}
          <a href={detail.link} class={detailLink} target="_blank">
            {detail.linkLabel || 'más'}
          </a>
        {/if}
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

  .detailContainer {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .detailGroupCollapsed {
    padding: 8px 16px;
  }
</style>
