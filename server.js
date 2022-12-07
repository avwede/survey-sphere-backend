const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const cors = require("cors");
const corsOptions = {
   origin:'*', 
   credentials:true,     
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) 
app.use(bodyParser.json());

// Hook up api endpoints with routes. 
const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require('./models');
db.sequelize.sync()
  .then(() => {
    console.log("Synced to CockroachDB.");
  })
  .catch((err) => {
    console.log("Failed to sync to CockroachDB: " + err.message);
  });

module.export = app;