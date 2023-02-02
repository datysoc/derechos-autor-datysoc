import lodash from "lodash";
const { camelCase, forEach } = lodash;

export const expandToNodes = (nodesToExpand) => {
  // first array is keys
  const [keys, ...nodes] = nodesToExpand;

  const obj = [];

  forEach(nodes, (node) => {
    const nodeId = camelCase(node[0]);
    const nodeToStore = { id: nodeId };

    forEach(keys, (key, keyIndex) => {
      nodeToStore[key] = node[keyIndex] || "";
    });

    obj.push(nodeToStore);
  });

  return obj;
};

