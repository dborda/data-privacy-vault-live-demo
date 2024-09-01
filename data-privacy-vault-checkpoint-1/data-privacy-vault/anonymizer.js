const crypto = require('crypto');

// Regular expressions for matching PII
const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const phoneRegex = /\b\d{10}\b/g;

/**
 * Generates a token for a given string
 * @param {string} str - The string to tokenize
 * @returns {string} The generated token
 */
function generateToken(str) {
    return crypto.createHash('md5').update(str).digest('hex').slice(0, 8);
}

/**
 * Anonymizes a message by replacing PII with tokens
 * @param {string} message - The message to anonymize
 * @returns {string} The anonymized message
 */
function anonymizeMessage(message) {
    let anonymized = message;

    // Anonymize names
    anonymized = anonymized.replace(nameRegex, (match) => generateToken(match));

    // Anonymize emails
    anonymized = anonymized.replace(emailRegex, (match) => generateToken(match));

    // Anonymize phone numbers
    anonymized = anonymized.replace(phoneRegex, (match) => generateToken(match));

    return anonymized;
}

module.exports = { anonymizeMessage };
