const express = require("express");
const router = express.Router();
const FlowData = require("../models/flowDataModel");

router.get("/", (req, res) => {
  FlowData.find()
    .then(flowData => res.json(flowData))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

router.get("/:flowId",(req,res) =>{
  // console.log(req.params.flowId);
  FlowData.findOne({flowId: req.params.flowId})
  .then(flowData => res.json(flowData))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post("/add", (req, res) => {
  const flowData = new FlowData({
    flowId: req.body.flowId,
    projectName: req.body.projectName,
    nodes: req.body.nodes,
    edges: req.body.edges,
  });
  flowData
    .save()
    .then(() => res.json("Flow added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.put("/update/:flowId", (req,res) =>{
  FlowData.findOne({ flowId: req.params.flowId }) 
    .then(data =>{
      if(!data){
        return res.status(404).json('Flow data not found');
      }
      data.flowId= req.body.flowId;
      data.projectName= req.body.projectName;
      data.nodes= req.body.nodes;
      data.edges= req.body.edges;
      data.lastModified = Date.now();
      return data.save()
        .then(() => res.json('Saved Successfully'))
        .catch(err => res.status(400).json(`Error: ${err}`));

    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;
