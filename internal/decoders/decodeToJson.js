const { camelCase, forEach } = require('lodash');

const expandToNodes = nodesToExpand => {
  // first array is keys
  const [keys, ...nodes] = nodesToExpand;

  const obj = [];

  forEach(nodes, node => {
    const nodeId = camelCase(node[0])
    const nodeToStore = { id: nodeId };

    forEach(keys, (key, keyIndex) => {
      nodeToStore[key] = node[keyIndex] || '';
    });

    obj.push(nodeToStore);
  })

  return obj;
};

module.exports = { expandToNodes };