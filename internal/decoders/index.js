import fs from "fs";
import lodash from "lodash";
import { expandToNodes } from "./decodeToJson.js";
import {
  expandExceptions,
  mergeCategoriesExceptions,
} from "./decodeExceptions.js";
import { expandCountries } from "./decodeCountries.js";
import { expandGlossary } from "./decodeGlossary.js";
import { expandIsLegalKeys, expandIsLegalCases } from "./decodeIsLegalKeys.js";

const { forEach, map } = lodash;

console.clear();

const rootPath = process.cwd();

const dbDA = "Data Base Sitio DA - ";
const dbIsLegal = "Es legal - Base de Datos - ";

const transformTsvToJSON = (dbName, projectName = dbDA) => {
  const jsonFile = fs
    .readFileSync(
      `${rootPath}/internal/dataToDecode/${projectName}${dbName}.tsv`
    )
    .toString();

  const splitLines = jsonFile.replace(/\r/g, "").split("\n");

  return map(splitLines, (line) => line.split("\t"));
};

const createJsFileObj = ({ varName, jsonObj }) => {
  const objAsString = JSON.stringify(jsonObj).toString();

  const decodedObj = `export const ${varName} = ${objAsString};`;

  fs.writeFileSync(`${rootPath}/src/data/${varName}.js`, decodedObj);
};

const statesToDecode = () => {
  const states = transformTsvToJSON("Estado");

  createJsFileObj({
    varName: "states",
    jsonObj: expandToNodes(states),
  });
};

const categoriesToDecode = () => {
  const exceptions = transformTsvToJSON("Excepciones");
  const categories = transformTsvToJSON("Categoria");

  const decodedExceptions = expandExceptions(exceptions);
  const decodedCategories = expandToNodes(categories);
  const mergeCatExceptions = mergeCategoriesExceptions({
    categories: decodedCategories,
    exceptions: decodedExceptions,
  });

  createJsFileObj({
    varName: "categories",
    jsonObj: mergeCatExceptions,
  });
};

const countriesToDecode = () => {
  const countries = transformTsvToJSON("Paises");

  createJsFileObj({
    varName: "countries",
    jsonObj: expandCountries(countries),
  });
};

const glossaryToDecode = () => {
  const glossary = transformTsvToJSON("Glosario");

  createJsFileObj({
    varName: "glossary",
    jsonObj: expandGlossary(glossary),
  });
};

const isLegalCasesToDecode = () => {
  const isLegalCases1 = transformTsvToJSON("categoria_1", dbIsLegal);
  const isLegalCases2 = transformTsvToJSON("categoria_2", dbIsLegal);
  const isLegalCases3 = transformTsvToJSON("categoria_3", dbIsLegal);

  const cases1 = expandIsLegalCases(isLegalCases1);
  const cases2 = expandIsLegalCases(isLegalCases2);
  const cases3 = expandIsLegalCases(isLegalCases3);

  createJsFileObj({
    varName: "isLegalCases",
    jsonObj: [cases1, cases2, cases3],
  });

  // let's create countriesList file
  const countriesList = map(cases1.useCases[0].countries, (country) => ({
    id: country.id,
    name: country.name,
  }));

  createJsFileObj({
    varName: "countriesList",
    jsonObj: countriesList,
  });
};

const isLegalKeysToDecode = () => {
  const isLegalKeys = transformTsvToJSON("claves_texto", dbIsLegal);

  createJsFileObj({
    varName: "isLegalKeys",
    jsonObj: expandIsLegalKeys(isLegalKeys),
  });
};

const availableDecoders = {
  categories: categoriesToDecode,
  states: statesToDecode,
  countries: countriesToDecode,
  glossary: glossaryToDecode,
  isLegalKeys: isLegalKeysToDecode,
  isLegalCases: isLegalCasesToDecode,
};

const availableDecodersKeys = Object.keys(availableDecoders);

export const decodeData = (keysToDecode = availableDecodersKeys) => {
  forEach(keysToDecode, (keyToDecode) => {
    if (availableDecodersKeys.includes(keyToDecode)) {
      availableDecoders[keyToDecode]();

      console.log("Done, thank you :)");
    } else {
      const listOfKeys = availableDecodersKeys.toString().replace(/,/g, "\n- ");

      console.log(`${keyToDecode} is invalid.`);
      console.log(`Available keys are:\n- ${listOfKeys}`);
    }
  });
};
