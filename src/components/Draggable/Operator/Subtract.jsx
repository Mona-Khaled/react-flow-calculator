import { useCallback, useContext } from "react";
import { Handle, Position } from "reactflow";
import { FaCircleMinus } from "react-icons/fa6";

import "./index.css";
import MyContext from "../../../Context";
const handleStyle = { left: 10 };

function Subtract({ data, isConnectable }) {
  const { tab, setTab } = useContext(MyContext);
  const onChange = useCallback((evt) => {}, []);

  return (
    <div className="operator-node">
      <div className="card-header">
        <FaCircleMinus />
        &nbsp; Subtract
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

export default Subtract;
