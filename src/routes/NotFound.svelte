<script>
  import { ArrowTopRightOnSquare } from 'svelte-heros-v2';
</script>

<div class='mt-6 flex flex-col items-center md:flex-row'>
  <img
    src='/images/landingLogo.png'
    alt='landing logo'
    class='w-9/12 md:w-5/12 md:mx-8 lg:w-6/12 xl:max-w-lg'
  />
  <div>
    <p class='leading-8 text-left mt-4 text-base md:text-xl md:leading-10 lg:text-2xl xl:text-4xl 2xl:text-5xl lg:leading-11 xl:leading-12'>
      <span class="font-bold text-mainTitle">
        Lo sentimos, la <span class="bg-noExiste px-2">página</span>
        <span class="bg-insuficiente px-2">no existe</span>.
      </span>

      <a href="/" class="bg-mainLink px-4 text-white relative">
        <span>
          Volver al inicio
        </span>

        <ArrowTopRightOnSquare class="absolute top-0 right-0" color="white" size="12"/>
      </a>
    </p>
  </div>
</div>
