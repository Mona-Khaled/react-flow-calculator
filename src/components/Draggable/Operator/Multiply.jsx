import { useCallback, useContext } from "react";
import { Handle, Position } from "reactflow";
import { MdAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { FiDivideCircle } from "react-icons/fi";
import MyContext from "../../../Context";
import "./index.css";
const handleStyle = { left: 10 };

function Multiply({ data, isConnectable }) {
  const { tab, setTab } = useContext(MyContext);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="operator-node">
      <div className="card-header">
        <FaTimesCircle />
        &nbsp; Multiply
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

export default Multiply;
