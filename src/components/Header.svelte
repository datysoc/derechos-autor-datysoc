<script>
  import { onMount } from 'svelte';
  import { Link } from "svelte-routing";
  import Icon from 'svelte-awesome';
  import { faCloudDownloadAlt, faHome, faGlobeAmericas, faBookOpen } from '@fortawesome/free-solid-svg-icons';
  import { map, findIndex } from 'lodash';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import { COLORS, UICOLORS } from '../resources/colors';

  $: menuItems = [
    {
      id: 'home',
      label: 'Inicio',
      route: '/',
      icon: faHome,
    },
    {
      id: 'map',
      label: 'Mapa',
      route: '/map',
      icon: faGlobeAmericas,
    },
    {
      id: 'glossary',
      label: 'Glosario',
      route: '/glossary',
      icon: faBookOpen,
    },
  ];

  const getLinkProps = ({ isCurrent }) => {
    if (isCurrent) {
      return { class: 'active-link' };
    }

    return { class: 'regular-link' };
  };

  let linksEl = {};

  let activeLink = null;

  const setActiveLink = itemId => {
    activeLink = itemId;
  };

  onMount(() => {
    const activeLinkIndex = findIndex(Object.values(linksEl), linkEl =>
      linkEl.$$.ctx[1].class === 'active-link'
    );
    
    if (activeLinkIndex > -1) {
      activeLink = menuItems[activeLinkIndex].id;
    }
  });

  $: header = css`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: ${activeLink === 'map' ? 'fixed' : 'relative'};
    top: 0;
    left: 0;
    z-index: 9;
    background-color: ${COLORS.transparentWhite10};
    padding: 6px 0;
  `;

  $: link = css`
    font-weight: 300;
    font-size: 16px;
    color: ${COLORS.gray20} !important;
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: none;
    }
  `

  $: menuItemFor = itemId =>
    css`
      margin: 0 8px;
      padding: 4px 18px;
      text-align: center;
      ${itemId === activeLink
        ? `border-bottom: 1px solid ${UICOLORS.mainLink};`
        : ''
      }
    `;

  $: anchorColor = css`
    color: ${COLORS.gray};
  `;

  $:downloadContainer = css`
    background-color: ${COLORS.gray};
    height: 48px;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 28px 0 0;
    border-radius: 6px;
  `;

  $: downloadButton = css`
    color: ${COLORS.white} !important;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      text-decoration: none;
    }
  `;
</script>

<header class={header}>
  <a class="logo" href="/" alt="go to home">
    <img src='/images/logo.png' class="logo-icon" alt="logo" />
      <div class={`isotype ${anchorColor}`}>
        <span>Flexibilidades al derecho</span>
        <span>de autor en América Latina</span>
      </div>
  </a>

  <ul class='menu'>
    {#each menuItems as item (item.id)}
      <li class={menuItemFor(item.id)}>
        <Link
          to={item.route}
          class={link}
          getProps={getLinkProps}
          bind:this={linksEl[item.id]}
          on:click={() => setActiveLink(item.id)}
        >
          <Icon
            data={item.icon}
            scale={1.3}
            style={`
              color: ${item.id === activeLink
                ? COLORS.blue
                : COLORS.gray20};
              border: 0;
              background-color: transparent;
              margin-right: 8px;
            `}
          />
          <span>{item.label}</span>
        </Link>
      </li>
    {/each}
  </ul>

  <div class={downloadContainer}>
    <a href="/map" _target="blank" class={downloadButton}>
      <Icon
        data={faCloudDownloadAlt}
        scale={1.8}
        style={`
          color: ${COLORS.white};
          border: 0;
          background-color: transparent;
          margin-right: 12px;
        `}
      />
      <span>
        Informe
      </span>
    </a>
  </div>
</header>

<style var-prefix='--ds-'>
  .menu {
    list-style: none;
    display: flex;
    margin: 0;
    flex-grow: 1;
  }

  .logo {
    align-items: center;
    margin-left: 18px;
    display: flex;
  }

  .logo:hover {
    text-decoration: none;
  }

  .isotype {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    font-weight: 700;
    letter-spacing: 0.4px;
  }

  .logo-icon {
    height: 48px;
  }
</style>
