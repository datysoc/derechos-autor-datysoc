const { camelCase, capitalize, forEach, groupBy, map } = require('lodash');

const countryKeys = {
  name: 0,
  category: 1,
  state: 2,
  exception: 3,
  norm1: 4,
  norm1_description: 5,
  norm1_link: 6,
  norm1_linkDescription: 7,
  norm2: 8,
  norm2_description: 9,
  norm2_link: 10,
  norm2_linkDescription: 11,
  norm3: 12,
  norm3_description: 13,
  norm3_link: 14,
  norm3_linkDescription: 15,
};

const normsForException = categoryData =>
  [
    [
      categoryData[countryKeys.norm1],
      categoryData[countryKeys.norm1_description],
      categoryData[countryKeys.norm1_link],
      categoryData[countryKeys.norm1_linkDescription],
    ],
    [
      categoryData[countryKeys.norm2],
      categoryData[countryKeys.norm2_description],
      categoryData[countryKeys.norm2_link],
      categoryData[countryKeys.norm2_linkDescription],
    ],
    [
      categoryData[countryKeys.norm3],
      categoryData[countryKeys.norm3_description],
      categoryData[countryKeys.norm3_link],
      categoryData[countryKeys.norm3_linkDescription],
    ],
  ];

const parseNorms = (normsToParse) => {
  const norms = [];

  forEach(normsToParse, normToParse => {
    const [title, description, link, linkLabel] = normToParse;

    if (title) {
      const norm = {
        id: camelCase(title),
        title,
        description,
        link,
        linkLabel,
      };

      norms.push(norm);
    }
  });

  return norms;
};

const categoryToStore = grouppedCategory => {
  const firstCategory = grouppedCategory[0];
  const categoryId = camelCase(firstCategory[countryKeys.category]);

  const exceptions = map(grouppedCategory, categoryData => {
    const exceptionId = camelCase(categoryData[countryKeys.exception]);
    const state = camelCase(categoryData[countryKeys.state]);
    
    return {
      id: exceptionId,
      state: state,
      norms: parseNorms(normsForException(categoryData)),
    };
  });

  return {
    id: categoryId,
    exceptions,
  };
};

const expandCountries = nodesToExpand => {
  // first array is keys
  const [keys, ...nodes] = nodesToExpand;

  const grouppedCountries = groupBy(nodes, node => node[countryKeys.name]);

  const mappedCountries = [];

  forEach(grouppedCountries, grouppedCountry => {
    const firstItem = grouppedCountry[0];
    const countryName = firstItem[countryKeys.name];
    const countryId = capitalize(camelCase(countryName));

    const categories = [];

    const grouppedCategoriesByCountry = groupBy(grouppedCountry, countryData =>
      countryData[countryKeys.category]);

    forEach(grouppedCategoriesByCountry, grouppedCategory => {
      categories.push(categoryToStore(grouppedCategory));
    });

    const nodeToStore = {
      id: countryId === 'Brasil' ? 'Brazil' : countryId,
      name: countryName,
      categories,
    };

    mappedCountries.push(nodeToStore);
  });

  return mappedCountries;
};

module.exports = { expandCountries };