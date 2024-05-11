import create from "zustand";

export const useFlowStore = create((set) => ({
  nodes: [], // Initial empty array for nodes
  edges: [], // Initial empty array for edges
  onNodesChange: (changes) => {
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) }));
  },
  onEdgesChange: (changes) => {
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) }));
  },
  onConnect: (connection) => {
    set((state) => ({ edges: addEdge(connection, state.edges) }));
  },
  setNodes: (nodes) => set({ nodes }), // Update nodes directly in the state
  setEdges: (edges) => set({ edges }), // Update edges directly in the state
}));

// Helper functions (replace with actual implementations if needed)
function applyNodeChanges(changes, nodes) {
  // Implement logic to apply node changes (example omitted)
  return nodes;
}

function applyEdgeChanges(changes, edges) {
  // Implement logic to apply edge changes (example omitted)
  return edges;
}

function addEdge(connection, edges) {
  // Implement logic to add a new edge based on the connection (example omitted)
  return edges.concat({ id: "some-unique-id", ...connection }); // Example: Add a new edge with a unique ID
}
