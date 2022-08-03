const express = require('express');
//const session = require('express-session')

const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongocfg = require('./configs/dbconfig')
const data = require('./routes/citybikes')

//node app.js collect
if(process.argv.slice(2)[0] === 'collect'){
    console.log('Collecting data, please wait')
    //TODO data collection
}

const app = express();
const port = 3000;

mongoose.connect(mongocfg.database);
mongoose.connection.on('connected', () =>{
    console.log('MongoDB connected on' + mongocfg.database)
});

app.use(cors());
app.use(bodyParser.json())
app.use('/data', data)


app.get('/', (req, res) =>{
    res.send("Invalid endpoint")
});

/*
//TODO add frontend
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/client/index.html'))
})
*/

app.listen (port, () =>{
    console.log('Server started on ' + port)
});
