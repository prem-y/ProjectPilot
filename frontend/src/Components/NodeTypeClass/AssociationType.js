import React from "react";
import { Handle, Position } from "@xyflow/react";
const AssociationType = ({ data, isConnectable }) => {
  let classAttributes = data.attributeItems || [];
  let classOperations = data.operationItems || [];
  let handles = data.handles || [];
  return (
    <>
    <div>
        <div className="border border-black h-full w-full ">
          <div className="border-b border-black h-1/5 p-1 px-2">
            <div className="text-center text-xl">{data.title}</div>
          </div>

          <div className="border-b border-black h-2/5 p-1 px-2">
            {classAttributes.map(function (data) {
              return (
                <>
                  <ul key={data.id}>
                    <li className="text-center">{data.item}</li>
                  </ul>
                </>
              );
            })}
          </div>
          <div className="h-2/5 p-1 px-2">
            {classOperations.map(function (data) {
              return (
                <>
                  <ul key={data.id}>
                    <li className="text-center">{data.item}</li>
                  </ul>
                </>
              );
            })}
          </div>
        </div>
        {handles[0].item  ? (
          <Handle
            id="x"
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
          />
        ) : null}
        {handles[1].item  ? (
          <Handle
            id="y"
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
          />
        ) : null}
        {handles[2].item ? (
          <Handle
            id="z"
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
        ) : null}
        {handles[3].item ? (
          <Handle
            id="w"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
          />
        ) : null}
      </div>
    </>
  )
};

export default AssociationType;
