import React from "react";
import FormTypeClass from "./FormTypeClass";

const Menu = ({ addNode, node, setNode, updateNode, projectName }) => {
  const handleRelationshipChange = (e) => {
    const updatedNode = {
      ...node,
      type: e.target.value,
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <div className="mb-4 text-lg font-semibold">Project: {projectName}</div>
      <div className="mb-4 text-lg font-semibold">Menu</div>
      {node.type === "association" || node.type === "composition" ? (
        <FormTypeClass
          addNode={addNode}
          node={node}
          setNode={setNode}
          updateNode={updateNode}
          handleRelationshipChange={handleRelationshipChange}
        />
      ) : null}
      <div className="flex flex-col space-y-2">
        <button
          className="bg-blue-500 text-white w-full p-2 rounded-md shadow-md hover:bg-blue-600"
          onClick={() => addNode("newNode")}
        >
          Add Node
        </button>
        <button
          className="bg-blue-500 text-white w-full p-2 rounded-md shadow-md hover:bg-blue-600"
          onClick={() => addNode("classBlock")}
        >
          Class Block
        </button>
      </div>
    </div>
  );
};

export default Menu;
