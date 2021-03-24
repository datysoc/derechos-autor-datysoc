<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import { COLORS, STATE_COlORS } from '../resources/colors';

  $: headline = css`
    color: ${COLORS.gray};
    font-size: 36px;
    font-family: "Space Mono", serif, arial;
    line-height: 60px;
  `;

  $: conclusion = css`
    color: ${COLORS.gray20};
    font-size: 26px;
    margin-top: 16px;
  `;

  $: highlight = colorToHighlight => css`
    background-color: ${STATE_COlORS[colorToHighlight]};
    padding: 0 8px;
  `;
</script>

<main class='main-content'>
  <div class='front'>
    <img src='/images/landingLogo.png' alt='landing log' class='landing-logo' />
    <p class='intro'>
      <span class={headline}>
        Tenemos un <span class={highlight('noExiste')}>anacronismo</span>
        <span class={highlight('insuficiente')}>legal</span> en 
        <span class={highlight('suficiente')}>Latinoamérica</span>
      </span>
      <span class={conclusion}>
        Necesitamos incidir en como se aplica la ley
      </span>
    </p>
  </div>
</main>

<style>
  .main-content {
    padding-top: 50px;
    display: flex;
  }

  .front {
    display: flex;
    align-items: center;
    padding: 60px 40px;
  }

  .intro {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
  }

  .landing-logo {
    width: 500px;
  }
</style>
