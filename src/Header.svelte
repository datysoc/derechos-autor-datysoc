<script>
  import { css } from '../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import { COLORS, UICOLORS } from './resources/colors';

  const menuItems = [
    {
      id: 'map',
      label: 'Mapa',
      route: '/#',
      isSelected: true,
    },
    {
      id: 'blog',
      label: 'Blog',
      route: '/#',
      isSelected: false,
    },
    {
      id: 'about',
      label: 'Acerca',
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
  `
</script>

<header class={header}>
  <div class="logo">
    <img src='images/logo.png' class="logo-icon" />
  </div>

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
  }

  .menu-item {
    margin: 0 12px;
    padding: 8px;
  }

  .logo {
    margin-left: 18px;
  }

  .logo-icon {
    height: 48px;
  }
</style>
