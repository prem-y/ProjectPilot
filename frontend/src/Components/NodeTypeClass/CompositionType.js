import React, { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

const CompositionType = ({ data, isConnectable }) => {
  let classAttributes = data.attributeItems || [];
  let classOperations = data.operationItems || [];
  let handles = data.handles || [];
  return (
    <>
      <div>
        {handles[2].item  ? (
          <div className="relative group">
            <div className="absolute -top-7 left-1/2 -ml-2 h-6 w-6 bg-black transform rotate-45"></div>
            <div className="absolute flex -top-7 left-1/2 ml-1 group-hover:-top-4">
              <Handle //top
                type="target"
                id="c"
                isConnectable={isConnectable}
                className="absolute h-1 w-1  group-hover:h-6 group-hover:w-6 border-none"
              />
            </div>
          </div>
        ) : null}

        <div className="border border-black h-full w-full ">
          <div className="border-b border-black h-1/5 p-1 px-2">
            <div className="text-center text-xl">{data.title}</div>
          </div>
          {handles[0].item  ? (
            <div className="relative group">
              <div className="absolute top-5 -left-7  h-6 w-6 bg-black transform rotate-45"></div>
              <div className="absolute flex">
                <Handle //left
                  type="target"
                  id="a"
                  isConnectable={isConnectable}
                  style={{}}
                  className="absolute top-8 -left-7 h-1 w-1 group-hover:-left-4 group-hover:h-6 group-hover:w-6 border-none"
                />
              </div>
            </div>
          ) : null}

          {handles[1].item  ? (
            <div className="relative group">
              <div className="absolute top-5 left-full h-6 w-6 bg-black transform rotate-45 ml-1"></div>
              <div className="absolute flex top-8 left-full ml-7 group-hover:-ml-0">
                <Handle //right
                  type="source"
                  id="b"
                  isConnectable={isConnectable}
                  style={{}}
                  className="absolute  h-1 w-1 group-hover:left-full group-hover:ml-4 group-hover:h-6 group-hover:w-6 border-none"
                />
              </div>
            </div>
          ) : null}

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
          {handles[3].item ? (
            <div className="relative group">
              <div className="absolute top-1 left-1/2 -ml-2 h-6 w-6 bg-black transform rotate-45"></div>
              <div className="absolute flex top-7 left-1/2 ml-1">
                <Handle //bottom
                  type="source"
                  id="d"
                  isConnectable={isConnectable}
                  className="absolute  h-1 w-1 group-hover:h-6 group-hover:w-6 group-hover:-top-3 border-none"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CompositionType;
