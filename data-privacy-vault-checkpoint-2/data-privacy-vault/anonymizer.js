const crypto = require('crypto');

// Regular expressions for matching PII
const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const phoneRegex = /\b\d{10}\b/g;

/**
 * Generates a token for a given string
 * @param {string} str - The string to tokenize
 * @param {string} prefix - The prefix for the token
 * @returns {string} The generated token
 */
function generateToken(str, prefix) {
    const hash = crypto.createHash('md5').update(str).digest('hex').slice(0, 12);
    return `${prefix}_${hash}`;
}

/**
 * Anonymizes a message by replacing PII with tokens
 * @param {string} message - The message to anonymize
 * @returns {Object} An object containing the anonymized message and token map
 */
function anonymizeMessage(message) {
    let anonymized = message;
    const tokenMap = {};

    // Anonymize names
    anonymized = anonymized.replace(nameRegex, (match) => {
        const token = generateToken(match, 'NAME');
        tokenMap[token] = match;
        return token;
    });

    // Anonymize emails
    anonymized = anonymized.replace(emailRegex, (match) => {
        const token = generateToken(match, 'EMAIL');
        tokenMap[token] = match;
        return token;
    });

    // Anonymize phone numbers
    anonymized = anonymized.replace(phoneRegex, (match) => {
        const token = generateToken(match, 'PHONE');
        tokenMap[token] = match;
        return token;
    });

    return { anonymizedMessage: anonymized, tokenMap };
}

/**
 * Deanonymizes a message by replacing tokens with original PII
 * @param {string} anonymizedMessage - The anonymized message
 * @param {Object} tokenMap - The token map for deanonymization
 * @returns {string} The deanonymized message
 */
function deanonymizeMessage(anonymizedMessage, tokenMap) {
    let deanonymized = anonymizedMessage;

    for (const [token, originalValue] of Object.entries(tokenMap)) {
        deanonymized = deanonymized.replace(token, originalValue);
    }

    return deanonymized;
}

module.exports = { anonymizeMessage, deanonymizeMessage };
