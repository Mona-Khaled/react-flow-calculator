import { useContext, useState } from "react";
import { Handle, Position } from "reactflow";
import { FcMultipleInputs } from "react-icons/fc";
import "./Input.css";
import MyContext from "../../../Context";

const handleStyle = { left: 10 };

function Input({ data, isConnectable }) {
  const { nodes, setNodes } = useContext(MyContext);
  const [value, setValue] = useState(nodes[data.label]?.value || 0);

  const handleChange = (e) => {
    setValue(e.target.value);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === e.target.id
          ? { ...node, value: Number(e.target.value) }
          : node
      )
    );
  };

  return (
    <div resizing="true" className="text-updater-node">
      <div className="card-header">
        {<FcMultipleInputs />}
        &nbsp; Input
      </div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div align="center">
        <input
          id={data.label}
          name="text"
          type="number"
          value={value}
          onChange={handleChange}
          className="nodrag"
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px dashed lightGray",
            height: "13px",
            width: "85%",
            margin: "2px",
          }}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Input;
