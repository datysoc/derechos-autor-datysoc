const { decodeData } = require('./decoders');

/*
 * To call this function pass an array with the
 * database object you want to parse.
 * 
 * Available keys are:
 * - categories
 * - states
 * - countries
 * - glossary
 * 
 * Example:
 * decodeData(['states']);
 * decodeData(['states', 'countries']);
 * 
 * If you want to parse everything execute with no params
 * decodeData();
 */
decodeData();