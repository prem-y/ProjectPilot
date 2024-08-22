const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flowDataSchema = new Schema({
  flowId: { type: String, required: true },
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true }, 
});

const FlowData = mongoose.model('Flow', flowDataSchema);
module.exports = FlowData;
