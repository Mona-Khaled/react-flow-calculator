/**
group edges by target property
 res example
    groupedEdges : {
          node-4: [
      {source: 'node-1', sourceHandle: 'b', target: 'node-4', targetHandle: null, id: 'reactflow__edge-node-1b-node-4'},
      {source: 'node-2', sourceHandle: 'b', target: 'node-4', targetHandle: null, id: 'reactflow__edge-node-2b-node-4'},
      {source: 'node-3', sourceHandle: 'b', target: 'node-4', targetHandle: null, id: 'reactflow__edge-node-3b-node-4'},
          ]
    * }
  */
export const groupSharedTargetEdges = (edges) => {
  const groupedEdges = edges.reduce((acc, edge) => {
    const { target } = edge;
    if (!acc[target]) {
      acc[target] = [];
    }
    acc[target].push(edge);
    return acc;
  }, {});
  return groupedEdges;
};

/** Calculate summation of value property for each key in groupedEdges
 * res example
 * summedValues {node-3: 6, node-9: 12}
 */
const add = (groupedObjects, nodes) => {
  let aggregatedValue = groupedObjects.reduce((sum, obj) => {
    const node = nodes.find((node) => node.id === obj.source);
    if (node && node.value) {
      return sum + node.value;
    }
    return sum;
  }, 0);
  return aggregatedValue;
};

const subtract = (groupedObjects, nodes) => {
  let aggregatedValue = groupedObjects.reduce(
    (acc, obj) =>
      nodes.find((node) => node.id === obj.source)?.value > acc
        ? nodes.find((node) => node.id === obj.source)?.value - acc
        : acc - nodes.find((node) => node.id === obj.source)?.value || acc,
    0
  );
  return aggregatedValue;
};

const multiply = (groupedObjects, nodes) => {
  let aggregatedValue = groupedObjects.reduce((sum, obj) => {
    const node = nodes.find((node) => node.id === obj.source);
    if (node && node.value) {
      return sum * node.value;
    }
    return sum;
  }, 1);
  return aggregatedValue;
};

const divide = (groupedObjects, nodes) => {
  let aggregatedValue = groupedObjects.reduce(
    (acc, obj) =>
      1 / acc / nodes.find((node) => node.id === obj.source)?.value || acc,
    1
  );
  return aggregatedValue;
};

export const calculate = (groupedEdges, nodes) => {
  let res = {};
  for (const key in groupedEdges) {
    const targetNode = nodes.find((node) => node.id === key);
    console.log("🚀 ~ calculate ~ targetNode:", targetNode);
    const groupedObjects = groupedEdges[key];
    console.log("🚀 ~ calculate ~ groupedObjects:", groupedObjects);
    let aggregatedValue;
    if (targetNode.type === "Add") {
      aggregatedValue = add(groupedObjects, nodes);
    } else if (targetNode.type === "Subtract") {
      aggregatedValue = subtract(groupedObjects, nodes);
    } else if (targetNode.type === "Multiply") {
      aggregatedValue = multiply(groupedObjects, nodes);
    } else if (targetNode.type === "Divide") {
      aggregatedValue = divide(groupedObjects, nodes);
    } else if (targetNode.type === "Output") {
      aggregatedValue = add(groupedObjects, nodes);
      console.log("🚀 ~ calculate ~ aggregatedValue:", aggregatedValue);
      // should sum all the incoming values since they are inputs that are connected directly to output
    }
    res[key] = aggregatedValue;
  }
  return res;
};
// TODO WE NEED TO ASSIGN THE VALUE COMING FROM INPUT/INPUTS DIRECTLY TO THE CONNECTED OUTPUT
export const assignResultToOutput = (result, nodes, edges, setNodes) => {
  console.log("🚀 ~ assignResultToOutput ~ result:", result);
  for (const key in result) {
    const operatorOutputEdge = edges.find((edge) => edge.source === key); // or input output edge
    const outputNode = nodes.find(
      (node) => node.id === operatorOutputEdge?.target
    );
    if (outputNode) {
      console.log("🚀 ~ assignResultToOutput ~ outputNode:", outputNode);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === outputNode.id ? { ...node, value: result[key] } : node
        )
      );
    }
  }
};
