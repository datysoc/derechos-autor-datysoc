<script>
  import {AccordionItem, Accordion, Button} from 'flowbite-svelte'
  import { replace, forEach } from 'lodash';
  import { CATEGORY_COLORS } from '../resources/colors';
  import { glossary } from '../data/glossary';

  let collapsedState = {};

  forEach(glossary, ({ id }) => {
    collapsedState[id] = false;
  });
</script>

<div class="flex justify-center mt-8 mb-16 px-2">
  <Accordion
    multiple
    activeClasses="bg-white focus:ring-none !accent-red"
    inactiveClasses="hover:border-none"
    class="border-none hover:border-none flex-grow md:max-w-lg lg:max-w-2xl xl:max-w-4xl"
  >
    {#each glossary as termDefs (termDefs.id)}
      <div
        class="!border rounded-lg my-4"
        style={`border-color: ${CATEGORY_COLORS[termDefs.id]} !important`}
      >
        <AccordionItem
          bind:open={collapsedState[termDefs.id]}
          class="hover:border-transparent focus-visible:outline-none"
        >
          <span
            slot="header"
            class="font-bold text-sm text-mainTitle md:text-base xl:text-lg"
          >
            {termDefs.name}
          </span>

          <div class="font-body text-left">
            <p
              class="font-bold text-xs text-inactive md:text-sm xl:text-base border-y border-y border-solid py-2"
              style={`border-bottom-color: ${CATEGORY_COLORS[termDefs.id]}; border-top-color: ${CATEGORY_COLORS[termDefs.id]}`}
            >
              {termDefs.subtitle}
            </p>
            <p class="mt-3 px-0 text-sm lg:text-base md:px-4">
              {@html replace(termDefs.description, /\%/g, '<br/><br/>')}
            </p>
            <div class="my-3 px-px xl:my-4 md:px-4">
              {#each termDefs.exceptions as exceptionDef (exceptionDef.id)}
                <div class="bg-infoBox text-mainTitle text-sm my-4 border rounded-md p-4 pt-2 md:p-6 lg:text-base">
                  <p class="font-semibold font-sans">
                    {exceptionDef.name}
                  </p>
                  <p class="mt-2">{exceptionDef.description}</p>
                </div>
              {/each}
            </div>
          </div>
        </AccordionItem>
    </div>
    {/each}
  </Accordion>
</div>
