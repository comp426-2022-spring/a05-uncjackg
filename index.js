import { coinFlip, coinFlips, countFlips, flipACoin } from './modules/coin.mjs';
import minimist from 'minimist';
import db from './database.js';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';

var HTTP_PORT = 5000;

// allow for custom args
const args = minimist(process.argv.slice(2));

// Store help text 
const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)

// If --help or -h, echo help text to STDOUT and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

// set custom port if passed
const port = args['port'];
if (port) {
  HTTP_PORT = port;
}

// initialize app
const app = express();
const server = app.listen(HTTP_PORT, () => {
  console.log(`App listening on port ${HTTP_PORT}`);
});

if (args.log && args.log != 'false') {
  // Use morgan for logging to files
  // Create a write stream to append (flags: 'a') to a file
  const WRITESTREAM = fs.createWriteStream('access.log', { flags: 'a' })
  // Set up the access logging middleware
  app.use(morgan('combined', { stream: WRITESTREAM }))
}

// database middleware
app.use((req, res, next) => {
  let logdata = {
    remoteaddr: req.ip,
    remoteuser: req.user,
    time: Date.now(),
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    httpversion: req.httpVersion,
    status: res.statusCode,
    referer: req.headers['referer'],
    useragent: req.headers['user-agent']
  }

  const stmt = db.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent);

  next();
});

// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * ENDPOINTS
 */

// /app
app.get('/app/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
  res.end(res.statusCode + ' ' + res.statusMessage);
});

// /app/flip
app.get('/app/flip/', (req, res) => {
  const flip = coinFlip();
  res.end(`{"flip":"${flip}"}`);
});

// /app/flips/:number
app.get('/app/flips/:number', (req, res) => {
  const number = req.params.number;
  const flips = coinFlips(number);
  const count = JSON.stringify(countFlips(flips));
  res.end(`{"raw":[${flips}],"summary":${count}}`)
});

// /app/flip/call/heads
app.get('/app/flip/call/heads', (req, res) => {
  const call = flipACoin('heads');
  res.end(JSON.stringify(call));
});

// /app/flip/call/teal
app.get('/app/flip/call/tails', (req, res) => {
  const call = flipACoin('tails');
  res.end(JSON.stringify(call));
});

// /app/log/access
app.get('/app/log/access', (req, res) => {
  if (!args.debug) {
    console.log('pass --debug to access the log');
    return;
  }

  try {
    const stmt = db.prepare('SELECT * FROM accesslog').all();
    res.status(200).json(stmt);
  } catch (e) {
    console.error(e)
  }
});

// /app/error
app.get('/app/error', (req, res) => {
  if (!args.debug) {
    console.log('pass --debug to access the log');
    return;
  }

  throw new Error('Error test successful.');
});

// default endpoint to catch all other requests
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND');
});
