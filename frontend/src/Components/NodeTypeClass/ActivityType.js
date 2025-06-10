import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
const handleStyle = { left: 10 };

const ActivityType = ({ data, isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div className="relative w-36 h-36 rounded-full border-4 border-black">
        <div class="absolute inset-0 w-full h-1 bg-black transform rotate-45 mt-16"></div>
        <div className="relative left-14 text-4xl">{data.activityNumber}</div>
        <div className="relative left-24 text-4xl">{data.activityName}</div>
        <div>{data.duration}</div>
        <div class="absolute inset-0 w-full h-1 bg-black transform -rotate-45 mt-16"></div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="target" position={Position.Left} id="b" />
    </>
  );
};

export default ActivityType;
