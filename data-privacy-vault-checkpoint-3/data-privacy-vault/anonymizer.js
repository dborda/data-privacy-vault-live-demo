const crypto = require('crypto');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection string from environment variable
const mongoURI = process.env.MONGO_URI;
const dbName = 'data_privacy_vault';
const collectionName = 'pii_tokens';

let client;

// Regular expressions for matching PII
const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const phoneRegex = /\b\d{10}\b/g;

async function connectToMongo() {
    if (!client) {
        client = new MongoClient(mongoURI);
        await client.connect();
    }
    return client.db(dbName).collection(collectionName);
}

async function generateToken(str, prefix) {
    const hash = crypto.createHash('md5').update(str).digest('hex').slice(0, 12);
    const token = `${prefix}_${hash}`;
    
    const collection = await connectToMongo();
    await collection.updateOne(
        { original: str },
        { $set: { token: token, type: prefix } },
        { upsert: true }
    );
    
    return token;
}

async function anonymizeMessage(message) {
    const tokenMap = {};

    // Function to replace matches asynchronously
    async function replaceAsync(str, regex, asyncFn) {
        const promises = [];
        str.replace(regex, (match, ...args) => {
            const promise = asyncFn(match, ...args);
            promises.push(promise);
        });
        const data = await Promise.all(promises);
        return str.replace(regex, () => data.shift());
    }

    // Anonymize names
    let anonymized = await replaceAsync(message, nameRegex, async (match) => {
        const token = await generateToken(match, 'NAME');
        tokenMap[token] = match;
        return token;
    });

    // Anonymize emails
    anonymized = await replaceAsync(anonymized, emailRegex, async (match) => {
        const token = await generateToken(match, 'EMAIL');
        tokenMap[token] = match;
        return token;
    });

    // Anonymize phone numbers
    anonymized = await replaceAsync(anonymized, phoneRegex, async (match) => {
        const token = await generateToken(match, 'PHONE');
        tokenMap[token] = match;
        return token;
    });

    return { anonymizedMessage: anonymized, tokenMap };
}

async function deanonymizeMessage(anonymizedMessage) {
    let deanonymized = anonymizedMessage;
    const collection = await connectToMongo();

    const tokenRegex = /(NAME|EMAIL|PHONE)_[a-f0-9]{12}/g;
    const tokens = anonymizedMessage.match(tokenRegex) || [];

    for (const token of tokens) {
        const result = await collection.findOne({ token: token });
        if (result && result.original) {
            deanonymized = deanonymized.replace(token, result.original);
        }
    }

    return deanonymized;
}

async function closeMongoConnection() {
    if (client) {
        await client.close();
        client = null;
    }
}

module.exports = { anonymizeMessage, deanonymizeMessage, closeMongoConnection };
