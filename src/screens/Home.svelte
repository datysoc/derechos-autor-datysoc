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
  import { COLORS, STATE_COlORS } from '../resources/colors';

  const highlightsInfo = [
    {
      question: '¿Cuál es la situación?',
      icon: faFileAlt,
      iconColor: COLORS.green,
      answer: 'Accede al informe',
      link: '/#',
    },
    {
      question: '¿Qué se discute?',
      icon: faMicrophoneAlt,
      iconColor: COLORS.pink,
      answer: 'Escucha los podcasts',
      link: '/#',
    },
    {
      question: 'Excepciones',
      icon: faBookOpen,
      iconColor: COLORS.orange,
      answer: 'Conoce el glosario',
      link: '/#',
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

  $: datysocFooter = css`
    border-top: solid 1px ${COLORS.orange};
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 0 18px;
  `;

  $: logosDescription = css`
    font-size: 22px;
    font-family: "Space Mono", serif, arial;
    color: ${COLORS.gray};
  `;

  $: logos = css`
    display: flex;
  `;

  $: logosDetail = css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 175px;
  `;

  $: ccTitle = css`
    color: ${COLORS.gray} !important;
    font-size: 12px;
    text-align: center;
    margin: 0;

    &:hover {
      text-decoration: none;
    }

    & > img {
      margin-top: 8px;
    }
  `;


  $: privacyPolicy = css`
    color: ${COLORS.gray} !important;
    font-size: 16px;
    text-align: center;

    &:hover {
      text-decoration: none;
    }

    & > svg {
      margin-top: 8px;
    }
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
        target="_blank"
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

<div class="verbena-video">
  <iframe width="100%" height="450" src="https://www.youtube.com/embed/eRTlIMLF0So" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<footer class={datysocFooter}>
  <div class="associated-logos">
    <div class={logosDetail}>
      <p class={logosDescription}>Un proyecto de</p>
      <div class={logos}>
        <img
          src='/images/datysocLogo.png'
          alt='datysoc logo'
          class='logo logo-datysoc'
        />

        <img
          src='/images/karismaLogo.png'
          alt='karisma logo'
          class='logo logo-karisma'
        />
      </div>
    </div>

    <div class={logosDetail}>
      <p class={logosDescription}>Apoyado por</p>
      <div class={logos}>
        <img
          src='/images/indelaLogo.png'
          alt='indela logo'
          class='logo logo-indela'
        />

        <img
          src='/images/osfLogo.png'
          alt='open society foundation logo'
          class='logo logo-osf'
        />
      </div>
    </div>
  </div>

  <div
    class="dividers dividers-center"
    style="margin: 0 0 22px;"
  >
    <div class={`divider divider-center ${dividerColorBlue}`} />
  </div>

  <div class="footer-cc-privacy">
    <a
      class={ccTitle}
      href="https://creativecommons.org/licenses/by/4.0/deed.es"
      target="_blank"
    >
      <img
        src='/images/CC-BY_icon.png'
        alt='indela logo'
        class='logo-cc'
      />
      <br/>
      <span>
        Licencia Creative Commons<br/>Atribución 4.0 Internacional.
      </span>
    </a>

    <a
      class={privacyPolicy}
      href="/politica-privacidad"
    >
      <Icon
        data={faUnlockAlt}
        scale={1.3}
        style={`
          color: ${COLORS.gray};
          border: 0;
          background-color: transparent;
        `}
      />
      <br/>
      <span>
        Política de uso y privacidad
      </span>
    </a>
  </div>
</footer>

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

  .associated-logos {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 42px 0;
  }

  .logo {
    margin: 12px 16px;
  }

  .logo-datysoc {
    height: 60px;
  }

  .logo-indela {
    margin-top: 30px;
    width: 200px;
  }

  .logo-karisma {
    height: 70px;
  }

  .logo-osf {
    height: 70px;
    margin: 18px 16px 8px;
  }

  .footer-cc-privacy {
    display: flex;
    justify-content: space-between;
    padding: 12px 28px;
  }

  .logo-cc {
    widht: 80px;
  }
</style>
