<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import {
    faBookOpen,
    faMicrophoneAlt,
    faFileAlt,
    faExternalLinkAlt,
    faUnlockAlt,
  } from '@fortawesome/free-solid-svg-icons';
  import Footer from '../components/Footer.svelte';
  import { COLORS, STATE_COlORS } from '../resources/colors';

  const podcastsUrl = envMapVars.env.PODCASTS_URL;
  const informeUrl = envMapVars.env.INFORME_URL || '/#';
  const youtubeVideoUrl = envMapVars.env.YOUTUBE_VERBENA_URL;

  const highlightsInfo = [
    {
      question: '¿Cuál es la situación?',
      icon: faFileAlt,
      iconColor: COLORS.green,
      answer: 'Accede al informe',
      link: informeUrl,
      target: '_blank',
    },
    {
      question: '¿Qué se discute?',
      icon: faMicrophoneAlt,
      iconColor: COLORS.pink,
      answer: 'Escucha los podcasts',
      link: podcastsUrl,
      target: '_blank',
    },
    {
      question: 'Excepciones',
      icon: faBookOpen,
      iconColor: COLORS.orange,
      answer: 'Conoce el glosario',
      link: '/glosario',
      target: '_self',
    },
  ];

  $: headline = css`
    color: ${COLORS.gray};
    font-size: 36px;
    font-family: "Space Mono", serif, arial;
    line-height: 68px;
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

  $: highlightButton = css`
    color: ${COLORS.white} !important;
    background-color: ${COLORS.blue};
    padding: 0 24px;
    width: 110px;
    position: relative;

    &:hover {
      text-decoration: none;
    }
  `;

  $: highlightBox = css`
    background-color: ${COLORS.lighGray40};
    color: ${COLORS.gray};
    align-items: center;
    border-radius: 12px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 32px;
    height: 200px;
    width: 200px;
    text-align: center;

    &:hover {
      background-color: ${COLORS.lighGray20};
      text-decoration: none !important;
    }
  `;

  $: dividerColorRed = css`
    background-color: ${COLORS.red};
  `;

  $: dividerColorBlue = css`
    background-color: ${COLORS.blue};
  `;
</script>

<main class='main-content'>
  <div class='boxWithImage'>
    <img src='/images/landingLogo.png' alt='landing logo' class='landing-logo' />
    <p class='intro'>
      <span class={headline}>
        Existe un <span class={highlight('noExiste')}>anacronismo</span>
        <span class={highlight('insuficiente')}>legal</span> en 
        <span class={highlight('suficiente')}>Latinoamérica</span>
      </span>
      <span class={conclusion}>
        Necesitamos nuevas flexibilidades al derecho de autor para promover la educación, la cultura y la investigación
      </span>
    </p>
  </div>

  <div
    class="dividers"
    style="margin: 10px 0 40px;"
  >
    <div class={`divider ${dividerColorRed}`} />
    <div class={`divider ${dividerColorRed}`} />
  </div>

  <div class="highlights">
    {#each highlightsInfo as info (info.question)}
      <a
        href={info.link}
        target={info.target}
        class={highlightBox}
      >
        <p class="highlight-question">
          {info.question}
        </p>
        <Icon
          data={info.icon}
          scale={5}
          style={`
            color: ${info.iconColor};
            border: 0;
            background-color: transparent;
          `}
        />
        <p class="highlight-answer">
          {info.answer}
        </p>
      </a>
    {/each}
  </div>

  <div
    class="dividers dividers-center"
    style="margin: 40px 0 10px;"
  >
    <div class={`divider divider-center ${dividerColorBlue}`} />
  </div>

  <div class='boxWithImage boxWithImage-map'>
    <p class='intro'>
      <span class={`${headline} boxWithImage-map-headline`}>
        Explora las 
        <span class={highlight('suficiente')}>excepciones</span>
        y <span class={highlight('insuficiente')}>limitaciones</span>
        <br/>de <span class={highlight('noExiste')}>Latam</span> en nuestro
        <a href="/mapa" class={highlightButton}>
          <span>mapa</span>
          <Icon
            data={faExternalLinkAlt}
            scale={0.9}
            style={`
              color: ${COLORS.white};
              border: 0;
              background-color: transparent;
              position: absolute;
              top: 2px;
              right: 4px;
            `}
          />
        </a>
      </span>
    </p>
  </div>
</main>

{#if youtubeVideoUrl}
  <div class="verbena-video">
    <iframe
      width="100%"
      height="450"
      src={youtubeVideoUrl}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
{/if}

<Footer />

<style>
  .main-content {
    padding: 50px 110px 18px;
    display: flex;
    flex-direction: column;
  }

  .boxWithImage {
    display: flex;
    align-items: center;
    padding: 60px 40px 28px;
  }

  .boxWithImage-map {
    padding: 48px 40px 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .boxWithImage-map-headline {
    line-height: 76px;
  }

  .intro {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
  }

  .landing-logo {
    border-radius: 12px;
    width: 500px;
  }

  .map-image {
    margin-left: 48px;
    border-radius: 12px;
    width: 400px;
  }

  .highlights {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    margin: 14px 0;
  }

  .dividers {
    display: flex;
    justify-content: space-between;
  }

  .dividers-center {
    justify-content: center;
  }

  .divider {
    height: 2px;
    width: 160px;
  }

  .divider-center {
    width: 400px;
  }

  .highlight-question {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    font-family: "Space Mono", serif, arial;
  }

  .highlight-answer {
    margin: 0;
    font-size: 18px;
    font-weight: 500px;
  }

  .verbena-video {
    margin: 18px 0 0;
    display: flex;
    justify-content: center;
  }

  .logo {
    margin: 12px 16px;
  }
</style>
