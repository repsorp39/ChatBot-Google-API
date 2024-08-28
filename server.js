const app = require("./src/app");
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const dbConnect = require('./src/dbConnect');

dbConnect();
mongoose.connection.once('open' , ()=>{
    console.log('DB now connected...');
    app.listen(port, console.log(`Listening on port ${port}`));

})
