import { useContext } from "react";
import { Handle, Position } from "reactflow";
import { PiUploadFill } from "react-icons/pi";
import MyContext from "../../../Context";
import "../index.css";
const handleStyle = { left: 10 };

function Output({ data, isConnectable }) {
  const { nodes } = useContext(MyContext);

  return (
    <div className="text-updater-node">
      <div className="card-header">
        {<PiUploadFill />}
        &nbsp; Output
      </div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div align="center">
        <input
          id="text"
          name="text"
          disabled
          value={nodes.find((node) => node.id === data.label).value || 0}
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

export default Output;
