const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://premy:mypassword1@mycluster.rlwbmeg.mongodb.net/',
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB connection established!")
})

const nodeDataRouter = require('./routes/flowDataRoute');
app.use('/data', nodeDataRouter)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
