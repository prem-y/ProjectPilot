import React from "react";
import FormTypeClass from "./FormTypeClass";
import DownloadButton from "./DownloadButton";
const Menu = ({ addNode, node, setNode, updateNode }) => {
  const handleRelationshipChange = (e) => {
    const updatedNode = {
      ...node,
      type: e.target.value,
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  return (
    <>
      <div style={{ height: "20vw", width: "20vw" }}>
        <div>Menu</div>
        {node.type === "association" ||  node.type === "composition" ? (
          <FormTypeClass
            addNode={addNode}
            node={node}
            setNode={setNode}
            updateNode={updateNode}
            handleRelationshipChange={handleRelationshipChange}
          />
        ) : null}
        <div className="flex-col">
          <div>
            <button
              className="bg-blue-500 text-white w-full mb-1 p-1"
              onClick={() => addNode("newNode")}
            >
              Add Node
            </button>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white w-full mb-1 p-1"
              onClick={() => addNode("classBlock")}
            >
              Class Block
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
