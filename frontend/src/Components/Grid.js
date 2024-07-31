import React, { useCallback, useState } from "react";
import Menu from "./Menu";
import NodeType from "./NodeType";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const nodeTypes = { nodeType: NodeType };
const initialNodes = [
  { id: "1", position: { x: 200, y: 200 }, data: { label: "1" }, type: 'nodeType' },
];

const initialEdges = [];

const Grid = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(2);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: (nodeCount + 1).toString(),
      position: { x: 0, y: 0 },
      data: { label: (nodeCount + 1).toString() },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount(nodeCount + 1);
  };
  const onElementsRemove = (elementsToRemove) => {
    setNodes((nds) => applyNodeChanges(elementsToRemove, nds));
  };

  return (
    <>
      <div className="flex">
        <div className="outline-dotted">
          <Menu addNode={addNode} />
        </div>
        <div className="outline-dotted">
          <div style={{ width: "80vw", height: "100vh" }}>
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onElementsRemove={onElementsRemove}
                deleteKeyCode={['Backspace', 'Delete']}
              >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;
