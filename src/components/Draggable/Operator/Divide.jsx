import { Handle, Position } from "reactflow";
import { FiDivideCircle } from "react-icons/fi";
import "./index.css";
const handleStyle = { left: 10 };

function Divide({ data, isConnectable }) {
  return (
    <div className="operator-node">
      <div className="card-header">
        <FiDivideCircle />
        &nbsp; Divide
      </div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <input
          id="text"
          name="text"
          className="nodrag"
          disabled
          style={{
            backgroundColor: "white",
            border: "none",
            height: "15px",
            width: "90%",
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

export default Divide;
