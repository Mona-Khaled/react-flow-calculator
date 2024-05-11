import Sidebar from "./components/Sidebar/Sidebar";
import Dropzone from "./components/Dropzone/Dropzone";
import React, { useState } from "react";
import MyContext from "./Context";

function App() {
  const [tab, setTab] = useState();
  const [nodeIdx, setNodeIdx] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });
  const value = {
    tab,
    setTab,
    nodeIdx,
    setNodeIdx,
    nodes,
    setNodes,
    edges,
    setEdges,
  };

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    let box = document.getElementById("box");

    if (box) {
      box.style.top = e.clientY + "px";
      box.style.left = e.clientX + "px";
    }
  }
  return (
    <MyContext.Provider value={value}>
      <div
        style={{ display: "flex", height: "inherit" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Sidebar
          tab={tab}
          setTab={setTab}
          setDropPosition={setDropPosition}
          setNodeIdx={setNodeIdx}
        />
        <Dropzone dropPosition={dropPosition} />
      </div>
    </MyContext.Provider>
  );
}

export default App;
