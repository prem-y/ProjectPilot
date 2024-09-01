import React, { useCallback, useState, useEffect } from "react";
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
    attributeItems: [{ item: "Add attribute1" }],
    operationItems: [{ item: "Add operation1" }],
  },
  type: "nodeType",
};

const initialEdges = [];

const Grid = ({ flowId }) => {
  const [data, setData] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeCount, setNodeCount] = useState(data?.nodes?.length || 2);

  useEffect(() => {
    if (flowId) {
      axios
        .get(`http://localhost:5000/data/${flowId}`)
        .then((response) => {
          const fetchedData = response.data;
          setData(fetchedData);
          setNodes(fetchedData.nodes || []);
          setEdges(fetchedData.edges || []);
          setNodeCount(fetchedData.nodes?.length || 2);
        })
        .catch((error) => console.log("Error fetching data: ", error));
    }
  }, [flowId]);

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
  }, []);

  const addNode = (msg) => {
    if (msg === "newNode") {
      const newNode = {
        id: uuidv4(),
        position: { x: 0, y: 0 },
        data: { label: "NewNode" },
      };
      setNodes((nds) => nds.concat(newNode));
      setNodeCount(nodeCount + 1);
    }
    if (msg === "classBlock") {
      const newNode = {
        id: uuidv4(),
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
    if (!flowId) {
      console.error("Flow ID is missing");
      return;
    }

    const flowData = {
      flowId,
      projectName: data.projectName,
      nodes,
      edges,
    };
    axios
      .put(`http://localhost:5000/data/update/${flowId}`, flowData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Flow data saved successfully");
        console.log("Flow data saved successfully", response);
      })
      .catch((error) => {
        console.error("Error updating flow data", error);
      });
  };

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/4 p-4 bg-gray-100 rounded-md shadow-md">
        <Menu
          addNode={addNode}
          node={node}
          setNode={setNode}
          updateNode={updateNode}
          projectName={data.projectName}
        />
      </div>
      <div className="w-3/4 p-4 bg-white rounded-md shadow-md">
        <div style={{ width: "100%", height: "100vh" }}>
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
                  className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600"
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
  );
};

export default Grid;
