import React, {useEffect, useState} from 'react'
import Grid from '../Components/Grid'
import { useLocation } from 'react-router-dom'
const Canvas = () => {
  const [flowId, setFlowId] = useState(null);

  useEffect(() =>{
    const storedFlowId = JSON.parse(localStorage.getItem('flowId'));
    if(storedFlowId){
      setFlowId(storedFlowId);
    }
  }, []);

  return (
    <>
        <Grid flowId={flowId}/>
    </>
  )
}

export default Canvas