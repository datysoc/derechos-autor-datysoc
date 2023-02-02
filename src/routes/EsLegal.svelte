<script>
  import { beforeUpdate } from 'svelte';
  import {
    Badge,
    Tabs,
    TabItem,
    Button,
    Modal,
    Card,
  } from 'flowbite-svelte';
  import { GlobeAlt, InformationCircle, XCircle } from 'svelte-heros-v2';
  import { find, findIndex, first, forEach } from 'lodash';
  import { isLegalCases } from '../data/isLegalCases';
  import { isLegalKeys } from '../data/isLegalKeys';
  import { countriesList } from '../data/countriesList';
  import { COLORS } from '../resources/colors';

  const imagesOFLegalCategories = {
    categoria_1: 'educacion',
    categoria_2: 'museos_biblio_archivos',
    categoria_3: 'investigacion',
  };

  const isLegalColors = {
    no: "red",
    incierto: "yellow",
    gratis: "green",
    pagando: "blue",
  };

  let selectedCategory = first(isLegalCases);
  let selectedUseCase = first(selectedCategory.useCases);
  let selectedCountry = '';

  let defaultModal = false;
  let modalNotas = '';

  let showNotice = false;

  let slidePos = 'left-full';

  let screenHeights = "h-110";

  export const esLegalInfo = import.meta.env.VITE_DOWNLOAD_ES_LEGAL_INFO || null;

  $: changingTab = event => {
    const selectedTabValue = event.srcElement.innerHTML;

    let selectedTab = null;

    forEach(isLegalKeys, (legalValue, legalKey) => {
      if (legalValue === selectedTabValue) {
        selectedTab = legalKey;
        return false;
      }
    });

    if (selectedCategory.id !== selectedTab) {
      selectedCategory = find(isLegalCases, { id: selectedTab });
      selectedUseCase = first(selectedCategory.useCases);
    }

    slidePos = 'left-full';
  };

  $: closeSlide = () => {
    slidePos = 'left-full';
  };

  $: isSelected = caseId =>
    caseId === selectedUseCase.id
      ? 'mainTitle'
      : 'inactiveBox';

  $: selectedBox = caseId =>
    caseId === selectedUseCase.id
      ? 'highlight'
      : 'inactiveBox';

  $: selectCase = caseId => {
    selectedUseCase = find(selectedCategory.useCases, { id: caseId });
    slidePos = 'inset-0';
  };

  $: isLegalInCountry = countryId =>
    findIndex(selectedUseCase.countries, { id: countryId }) >= 0;

  $: countryLegalColor = countryId => {
    const country = find(selectedUseCase.countries, { id: countryId });
    return isLegalColors[country.isLegal];
  };

  $: countryLegalLabel = countryId => {
    const country = find(selectedUseCase.countries, { id: countryId });
    return isLegalKeys[country.isLegal];
  };

  $: hasNotesFor = countryId => {
    const country = find(selectedUseCase.countries, { id: countryId }) || { notesDef: '', norma: '' };

    return country.notesDef || country.norma;
  };

  $: showCountryDetails = countryId => {
    const country = find(selectedUseCase.countries, { id: countryId }) || { notesDef: '', norma: '' };

    defaultModal = true;
    selectedCountry = find(countriesList, { id: countryId }).name;
    modalNotas = `<p class="font-semibold mb-4">${country.norma}</p> <p>${country.notesDef}</p>`;
  };
</script>

<Modal
  title="Normas y notas - {selectedCountry}"
  bind:open={defaultModal}
  xs
  autoclose
>
  <div class="mb-3 font-body font-normal text-mainTitle text-sm md:text-base leading-tight text-left">
    {@html modalNotas}
  </div>
</Modal>

<Modal
  title="Metodología y créditos"
  bind:open={showNotice}
  xs
  autoclose
