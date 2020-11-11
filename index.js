const fs = require('fs');
const {
  compose,
  drop,
  head
} = require('ramda');

function log(content) {
  console.log(...arguments);
  return content;
}

function cleanNodeInput(args) {
  // Drop the first two params that will be: node and index.js
  return drop(2, args);
}

function getSchemaFileFromPath(pathToFile) {
  return compose(
    data => JSON.parse(data),
    pathToFile => fs.readFileSync(pathToFile, 'utf8')
  )(pathToFile);
}

function cleanArguments(args) {
  return compose(
    head,
    cleanNodeInput
  )(args);
}

compose(
  log,
  getSchemaFileFromPath,
  cleanArguments
)(process.argv);
