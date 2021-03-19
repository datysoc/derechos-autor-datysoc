<script>
  import { Link } from "svelte-routing";
  import { map } from 'lodash';
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import { COLORS, UICOLORS } from '../resources/colors';

  $: menuItems = [
    {
      id: 'home',
      label: 'Inicio',
      route: '/',
    },
    {
      id: 'map',
      label: 'Mapa',
      route: '/map',
    },
    {
      id: 'glossary',
      label: 'Glosario',
      route: '/glossary',
    },
  ];

  const getLinkProps = ({ isCurrent }) => {
    if (isCurrent) {
      return { class: 'active-link' };
    }

    return { class: 'regular-link' };
  };

  $: header = css`
    width: 100%;
    height: 68px;
    display: flex;
    border-bottom: solid 1px ${COLORS.lighGray};
    justify-content: space-between;
    align-items: center;
  `;

  $: link = css`
    font-weight: 300;
    font-size: 20px;
    color: ${UICOLORS.mainLink};

    &:hover {
      text-decoration: none;
    }
  `

  $: anchorColor = css`
    color: ${COLORS.black};
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
      <li class='menu-item'>
        <Link
          to={item.route}
          class={link}
          getProps={getLinkProps}
        >
          <span>{item.label}</span>
        </Link>
      </li>
    {/each}
  </ul>
</header>

<style var-prefix='--ds-'>
  .menu {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    margin: 0 40px;
    width: 60%;
  }

  .menu-item {
    margin: 0 12px;
    padding: 8px;
    width: 76px;
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
