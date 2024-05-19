import Sidebar from "./components/Sidebar/Sidebar";
import Dropzone from "./components/Dropzone/Dropzone";
import React, { useState } from "react";
import MyContext from "./Context";

function App() {
  const [tab, setTab] = useState();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });
  const value = {
    tab,
    setTab,
    nodes,
    setNodes,
    edges,
    setEdges,
  };

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <MyContext.Provider value={value}>
      <div style={{ display: "flex" }} onDragOver={handleDragOver}>
        <Sidebar setDropPosition={setDropPosition} />
        <Dropzone dropPosition={dropPosition} />
      </div>
    </MyContext.Provider>
  );
}

export default App;
