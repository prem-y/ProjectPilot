const express = require("express");
const router = express.Router();
const FlowData = require("../models/flowDataModel");

router.get("/", (req, res) => {
  res.send("This works");
});

router.post("/add", (req, res) => {
  const flowData = new FlowData({
    flowId: req.body.flowId,
    nodes: req.body.nodes,
    edges: req.body.edges,
  });
  flowData
    .save()
    .then(() => res.json("Flow added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
