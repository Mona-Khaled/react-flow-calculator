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

const nodeTypes = { Input, Output, Add, Subtract, Multiply, Divide };

const Dropzone = ({ dropPosition }) => {
  const { tab, nodes, setNodes, edges, setEdges } = useContext(MyContext);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  useEffect(() => {
    if (tab) {
      setNodes((nodes) => [
        ...nodes,
        {
          id: `node-${nodes.length + 1}`,
          type: tab,
          position: { x: dropPosition.x - 350, y: dropPosition.y },
          data: { label: `node-${nodes.length + 1}` },
        },
      ]);
    }
  }, [tab, dropPosition]);

  useEffect(() => {
    const groupedEdges = groupSharedTargetEdges(edges);
    const result = calculate(groupedEdges, nodes);
    assignResultToOutput(result, nodes, edges, setNodes);
  }, [edges]);

  return (
    <div style={{ width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // fitView
        connectionLineType="simplebezier"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Dropzone;
