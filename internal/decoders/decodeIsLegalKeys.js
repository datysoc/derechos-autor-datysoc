import lodash from "lodash";
const { camelCase, findIndex, forEach } = lodash;

export const expandIsLegalKeys = (nodesToExpand) => {
  // first array is keys
  const [_, ...nodes] = nodesToExpand;

  const mappedisLegalKeys = {};

  forEach(nodes, (node) => {
    mappedisLegalKeys[node[0]] = node[1].replace(/\\n/g, "\n");
  });

  return mappedisLegalKeys;
};

export const expandIsLegalCases = (nodesToExpand) => {
  // first array is keys
  const [_, ...nodes] = nodesToExpand;

  const mappedIsLegalCases = {
    id: nodes[0][0],
    useCases: [],
  };

  forEach(nodes, (node) => {
    const [
      _,
      caseDef,
      countryDef,
      isLegalDef = "no",
      normDef = "",
      notesDef = "",
    ] = node;

    const useCaseIndex = findIndex(mappedIsLegalCases.useCases, {
      id: caseDef,
    });

    if (useCaseIndex === -1) {
      mappedIsLegalCases.useCases.push({
        id: caseDef,
        countries: [
          {
            id: camelCase(countryDef),
            name: countryDef,
            isLegal: isLegalDef || "no",
            norma: normDef,
            notesDef: notesDef,
          },
        ],
      });
    } else {
      mappedIsLegalCases.useCases[useCaseIndex].countries.push({
        id: camelCase(countryDef),
        name: countryDef,
        isLegal: isLegalDef || "no",
        norma: normDef,
        notesDef: notesDef,
      });
    }
  });

  return mappedIsLegalCases;
};
