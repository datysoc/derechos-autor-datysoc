<script>
  import { onMount } from 'svelte';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte'
  import {
    Home,
    GlobeAmericas,
    BookOpen,
    CloudArrowDown,
    ChatBubbleBottomCenterText,
  } from 'svelte-heros-v2';
  import { findIndex } from 'lodash';

  const informeUrl =  import.meta.env.VITE_INFORME_URL;

  export let isMapRoute = false;

  $: menuItems = [
    {
      id: 'home',
      label: 'Inicio',
      route: '/',
      icon: Home,
    },
    {
      id: 'mapa',
      label: 'Mapa',
      route: '/mapa',
      icon: GlobeAmericas,
    },
    {
      id: 'esLegal',
      label: '¿Es Legal?',
      route: '/es-legal',
      icon: ChatBubbleBottomCenterText,
    },
    {
      id: 'glossary',
      label: 'Glosario',
      route: '/glosario',
      icon: BookOpen,
    },
  ];

  let activeLink = null;

  onMount(() => {
    const currentPage = window.location.pathname;

    const currentMenuIndex = findIndex(menuItems, { route: currentPage });

    if (currentMenuIndex > -1) {
      activeLink = menuItems[currentMenuIndex].id;
    }
  });

  const navClass = isMapRoute
    ? 'px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 bg-transparentWhite40'
    : 'py-2 pt-4 px-4 md:px-10';
</script>

<Navbar
  let:hidden
  let:toggle
  navClass={navClass}
>
  <NavBrand href="/" class="mb-6 md:mb-0">
    <img
      src='/images/logo.png'
      class="mr-3 h-12 sm:h-12"
      alt="logo flexibilidades"
    />
    <div class="text-sm md:text-base text-left font-bold text-mainTitle font-body flex-wrap lg:w-80">
      <span>
        Flexibilidades al derecho <br/>
        de autor en América Latina
      </span>
    </div>
  </NavBrand>
  <div class="flex md:order-2 grow justify-between md:justify-end">
    <Button
      href={informeUrl}
      color="mainTitle"
      size="sm"
      class="bg-mainTitle font-body hover:bg-mainLink"
    >
      <CloudArrowDown variation="solid" class="text-white" size="28" />
      <span class="ml-2 text-white text-lg">Informe</span>
    </Button>
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    {#each menuItems as item (item.id)}
      <NavLi
        href={item.route}
        active={activeLink === item.id}
        class="flex flex-row items-center font-body text-lg"
        activeClass="text-mainLink"
        nonActiveClass="text-inactive"
      >
        <svelte:component this={item.icon} variation="solid" size="26" />
        <span class="ml-2">
          {item.label}
        </span>
      </NavLi>
    {/each}
  </NavUl>
</Navbar>
