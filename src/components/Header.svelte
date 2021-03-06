<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import { COLORS, UICOLORS } from '../resources/colors';

  const menuItems = [
    {
      id: 'home',
      label: 'Inicio',
      route: '/#',
      isSelected: false,
    },
    {
      id: 'map',
      label: 'Mapa',
      route: '/#',
      isSelected: true,
    },
    {
      id: 'glossary',
      label: 'Glosario',
      route: '/#',
      isSelected: false,
    },
  ];

  $: header = css`
    width: 100%;
    height: 68px;
    display: flex;
    border-bottom: solid 1px ${COLORS.lighGray};
    justify-content: space-between;
    align-items: center;
  `;

  $: link = isSelected => css`
    font-weight: ${isSelected ? '500' : '300'};
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
      <img src='images/logo.png' class="logo-icon" alt="logo" />
      <div class={`isotype ${anchorColor}`}>
        <span>Flexibilidades al derecho</span>
        <span>de autor en América Latina</span>
      </div>
  </a>

  <ul class='menu'>
    {#each menuItems as item (item.id)}
      <li class='menu-item'>
        <a href={item.route} class={link(item.isSelected)} >
          <span>{item.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</header>

<style var-prefix='--ds-'>
  .menu {
    list-style: none;
    display: flex;
    margin: 0 40px;
  }

  .menu-item {
    margin: 0 12px;
    padding: 8px;
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
