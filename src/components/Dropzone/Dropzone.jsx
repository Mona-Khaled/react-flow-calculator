import ReactFlow, {
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import { useCallback, useEffect, useContext } from "react";
import Input from "../Draggable/Input/Input.jsx";
import Output from "../Draggable/Output/Output.jsx";
import Add from "../Draggable/Operator/Add.jsx";
import Subtract from "../Draggable/Operator/Subtract.jsx";
import Multiply from "../Draggable/Operator/Multiply.jsx";
import Divide from "../Draggable/Operator/Divide.jsx";
import "reactflow/dist/style.css";
import MyContext from "../../Context.js";
import {
  groupSharedTargetEdges,
  calculate,
  assignResultToOutput,
} from "../utils/calculatorLogic.js";
import "./index.css";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { Input, Output, Add, Subtract, Multiply, Divide };

const Dropzone = ({ dropPosition }) => {
  const { tab, nodes, setNodes, edges, setEdges, nodeIdx } =
    useContext(MyContext);

  useEffect(() => {
    if (edges.length > 0) {
      const groupedEdges = groupSharedTargetEdges(edges);
      const result = calculate(groupedEdges, nodes);
      assignResultToOutput(result, nodes, edges, setNodes);
    }
  }, [edges]); // ////////////////// TODO 🚨 WE SHOULD LISTEN TO NODES HERE AS WELL BUT CAUSING RERENDERING TOO MUCH !!

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);
  // connecting nodes manually
  const onConnect = useCallback((params) => {
    // prevent connecting 2 inputs
    // if (nodes.length > 0) {
    //   const nodesToConnect = nodes.filter(
    //     (node) => node.id === params.target || node.id === params.source
    //   );
    //   if ((nodesToConnect[0].type === nodesToConnect[1].type) === "Input") {
    //     return;
    //   } else {
    //     setEdges((eds) => addEdge(params, eds));
    //   }
    // } else {
    setEdges((eds) => addEdge(params, eds));
    // }
  }, []);
  useEffect(() => {
    if (tab) {
      setNodes((nodes) => [
        ...nodes,
        {
          id: `node-${nodes.length + 1}`,
          type: tab,
          targetPosition: "top",
          position: { x: dropPosition.x - 350, y: dropPosition.y },
          data: { label: `node-${nodes.length + 1}` },
        },
      ]);
    }
  }, [tab, nodeIdx, dropPosition]);

  return (
    <div style={{ height: "initial", width: "-webkit-fill-available" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // fitView
        connectionLineType="simplebezier"
        edgesUpdatable={true}
        // style={rfStyle}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Dropzone;
