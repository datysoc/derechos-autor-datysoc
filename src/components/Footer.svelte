<script>
  import {
    Footer,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
  } from "flowbite-svelte"
  import { LockClosed } from 'svelte-heros-v2';
  import CCLogo from './ccLogo.svelte';
  import ByLogo from './byLogo.svelte';
  import GithubLogo from './githubLogo.svelte';

  const githubRepo = import.meta.env.VITE_GITHUB_REPO;
</script>

<hr class="border-highlight" />

<Footer footerType="custom" class="p-4 bg-white md:px-6 md:py-8 rounded-none shadow-none">
  <div class="sm:flex flex-col xl:flex-row sm:items-center sm:justify-between lg:justify-evenly">
    <div class="flex flex-col items-center">
      <p class="text-xs font-bold md:text-lg text-mainTitle">
        Apoyado por
      </p>

      <div class="flex flex-col md:flex-row flex-wrap items-center sm:justify-between">
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

      <div class="flex flex-col md:flex-row flex-wrap items-center sm:justify-between">
        <img
          src='/images/pijipLogo.png'
          alt='pijip logo'
          class='logo logo-pijip'
        />

        <img
          src='/images/arcadiaLogo.jpg'
          alt='arcadia logo'
          class='logo logo-arcadia'
        />
      </div>
    </div>

    <div class="flex flex-col items-center mt-4 xl:mt-0">
      <p class="text-xs font-bold md:text-lg text-mainTitle">
        Un proyecto de
      </p>

      <div class="sm:flex sm:items-center sm:justify-between flex-wrap">
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

      <div class="sm:flex sm:items-center sm:justify-between flex-wrap">
        <img
          src='/images/fairAccessKnowledgeLogo.png'
          alt='Fair Access Knowdledge logo'
          class='logo logo-fairAccessKnowledge'
        />
      </div>
    </div>
  </div>

  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

  <div class="sm:flex sm:items-end sm:justify-between">
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-xs lg:text-sm text-gray-500 sm:mt-0">
      <FooterIcon
        href="https://creativecommons.org/licenses/by/4.0/deed.es"
        target="_blank"
        class="flex flex-row items-center text-gray-400"
      >
        <CCLogo />
        <span class="ml-px" />
        <ByLogo />

        <span class="text-left ml-2 text-mainTitle hover:text-inactiveBox">
          Licencia Creative Commons<br/>Atribución 4.0 Internacional.
        </span>
      </FooterIcon>
    </FooterLinkGroup>

    <FooterLinkGroup ulClass="flex flex-col flex-wrap cursor-pointer items-center mt-3 text-xs lg:text-sm text-gray-500 sm:mt-0 lg:mt-2">
      <FooterIcon href={githubRepo} target="_blank">
        <GithubLogo />

        <span class="hover:text-inactiveBox">
          Github Repo
        </span>
      </FooterIcon>
    </FooterLinkGroup>

    <FooterLinkGroup ulClass="flex flex-col flex-wrap items-center mt-3 text-xs lg:text-sm text-gray-500 sm:mt-0 lg:mt-2">
      <FooterLink href="/politica-privacidad" aClass="flex flex-col items-center text-mainTitle">
        <LockClosed />

        <span>
          Política de uso y privacidad
        </span>
      </FooterLink>
    </FooterLinkGroup>
  </div>
</Footer>

<style>
  .logo {
    margin: 12px 16px;
  }

  .logo-datysoc {
    height: 40px;
  }

  .logo-indela {
    margin-top: 30px;
    height: 30px;
  }

  .logo-karisma {
    height: 55px;
  }

  .logo-fairAccessKnowledge {
    height: 65px;
  }

  .logo-osf {
    height: 45px;
    margin: 18px 16px 8px;
  }

  .logo-pijip {
    height: 100px;
  }

  .logo-arcadia {
    height: 45px;
  }
</style>
