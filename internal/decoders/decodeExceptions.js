const { camelCase, flatten, filter, findIndex, forEach, groupBy, map } = require('lodash');

const expandExceptions = (nodesToExpand) => {
  // first array is keys
  const [keys, ...nodes] = nodesToExpand;

  const obj = [];

  forEach(nodes, node => {
    const nodeId = camelCase(node[0]); // category
    const nodeToStore = { foreignId: nodeId };

    forEach(keys, (key, keyIndex) => {
      nodeToStore[key] = node[keyIndex] || '';
    });

    obj.push(nodeToStore);
  })
  
  const groupped = groupBy(obj, ob => ob.foreignId);

  let objectToNest = {};
  forEach(groupped, (groupObj, groupForeignKey) => {
    const mappedExceptions = map(groupObj, objToMap => {
      const { exception } = objToMap;
      const exceptionId = camelCase(exception);

      return {
        id: exceptionId,
        label: exception,
        value: exceptionId,
      };
    });

    objectToNest[groupForeignKey] = mappedExceptions;
  });

  return objectToNest;
};

const mergeCategoriesExceptions = ({ categories, exceptions }) => {
  const finalCats = map(categories, cat => {
    const items = flatten(filter(exceptions, (exception, exceptionKey) =>
        exceptionKey === cat.id));
    
    return {
      ...cat,
      items,
    };
  });

  return finalCats;
};

module.exports = { expandExceptions, mergeCategoriesExceptions };