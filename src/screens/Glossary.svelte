<script>
  import {slide} from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { map, replace, partition, find } from 'lodash';
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Footer from '../components/Footer.svelte';
  import { COLORS } from '../resources/colors';
  import { glossary } from '../data/glossary';

  const toggleCollapse = catId => {
    const [stateToToggle, others] = partition(collapsedState, { id: catId });
    const { isCollapsed: prevState = false } = stateToToggle[0] || {};

    others.push({ id: catId, isCollapsed: !prevState })

    collapsedState = others;
  };

  $: categories = css`
    border-radius: 8px;
    padding: 0;
  `;

  $: category = categoryIdForColor => css`
    border: solid 1px ${colorForCategory[categoryIdForColor]};
    padding: 4px 22px;
    margin: 8px 0;
    border-radius: 8px;
  `;

  const colorForCategory = {
    libertadDeExpresion: COLORS.orange,
    finesEducativos: COLORS.blue,
    bibliotecasYArchivos: COLORS.yellow,
    poblacionesDesatendidas: COLORS.violet,
    usosPrivadosSociales: COLORS.pink,
    administracionPublica: COLORS.green,
    nuevasTecnologias: COLORS.red,
  };

  $: categoryTitle = css`
    color: ${COLORS.gray};
    font-family: "Space Mono", serif, arial;
    font-weight: 700;
    font-size: 20px;
    margin: 0;
    padding: 6px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  $: categoryDesc = css`
    color: ${COLORS.gray20};
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 8px;
  `;

  $: exceptions = css`
  `;

  $: exception = css`
    padding: 12px 16px;
    background-color: ${COLORS.lighGray50};
    margin: 8px 0;
    border-radius: 8px;
  `;

  $: exceptionTitle = css`
    color: ${COLORS.gray10};
    font-family: "Space Mono", serif, arial;
    font-weight: 700;
    font-size: 16px;
    margin: 4px 0 6px;
  `;

  $: exceptionDesc = css`
    color: ${COLORS.gray30};
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin: 2px 0 6px;
  `;

  let collapsedState = map(glossary, ({ id }) => {
    return { id, isCollapsed: true };
  });

  $: shouldCollapse = catId => {
    const { isCollapsed = false } = find(collapsedState, { id: catId }) || {};

    return isCollapsed;
  };
</script>

<main class="container">
  <div class={categories}>
    {#each glossary as termDefs (termDefs.id)}
      <div class={category(termDefs.id)}>
        <p class={categoryTitle}>
          {termDefs.name}

          <button
            class={`
              button
              angleDown
              ${!shouldCollapse(termDefs.id) ? 'angleUp' : ''}
            `}
            on:click={() => toggleCollapse(termDefs.id)}
          >
            <Icon
              data={faAngleDown}
              scale={1.5}
              style={`color: ${COLORS.gray20}`}
            />
          </button>
        </p>
        {#if !shouldCollapse(termDefs.id)}
          <div class="stateDetails" transition:slide|local={{ duration: 500 }}>
            <p class={categoryDesc}>{@html replace(termDefs.description, /\n/g, '<br/><br/>')}</p>
            <div class={exceptions}>
              {#each termDefs.exceptions as exceptionDef (exceptionDef.id)}
                <div class={exception}>
                  <p class={exceptionTitle}>{exceptionDef.name}</p>
                  <p class={exceptionDesc}>{exceptionDef.description}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</main>


<Footer />

<style>
  .container {
    width: 75%;
    margin: 38px auto 0;
    padding: 20px 10px;
    min-height: 550px;
  }

  .button {
    background: 0;
    height: 32px;
    padding: 6px;
    margin: 0;
    border: 0;
    cursor: pointer;
  }

  .angleDown {
    display: inline-block;
    transition-duration: 500ms;
    transition-property: transform;
  }

  .angleUp {
    transform: rotate(180deg);
  }
</style>
