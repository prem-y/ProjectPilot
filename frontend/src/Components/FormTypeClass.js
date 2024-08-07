import React from "react";

const FormTypeClass = ({ addNode, node, setNode, updateNode, handleRelationshipChange }) => {
  let attributesList = node.data.attributeItems || [];
  let operationsList = node.data.operationItems || [];
  let handles = node.data.handles || [];
  let relationships = node.data.relationType || [];

  const handleDropdownChange = (evt) => {
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        selectedRelationship: evt.target.value,
      },
      type: evt.target.value
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };

  const handleCheckboxChange = (evt, index) =>{
    const newItems = handles.map((itm, i) => {
      if (i === index) {
        return { ...itm, item: evt.target.checked };
      }
      return itm;
    });
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        handles: newItems,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  }
  const handleNodeTitleChange = (evt) => {
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        title: evt.target.value,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  const handleAttributeChange = (evt, index) => {
    const newAttributeItems = attributesList.map((attr, i) => {
      if (i === index) {
        return { ...attr, item: evt.target.value };
      }
      return attr;
    });
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        attributeItems: newAttributeItems,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  const handleOperationChange = (evt, index) => {
    const newOperationItems = operationsList.map((attr, i) => {
      if (i === index) {
        return { ...attr, item: evt.target.value };
      }
      return attr;
    });
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        operationItems: newOperationItems,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  const addAttribute = () => {
    const newAttributeItems = [...attributesList, { item: "New attribute" }];
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        attributeItems: newAttributeItems,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  const addOperation = () => {
    const newOperationItems = [...operationsList, { item: "New operation" }];
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        operationItems: newOperationItems,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };

  const deleteAttribute = (index) => {
    const newAttributeItems = attributesList.filter((_, i) => i !== index);
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        attributeItems: newAttributeItems,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  const deleteOperation = (index) => {
    const newOperationItems = operationsList.filter((_, i) => i !== index);
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        operationItems: newOperationItems,
      },
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  return (
    <>
      <div className="pb-2">
        <label className="">Title: </label> <br />
        <input
          type="text"
          className="border-2 w-full"
          value={node.data.title}
          onChange={handleNodeTitleChange}
        />
        <label className="">Attributes:</label>
        {attributesList.map((data, index) => (
          <ul key={index}>
            <li className="flex mb-1 group">
              <button
                className="bg-red-500 p-1 text-white hidden group-hover:block"
                onClick={() => deleteAttribute(index)}
              >
                X
              </button>
              <input
                type="text"
                className="border-2 w-full"
                value={data.item}
                onChange={(evt) => handleAttributeChange(evt, index)}
              />
            </li>
          </ul>
        ))}
        <button
          className="bg-blue-500 text-white w-full mb-1 p-1"
          onClick={addAttribute}
        >
          Add attribute
        </button>
        <label>Operations</label>
        {operationsList.map((data, index) => (
          <ul key={index}>
            <li className="flex mb-1 group">
              <button
                className="bg-red-500 p-1 text-white hidden group-hover:block"
                onClick={() => deleteOperation(index)}
              >
                X
              </button>
              <input
                type="text"
                className="border-2 w-full"
                value={data.item}
                onChange={(evt) => handleOperationChange(evt, index)}
              />
            </li>
          </ul>
        ))}
        <button
          className="bg-blue-500 text-white w-full mb-1 p-1"
          onClick={addOperation}
        >
          Add operation
        </button>
        <label>Activate handles:</label>
        <div className="flex justify-between p-1 pl-2 pr-4 ">
          {handles.map(function (data, index) {
            return(
              <>
              <input type="checkbox" checked={data.item} className="h-8 w-8" onChange={(evt) => handleCheckboxChange(evt,index)}/>
              </>
            )
            
          })}
        </div>
        <div className="flex justify-between p-2 pl-2 pr-1">
          <label>Left</label>
          <label>Right</label>
          <label>Top</label>
          <label>Bottom</label>
        </div>
        <label>Relationship: </label> 
        <select 
        value={node.data.selectedRelationship}
        onChange={handleDropdownChange}
        >
          {relationships.map(function(data, index){
            return(
              <>
              <option value={data.item}>{data.item}</option>
              </>
            )
          })}
        </select>
      </div>
    </>
  );
};

export default FormTypeClass;
