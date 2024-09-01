const express = require('express');
const bodyParser = require('body-parser');
const { anonymizeMessage } = require('./anonymizer');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/anonymize', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const anonymizedMessage = anonymizeMessage(message);
    res.json({ anonymizedMessage });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
