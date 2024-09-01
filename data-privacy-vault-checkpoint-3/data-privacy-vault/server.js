const express = require('express');
const bodyParser = require('body-parser');
const { anonymizeMessage, deanonymizeMessage, closeMongoConnection } = require('./anonymizer');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/anonymize', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const { anonymizedMessage, tokenMap } = await anonymizeMessage(message);
        res.json({ anonymizedMessage, tokenMap });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during anonymization' });
    }
});

app.post('/deanonymize', async (req, res) => {
    const { anonymizedMessage } = req.body;
    
    if (!anonymizedMessage) {
        return res.status(400).json({ error: 'Anonymized message is required' });
    }

    try {
        const message = await deanonymizeMessage(anonymizedMessage);
        res.json({ message });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during deanonymization' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await closeMongoConnection();
    process.exit(0);
});