>
  <div class="mb-3 font-body font-normal text-mainTitle text-sm md:text-base leading-tight text-left">
    <p class="font-semibold mb-4">
      Los escenarios hipotéticos analizados dentro de las tres áreas suponen el uso sin fines de lucro de materiales protegidos por derechos de autor y conexos.
    </p>

    <p class="font-semibold mb-4">
      Los resultados de los escenarios hipotéticos de esta publicación no son necesariamente completos o precisos ni constituyen consejo legal. El análisis incluye únicamente una interpretación literal del texto de las leyes referenciadas en cada caso. La investigación no analiza cómo los tribunales han interpretado la ley en cada país y tampoco toma en cuenta la posible existencia de disposiciones contractuales o licencias.
    </p>

    <p class="font-semibold mb-4">
      La metodología de este estudio y los escenarios del área "Educación a distancia" son una adaptación del estudio
      <a
        href="https://www.ei-ie.org/en/item/26525:is-it-legal-education-and-copyright-in-the-digital-age"
        class="text-notice visited:text-notice"
        target="_blank"
      >
        "Is it legal? Education and Copyright in the Digital Age"
      </a>
      publicado por Education International y desarrollado por Teresa Nobre (Communia, UE). Los escenarios y el análisis de las áreas "Investigación" y "Bibliotecas y archivos" han sido desarrollados por Patricia Díaz (Datysoc, Uruguay).
    </p>

    {#if esLegalInfo !== null}
      <p class="font-semibold mb-4">
        <a
          href="{esLegalInfo}"
          class="text-notice visited:text-notice"
          target="_blank"
        >
          Descarga el resumen gráfico de ¿Es legal?
        </a>
      </p>
    {/if}

    <p class="font-semibold mb-4">
      Este estudio se comparte bajo una licencia 
      <a
        href="https://creativecommons.org/licenses/by/4.0/deed.es"
        class="text-notice visited:text-notice"
        target="_blank"
      >
        CC BY 4.0.
      </a>
    </p>
  </div>
</Modal>

<div class="relative">
  <Button
    pill
    class="fixed top-[78vh] md:top-[82vh] right-2 z-20 !bg-notice visited:!bg-notice"
    on:click={() => { showNotice = true }}
  >
    Aviso
  </Button>

  <Tabs
    style="underline"
    class="justify-start"
    contentClass="!mt-0 !pt-0"
  >
    {#each isLegalCases as category (category.id)}
      <TabItem
        open={category.id === selectedCategory.id}
        title={isLegalKeys[category.id]}
        activeClasses="font-semibold text-xs md:text-base lg:text-lg text-mainLink !border-b-2 !border-b-mainLink rounded-none"
        inactiveClasses="text-xxs sm:text-sm md:text-base lg:text-lg !border-none !rounded-none text-inactive"
        class="rounded-none whitespace-pre-line lg:whitespace-normal"
        style="border-bottom-style: solid;"
        on:click={changingTab}
      >
        <img
          src={`/images/${imagesOFLegalCategories[category.id]}.png`}
          alt='landing logo'
            class='w-full mt-0 mb-8'
        />

        <div class="flex flex-row {screenHeights} justify-center relative">
          <div class="use-cases w-full md:w-2/5 lg:w-3/5 max-w-2xl {screenHeights} overscroll-contain overflow-x-hidden overflow-y-auto overscroll-y-auto overscroll-x-none pr-4 lg:px-12">
            <h3 class="text-center text-sm lg:text-base bg-highlight mb-2 text-white font-bold rounded-t-lg">
              Escenarios
            </h3>

            {#each category.useCases as useCase (useCase.id)}
              <div
                class="last:rounded-b-lg my-1 py-2 px-4 text-left border border-{selectedBox(useCase.id)} border-red"
                on:click={() => selectCase(useCase.id)}
              >
                <span
                  class="font-semibold font-body text-sm lg:text-base text-{isSelected(useCase.id)}"
                >
                  {isLegalKeys[useCase.id]}
                </span>
              </div>
            {/each}
          </div>

          <div class="countries w-full md:w-auto {screenHeights} overscroll-contain overflow-x-hidden overflow-y-auto overscroll-y-auto overscroll-x-none pl-4 pr-10 md:px-6 pt-10 md:py-6 absolute md:relative top-0 bg-white md:bg-bgBox rounded-lg drop-shadow-md md:drop-shadow-none w-overflow110 ml-1 md:ml-0 transform duration-500 {slidePos} md:inset-0">
            <Button
              outline={true}
              class="!p-2 absolute top-0 left-0 hover:bg-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-white focus-visible:ring-white md:hidden"
              size="md"
              on:click={closeSlide}
            >
              <XCircle
                color="gray"
              />
            </Button>

            {#each countriesList as country (country.id)}
              <Card
                class="relative w-54 md:w-60 py-4 pl-6 mb-6"
                padding="none"
              >
                <p class="flex items-center text-left text-sm lg:text-base font-bold tracking-tight text-inactive">
                  <GlobeAlt />
                  <span class="ml-2">
                    {country.name}
                  </span>
                </p>

                {#if isLegalInCountry(country.id)}
                  <p class={`flex items-center text-xs md:text-sm font-bold tracking-tight text-inactiveBox`}>
                    <GlobeAlt color="white" />
                    <Badge color={countryLegalColor(country.id)}>{countryLegalLabel(country.id)}</Badge>
                  </p>
                {/if}

                {#if hasNotesFor(country.id)}
                  <div
                    class="absolute flex items-center justify-center w-8 h-20 bg-mainLink top-0 right-0 rounded-r-lg cursor-pointer"
                    on:click={() => showCountryDetails(country.id)}
                  >
                    <InformationCircle color="white" size="22" />
                  </div>
                {/if}
              </Card>
            {/each}
          </div>
        </div>
      </TabItem>
    {/each}
  </Tabs>
</div>
