<script>
  import {
    BookOpen,
    Microphone,
    DocumentText,
    ArrowTopRightOnSquare
  } from 'svelte-heros-v2';

  const podcastsUrl = import.meta.env.VITE_PODCASTS_URL;
  const informeUrl =  import.meta.env.VITE_INFORME_URL;
  const youtubeVideoUrl = import.meta.env.VITE_YOUTUBE_VERBENA_URL;

  const highlightsInfo = [
    {
      question: '¿Cuál es la situación?',
      icon: DocumentText,
      iconColor: "text-success",
      answer: 'Accede al informe',
      link: informeUrl,
      target: '_blank',
    },
    {
      question: '¿Qué se discute?',
      icon: Microphone,
      iconColor: "text-notice",
      answer: 'Escucha los podcasts',
      link: podcastsUrl,
      target: '_blank',
    },
    {
      question: 'Excepciones',
      icon: BookOpen,
      iconColor: "text-highlight",
      answer: 'Conoce el glosario',
      link: '/glosario',
      target: '_self',
    },
  ];
</script>

<div class='mt-6 flex flex-col items-center md:flex-row px-8'>
  <img
    src='/images/landingLogo.png'
    alt='landing logo'
    class='w-9/12 md:w-5/12 md:mx-8 lg:w-6/12 xl:max-w-lg'
  />
  <div>
    <p class='leading-8 text-left mt-4 text-base md:text-xl md:leading-10 lg:text-2xl xl:text-4xl 2xl:text-5xl lg:leading-11 xl:leading-12'>
      <span class="font-bold text-mainTitle">
        Existe un <span class="bg-noExiste px-2">anacronismo</span>
        <span class="bg-insuficiente px-2">legal</span> en 
        <span class="bg-suficiente px-2">Latinoamérica</span>
      </span>
    </p>
    <p class='leading-4 text-left mt-2 font-semibold text-sm md:text-base md:leading-5 lg:text-lg xl:text-2xl 2xl:text-3xl xl:w-10/12'>
      <span class="font-body text-inactive">
        Necesitamos nuevas flexibilidades al derecho de autor para promover la educación, la cultura y la investigación
      </span>
    </p>
  </div>
</div>

<div class="flex flex-row flex-wrap justify-between mb-4 md:mb-6 xl:mb-8">
  <hr class="border-highlight mt-6 w-1/4 md:w-36" />
  <hr class="border-highlight mt-6 w-1/4 md:w-36" />
</div>

<div class="flex flex-col md:flex-row justify-between lg:justify-evenly items-center mb-4 px-4 min-h-48">
  {#each highlightsInfo as info (info.question)}
    <a
      href={info.link}
      target={info.target}
      class="flex flex-col justify-between bg-box text-center py-5 px-4 rounded-lg my-2 w-full md:w-1/3 lg:w-60 xl:w-72 md:mx-1 text-mainTitle hover:bg-inactiveBox hover:text-mainTitle lg:h-52"
    >
      <p class="font-semibold text-mainTitle md:text-sm lg:text-lg xl:text-xl">
        {info.question}
      </p>
      <svelte:component
        this={info.icon}
        variation="solid"
        size="48"
        class={`${info.iconColor} mx-auto my-4`}
      />
      <p class="font-body md:text-sm lg:text-base xl:text-xl">
        {info.answer}
      </p>
    </a>
  {/each}
</div>

<p class='font-semibold text-mainTitle text-base leading-8 md:text-lg xl:text-2xl 2xl:text-4xl md:leading-9 xl:leading-10 xl:my-10'>
  <span>
    Explora las 
  </span>
  <span class="bg-success px-2">excepciones</span>
  y <span class="bg-insuficiente px-2">limitaciones</span>
  <br/>de <span class="bg-noExiste px-2">Latam</span> en nuestro
  <a href="/mapa" class="bg-mainLink px-4 text-white relative">
    <span>
      mapa
    </span>

    <ArrowTopRightOnSquare class="absolute top-0 right-0" color="white" size="12"/>
  </a>
</p>

{#if youtubeVideoUrl}
  <div class="">
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
