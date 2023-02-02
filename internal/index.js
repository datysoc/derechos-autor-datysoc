import { decodeData } from "./decoders/index.js";

/*
 * To call this function pass an array with the
 * database object you want to parse.
 *
 * Available keys are:
 * - categories
 * - states
 * - countries
 * - glossary
 * - isLegalKeys
 * - isLegalCases
 *
 * Example:
 * decodeData(['states']);
 * decodeData(['states', 'countries']);
 *
 * If you want to parse everything execute with no params
 * decodeData();
 */
decodeData();
