const fs = require('fs')
const {forEach, map} = require('lodash');
const {expandToNodes} = require('./decodeToJson');
const {expandExceptions, mergeCategoriesExceptions} = require('./decodeExceptions');
const {expandCountries} = require('./decodeCountries');
const {expandGlossary} = require('./decodeGlossary');

console.clear()

const rootPath = process.cwd();

const transformTsvToJSON = (dbName) => {
  const jsonFile = fs.readFileSync(`${rootPath}/internal/dataToDecode/BD\ Sitio\ DA\ -\ ${dbName}.tsv`).toString();

  const splitLines = jsonFile.replace(/\r/g, '').split('\n');

  return map(splitLines, line => line.split('\t'));
};

const createJsFileObj = ({varName, jsonObj}) => {
  const objAsString = JSON.stringify(jsonObj).toString();

  const decodedObj = `export const ${varName} = ${objAsString};`;

  fs.writeFileSync(`${rootPath}/src/data/${varName}.js`, decodedObj);
};

const statesToDecode = () => {
  const states = transformTsvToJSON('Estado');

  createJsFileObj({
    varName: 'states',
    jsonObj: expandToNodes(states),
  });
};

const categoriesToDecode = () => {
  const exceptions = transformTsvToJSON('Excepciones');
  const categories = transformTsvToJSON('Categoria');

  const decodedExceptions = expandExceptions(exceptions);
  const decodedCategories = expandToNodes(categories);
  const mergeCatExceptions = mergeCategoriesExceptions({
    categories: decodedCategories,
    exceptions: decodedExceptions,
  });

  createJsFileObj({
    varName: 'categories',
    jsonObj: mergeCatExceptions,
  });
};

const countriesToDecode = () => {
  const countries = transformTsvToJSON('Paises');

  createJsFileObj({
    varName: 'countries',
    jsonObj: expandCountries(countries),
  });
};

const glossaryToDecode = () => {
  const glossary = transformTsvToJSON('Glosario');

  createJsFileObj({
    varName: 'glossary',
    jsonObj: expandGlossary(glossary),
  });
};

const availableDecoders = {
  categories: categoriesToDecode,
  states: statesToDecode,
  countries: countriesToDecode,
  glossary: glossaryToDecode,
};

const availableDecodersKeys = Object.keys(availableDecoders);

const decodeData = (keysToDecode = availableDecodersKeys) => {
  forEach(keysToDecode, keyToDecode => {
    if (availableDecodersKeys.includes(keyToDecode)) {
      availableDecoders[keyToDecode]();

      console.log('Done, thank you :)');
    } else {
      const listOfKeys = availableDecodersKeys.toString().replace(/,/g, '\n- ');

      console.log(`${keyToDecode} is invalid.`);
      console.log(`Available keys are:\n- ${listOfKeys}`);
    }
  });
}

module.exports = {decodeData};
