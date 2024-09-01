# Data Privacy Vault

Data Privacy Vault is a Node.js application that provides a simple API for anonymizing and deanonymizing sensitive information in messages. It uses a MongoDB database to store and retrieve anonymized data securely.

## Features

- Anonymize personally identifiable information (PII) in messages
- Deanonymize previously anonymized messages
- Secure storage of original and anonymized data in MongoDB
- Support for anonymizing names, email addresses, and phone numbers

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/data-privacy-vault.git
   cd data-privacy-vault
   ```

2. Start with an empty project and call it data-privacy-vault-demo. Follow the prompts to reach each step in the process. If something fails during the live demo, jump into the next working checkpoint. Here are the checkpoints:
    2.1. - Checkpoint 1: Project working with the anonymize endpoint
    2.2. - Checkpoint 2: Project working with the deanonymize endpoint
    3.3. - Checkpoint 3: Project working with mongodb storage, .env file to store the mongo uri and .gitignore

    When you reach checkpoint 3, dont forget to change the uri in the env file

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```
   npm start
   ```

The server will start running on `http://localhost:3001`.

## Usage

### Anonymize a message

Send a POST request to `/anonymize` with a JSON body containing the message to anonymize. Here is an example with curl

```
curl -X POST http://localhost:3001/anonymize -H "Content-Type: application/json" -d '{"message":"oferta de trabajo para Dago Borda con email d@gmail.com y telefono 3214863218"}'
```

and the deanonymize would be

```
curl -X POST http://localhost:3001/deanonymize -H "Content-Type: application/json" -d '{"anonymizedMessage":"oferta de trabajo para NAME_b052796551d3 con email EMAIL_863f1a09e1a9 y telefono PHONE_cea88b96e4d7"}'
```