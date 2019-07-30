// Dashboard RRF server.js


const express = require('express');
//const { parser, fsm } = require('./src/lib/api');
//const fsm = require('./lib/fsm').fsm;
//const parser = require('./lib/parser').default;
var { fsms, sses } = require('./src/lib/sse');
const salons = require('./src/lib/salons');
var proxy = require('http-proxy-middleware');

const SALONS = require('./config').SALONS;
const CARTO = require('./config').CARTO;
const port = process.env.PORT || require('./config').PORT;

var server = express();

//var sseInit = () => {};

function testLocal(req, res, next) {
  // if there is no file name, skip to the next route
  //console.log("testLocal - name : ",req.params.name);
  if (salons[req.params.name].file === '') {
    next('route')
  }  
  // otherwise pass the control to the next middleware function in this stack
  else {
    //sseInit = sses[req.params.name].init;
    next();
  }
}


server.use(express.static('client/build'));

server.get('/api/svxlink/:name', testLocal, function(req, res, next){
  res.status(200).send(fsms[req.params.name])
})
server.get('/api/svxlink/:name', proxy({ target: 'http://', router: function(req){return salons[req.params.name].url}, pathRewrite: function(path, req){return salons[req.params.name].api}, changeOrigin: true }))

server.get('/realtime/:name', testLocal, function(req, res){ sses[req.params.name].init(req, res); } )
server.get('/realtime/:name', proxy({ target: 'http://', router: function(req, res){return salons[req.params.name].url}, pathRewrite: function(path, req){return salons[req.params.name].stream}, changeOrigin: true }))

server.get('/audiostream/:name', proxy({ target: 'http://', router: function(req, res){return salons[req.params.name].audioUrl}, pathRewrite: function(path, req){return salons[req.params.name].audioStream}, changeOrigin: true }))

server.get('/allstar', proxy({target: 'http://www.ve2csc.com', pathRewrite:{'/allstar' : '/nodes/nodes.aspx?pswd=rrf'}, changeOrigin: true}))

server.get('/infoNodes', (req, res) => {
    res.json({data: node})
})


server.get('/salons', (req, res) => {
  var slns= [];
  SALONS.forEach( sl => {
    slns.push(sl.name)
  })
  res.json({ data: slns } )
})

server.get('/carto', (req, res) => {
  res.json({ data: CARTO } )
})

// console.log that your server is up and running
server.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
server.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

server.get('/noeuds', (req, res) => {
  res.send({ test: 'test backend ' });
});

