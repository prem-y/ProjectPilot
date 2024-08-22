import React, { useCallback, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Menu from "./Menu";
import NodeType from "./NodeType";
import AssociationType from "./NodeTypeClass/AssociationType";
import CompositionType from "./NodeTypeClass/CompositionType";
import DownloadButton from "./DownloadButton";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  nodeType: NodeType,
  composition: CompositionType,
  association: AssociationType,
};
const initialNodes = [];

const dummyNode = {
  id: "",
  position: { x: 200, y: 200 },
  data: {
    title: "Title here",
    attributeItems: [
      {
        item: "Add attribute1",
      },
    ],
    operationItems: [
      {
        item: "Add operation1",
      },
    ],
  },
  type: "nodeType",
};

const initialEdges = [];

const Grid = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(2);

  const [node, setNode] = useState(dummyNode);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "straight" }, eds)),
    [setEdges]
  );
  const handleNodeClick = useCallback((e, Node) => {
    if (Node.type === "association" || Node.type === "composition") {
      setNode(Node);
    }
  });
  const addNode = (msg) => {
    if (msg === "newNode") {
      const newNode = {
        id: (nodeCount + 1).toString(),
        position: { x: 0, y: 0 },
        data: { label: (nodeCount + 1).toString() },
      };
      setNodes((nds) => nds.concat(newNode));
      setNodeCount(nodeCount + 1);
    }
    if (msg === "classBlock") {
      const newNode = {
        id: (nodeCount + 1).toString(),
        position: { x: 0, y: 0 },
        data: {
          title: "Title heree",
          attributeItems: [
            {
              item: "Add attribute1",
            },
            { item: "Add attribute2" },
          ],
          operationItems: [
            {
              item: "Add operation1",
            },
            {
              item: "Add operation2",
            },
          ],
          handles: [
            {
              item: true,
            },
            {
              item: true,
            },
            {
              item: true,
            },
            {
              item: true,
            },
          ],
          relationType: [
            {
              item: "association",
            },
            {
              item: "composition",
            },
            {
              item: "aggregation",
            },
            {
              item: "generalization",
            },
          ],
          selectedRelationship: "composition",
        },
        type: "composition",
      };
      setNodes((nds) => nds.concat(newNode));
      setNodeCount(nodeCount + 1);
    }
  };
  const onElementsRemove = (elementsToRemove) => {
    setNodes((nds) => applyNodeChanges(elementsToRemove, nds));
  };

  const updateNode = (updatedNode) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
  };

  const saveFlowData = () => {
    alert("ok");
    const flowData = {
      flowId: uuidv4(), // Replace with a unique identifier for the flow
      nodes,
      edges,
    };
    console.log(flowData);
    axios
      .post("http://localhost:5000/data/add", flowData, {
        
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Flow data saved successfully", response);
      })
      .catch((error) => {
        console.error("Error saving flow data", error);
      });
  };

  return (
    <>
      <div className="flex">
        <div className="outline-dotted">
          <Menu
            addNode={addNode}
            node={node}
            setNode={setNode}
            updateNode={updateNode}
          />
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
                deleteKeyCode={["Backspace", "Delete"]}
                onNodeClick={handleNodeClick}
              >
                <Panel position="top">
                  <button
                    onClick={saveFlowData}
                    className="bg-green-500 text-white p-2"
                  >
                    Save Flow
                  </button>
                </Panel>

                <DownloadButton />
                <Controls />
                <MiniMap />
                <Background variant="lines" gap={12} size={1} />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;
