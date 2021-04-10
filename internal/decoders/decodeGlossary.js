const { camelCase, forEach, groupBy, map } = require('lodash');

const glossaryKeys = {
  category: 0,
  categorySubtitle: 1,
  categoryDesc: 2,
  exception: 3,
  exceptionDesc: 4,
};

const expandGlossary = nodesToExpand => {
  // first array is keys
  const [keys, ...nodes] = nodesToExpand;

  const grouppedGlossary = groupBy(nodes, node => node[glossaryKeys.category]);

  const mappedGlossary = [];

  forEach(grouppedGlossary, groupGlossary => {
    const [categoryDef, ...exceptionsDef] = groupGlossary;
    const categoryName = categoryDef[glossaryKeys.category];
    const categoryId = camelCase(categoryName);
    const categorySubtitle = categoryDef[glossaryKeys.categorySubtitle];
    const categoryDefinition = categoryDef[glossaryKeys.categoryDesc];

    const categories = [];

    const exceptions = map(exceptionsDef, glossaryData => {
      const exceptionName = glossaryData[glossaryKeys.exception];
      const exceptionId = camelCase(exceptionName);
      const exceptionDescription = glossaryData[glossaryKeys.exceptionDesc];

      return {
        id: exceptionId,
        name: exceptionName,
        description: exceptionDescription,
      };
    });

    const nodeToStore = {
      id: categoryId,
      name: categoryName,
      subtitle: categorySubtitle,
      description: categoryDefinition,
      exceptions,
    };

    mappedGlossary.push(nodeToStore);
  });

  return mappedGlossary;
};

module.exports = { expandGlossary };