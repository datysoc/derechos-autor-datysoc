<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Icon from 'svelte-awesome';
  import {
    faUnlockAlt,
  } from '@fortawesome/free-solid-svg-icons';
  import { COLORS } from '../resources/colors';

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

