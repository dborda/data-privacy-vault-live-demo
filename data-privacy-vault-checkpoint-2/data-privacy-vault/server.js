const express = require('express');
const bodyParser = require('body-parser');
const { anonymizeMessage, deanonymizeMessage } = require('./anonymizer');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/anonymize', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const { anonymizedMessage, tokenMap } = anonymizeMessage(message);
    res.json({ anonymizedMessage, tokenMap });
});

app.post('/deanonymize', (req, res) => {
    const { anonymizedMessage, tokenMap } = req.body;
    
    if (!anonymizedMessage || !tokenMap) {
        return res.status(400).json({ error: 'Anonymized message and token map are required' });
    }

    const message = deanonymizeMessage(anonymizedMessage, tokenMap);
    res.json({ message });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
