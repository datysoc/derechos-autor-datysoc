<script>
  import {
    Button,
    AccordionItem,
    Accordion,
  } from 'flowbite-svelte';
  import { XCircle, ChevronDown, ChevronUp } from 'svelte-heros-v2';
  import { find, first, isEmpty } from 'lodash';
  /*import ExceptionsDetails from '../components/ExceptionsDetails.svelte';*/

  export let onClose;
  export let countryDetails;
  export let states;
  export let categories;

  $: categoryFor = categoryId =>
  find(categories, { id: categoryId });

  $: subcategoryFor = subcategoryId => {
    const categoryDesc = categoryFor(categoryToShow.id).items;
    return find(categoryDesc, { id: subcategoryId }).label;
  };

  $: contrastColorFor = exceptionState =>
  exceptionState !== 'insuficiente' ? 'white' : 'mainTitle';

  $: stateLabelFor = stateId => find(states, { id: stateId });
  $: categoryToShow = first(countryDetails.categories);
</script>

<div class="absolute top-1 left-1">
  <Button
    outline={true}
    class="!p-0 hover:!bg-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-white focus-visible:ring-white"
    size="md"
    on:click={onClose}
  >
    <XCircle
      color="white"
      class="w-8 h-8"
    />
  </Button>
</div>

<div class="text-white text-left pl-8 pr-6 pt-4">
  <h3 class="font-semibold text-xl">{countryDetails.name}</h3>
  <div class="font-body">
    <div class="mt-2 mb-4">
      <p class="font-semibold">
        {categoryFor(categoryToShow.id).value}
      </p>
      <p class="font-sans text-sm">
        {categoryFor(categoryToShow.id).description}
      </p>
    </div>

    <div>
      <Accordion
        activeClasses="bg-white focus:ring-none !accent-red"
        inactiveClasses="hover:border-none"
        class="border-none hover:border-none flex-grow md:max-w-lg lg:max-w-2xl xl:max-w-4xl"
      >
        {#each categoryToShow.exceptions as exception (exception.id)}
          <div class="exception-accordion-item">
            <AccordionItem
              class="bg-{exception.state} cursor-default"
            >
              <div slot="header" class="text-{contrastColorFor(exception.state)}">
                <span class="text-base">
                  • {subcategoryFor(exception.id)}
                </span>
                <br />
                <span class="text-sm font-sans">
                  ( {stateLabelFor(exception.state).state} )
                </span>
              </div>

              <span slot="arrowdown">
                {#if !isEmpty(exception.norms)}
                  <ChevronDown
                    class="text-{contrastColorFor(exception.state)}"
                  />
                {/if}
              </span>
              <span slot="arrowup">
                {#if !isEmpty(exception.norms)}
                  <ChevronUp
                    class="text-{contrastColorFor(exception.state)}"
                  />
                {/if}
              </span>

              <div slot="default">
                {#if !isEmpty(exception.norms)}
                  <Accordion
                    activeClasses="bg-white focus:ring-none !accent-red"
                    inactiveClasses="hover:border-none"
                    class="border-none hover:border-none flex-grow md:max-w-lg lg:max-w-2xl xl:max-w-4xl divide-none"
                  >
                    {#each exception.norms as detail (detail.id)}
                      <div class="exception-accordion-detail mb-4">
                        <AccordionItem
                          class="bg-inactive cursor-default"
                        >
                          <p slot="header" class="text-darkGray font-sans">
                            {detail.title}
                          </p>

                          <span slot="arrowdown">
                            <ChevronDown
                              class="text-darkGray"
                            />
                          </span>
                          <span slot="arrowup">
                            <ChevronUp
                              class="text-darkGray"
                            />
                          </span>

                          <div slot="default" class="text-white bg-inactive px-4 py-4 rounded-lg text-sm">
                            <p class="detailDescription">
                              {detail.description}
                            </p>
                            {#if detail.link}
                              <a href={detail.link} class="!text-secondaryLink font-sans font-semibold text-md underline" target="_blank">
                                {detail.linkLabel || 'más'}
                              </a>
                            {/if}
                          </div>
                        </AccordionItem>
                      </div>
                    {/each}
                  </Accordion>
                {/if}
              </div>
            </AccordionItem>
          </div>
        {/each}
      </Accordion>
    </div>
  </div>
</div>
