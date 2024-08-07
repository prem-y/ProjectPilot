import React, { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

const handleStyle = { left: 1 };

const NodeType = ({ data, isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  return (
    <>
      <div className="text-updater-node border-2">
        <div>
          <div>{data.label}</div>
          <input
            id="text"
            name="text"
            onChange={onChange}
            className="m-4"
            placeholder="Text"
          />
        </div>
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />

        <Handle
          type="source"
          position={Position.Left}
          id="a"
          style={handleStyle}
          isConnectable={isConnectable}
        />

        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="c"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
};

export default NodeType;
