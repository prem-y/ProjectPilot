const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flowDataSchema = new Schema({
  flowId: { type: String, required: true },
  projectName: {type: String, required: true},
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true }, 
  lastModified: { type: Date, default: Date.now }
});

const FlowData = mongoose.model('Flow', flowDataSchema);
module.exports = FlowData;    
