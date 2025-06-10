const express = require("express");
const router = express.Router(); 
const FlowData = require("../models/flowModel");

router.get("/", (req, res) => {
  FlowData.find()
    .then(flowData => res.json(flowData))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

router.get("/:flowId",(req,res) =>{
  FlowData.findOne({flowId: req.params.flowId})
  .then(flowData => res.json(flowData))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

router.delete("/:flowId", (req,res) =>{
  FlowData.findOneAndDelete({flowId: req.params.flowId})
    .then(() => res.json("Flow data deleted successfully."))
    .catch(err => res.status(400).json(`Erron: ${err}`));
})

router.post("/add", (req, res) => {
  const flowData = new FlowData({
    flowId: req.body.flowId,
    projectName: req.body.projectName,
    projectType: req.body.projectType,
    nodes: req.body.nodes,
    edges: req.body.edges,
    lastModified: Date.now(),
  });
  flowData
    .save()
    .then(() => res.json("Flow added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.put("/update/:flowId", async (req, res) => {
  try {
    const data = await FlowData.findOne({ flowId: req.params.flowId });
    if (!data) {
      return res.status(404).json('Flow data not found');
    }

    data.projectName = req.body.projectName;
    data.projectType = req.body.projectType;
    data.nodes = req.body.nodes;
    data.edges = req.body.edges;
    data.lastModified = Date.now();

    await data.save();
    return res.json('Saved Successfully');
  } catch (err) {
    return res.status(400).json(`Error: ${err}`);
  }
});


module.exports = router;
