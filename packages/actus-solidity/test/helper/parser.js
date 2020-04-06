const web3Utils = require('web3-utils');
const BigNumber = require('bignumber.js');

const ACTUSDictionary = require('actus-dictionary/actus-dictionary.json');

const Terms = require('./definitions/Terms.json');
const LifecycleTerms = require('./definitions/LifecycleTerms.json');
const GeneratingTerms = require('./definitions/GeneratingTerms.json');

const PRECISION = 18; // solidity precision


const isoToUnix = (date) => {
  return (new Date(date + 'Z')).getTime() / 1000;
}

const unixToISO = (unix) => {
  return new Date(unix * 1000).toISOString();
}

const toHex = (value) => {  
  return web3Utils.asciiToHex(value);
}

const getIndexOfAttribute = (attribute, value) => {
  if (attribute === 'contractType') {
    if (value === 'PAM') return 0;
    if (value === 'ANN') return 1;
    if (value === 'CEG') return 16;
    if (value === 'CEC') return 17;
  }

  if (ACTUSDictionary.terms[attribute] == undefined) { throw new Error('Unknown attribute provided.')}
  const allowedValues = ACTUSDictionary.terms[attribute].allowedValues.find((allowedValue) => allowedValue.acronym === value);
  if (allowedValues == undefined) { console.log(attribute); throw new Error('No index found for attribute.'); }

  return Number(allowedValues.option);
}

const getIndexForEventType = (eventType) => {
  if (eventType === 'AD') return 0;

  const event = Object.values(ACTUSDictionary.event.eventType.allowedValues).find((event) => event.acronym === eventType);
  if (event == undefined) { console.log(eventType); throw new Error('Unknown event type provided.'); }

  return event.sequence;
}

const toPrecision = (value) => {
  return (new BigNumber(value).shiftedBy(PRECISION)).toFixed();
}

const fromPrecision = (value) => {
  return (new BigNumber(value).shiftedBy(-PRECISION).toNumber());
}

const roundToDecimals = (value, decimals) => {
  decimals = (decimals > 2) ? (decimals - 2) : decimals;
  // console.log(value, decimals, numberOfDecimals(value));
 
  const roundedValue = Number(BigNumber(value).decimalPlaces(decimals));
  const decimalDiff = decimals - numberOfDecimals(roundedValue);

  if (decimalDiff > 0) {
    // return Number(String(value).substring(0, String(value).length - (numberOfDecimals(value) - decimals)));  
    return Number(value.toFixed(decimals));
  }

  return roundedValue; 
}

const numberOfDecimals = (number) => {
  return (String(number).split('.')[1] || []).length;
}

const parseCycleToIPS = (cycle) => {
  if (!cycle || cycle === '') { return { i: 0, p: 0, s: 0, isSet: false }; }

  const pOptions = ['D', 'W', 'M', 'Q', 'H', 'Y'];

  let i = String(cycle).slice(0, -2);
  let p = pOptions.indexOf(String(cycle).slice(-2, -1));
  let s = (String(cycle).slice(-1) === '+') ? 0 : 1;

  return { i: i, p: p, s: s, isSet: true };
}

const parsePeriodToIP = (period) => {
  if (!period  || period === '') { return { i: 0, p: 0, isSet: false }; }

  const pOptions = ['D', 'W', 'M', 'Q', 'H', 'Y'];

  let i = String(cycle).slice(0, -2);
  let p = pOptions.indexOf(String(cycle).slice(-2, -1));

  return { i: i, p: p, isSet: true };
}

const parseTermsFromObject = (terms) => {
  const parsedTerms = {};

  for (const attribute of Terms) {
    const value = terms[attribute];

    if (attribute === 'contractReference_1' || attribute === 'contractReference_2') {
      parsedTerms[attribute] = { object: toHex(''), _type: 0, role: 0 };
    } else if (ACTUSDictionary.terms[attribute].type === 'Enum' || ACTUSDictionary.terms[attribute].type === 'Enum[]') {
      parsedTerms[attribute] = (value) ? getIndexOfAttribute(attribute, value) : 0;
    } else if (ACTUSDictionary.terms[attribute].type === 'Varchar') {
      parsedTerms[attribute] = toHex((value) ? value : '');
    } else if (ACTUSDictionary.terms[attribute].type === 'Real') {
      parsedTerms[attribute] = (value) ? toPrecision(value) : 0;
    } else if (ACTUSDictionary.terms[attribute].type === 'Timestamp') {
      parsedTerms[attribute] = (value) ? isoToUnix(value) : 0;
    } else if (ACTUSDictionary.terms[attribute].type === 'Cycle') {
      parsedTerms[attribute] = parseCycleToIPS(value);
    } else if (ACTUSDictionary.terms[attribute].type === 'Period') {
      parsedTerms[attribute] = parsePeriodToIP(value);
    }
  }

  parsedTerms['currency'] = '0x0000000000000000000000000000000000000000';
  parsedTerms['settlementCurrency'] = '0x0000000000000000000000000000000000000000';

  return parsedTerms;
}

const parseResultsFromObject = (schedule) => {  
  const parsedResults = [];

  for (const event of schedule) {
    const eventTypeIndex = getIndexForEventType(event['eventType']);

    if (eventTypeIndex === 0) { continue; } // filter out AD events
    parsedResults.push({
      eventDate: new Date(event['eventDate'] + 'Z').toISOString(),
      eventType: eventTypeIndex.toString(),
      eventValue: Number(event['eventValue']),
      notionalPrincipal: Number(event['notionalPrincipal']),
      nominalInterestRate: Number(event['nominalInterestRate']),
      accruedInterest: Number(event['accruedInterest']),
    });
  }

  return parsedResults;
}

function parseToTestEvent (eventType, eventTime, payoff, state) {
  return {
    eventDate: unixToISO(eventTime),
    eventType: String(eventType),
    eventValue: fromPrecision(payoff),
    notionalPrincipal: fromPrecision(state['notionalPrincipal']),
    nominalInterestRate: fromPrecision(state['nominalInterestRate']),
    accruedInterest: fromPrecision(state['accruedInterest']),
  };
}

function parseTermsToLifecycleTerms (terms) {
  const lifecycleTerms = {};

  for (const attribute of LifecycleTerms) {
    lifecycleTerms[attribute] = terms[attribute];
  }

  return lifecycleTerms;
}

function parseTermsToGeneratingTerms (terms) {
  const generatingTerms = {};

  for (const attribute of GeneratingTerms) {
    generatingTerms[attribute] = terms[attribute];
  }

  return generatingTerms;
}

module.exports = { 
  parseTermsFromObject, 
  parseResultsFromObject, 
  parseToTestEvent,
  parseTermsToLifecycleTerms,
  parseTermsToGeneratingTerms,
  fromPrecision, 
  unixToISO, 
  roundToDecimals, 
  numberOfDecimals
}
