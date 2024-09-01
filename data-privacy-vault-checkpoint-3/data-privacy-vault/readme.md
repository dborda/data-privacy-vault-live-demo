# Data Privacy Vault

Data Privacy Vault is a Node.js application that provides a simple API for anonymizing and deanonymizing sensitive information in messages. It uses a MongoDB database to store and retrieve anonymized data securely.

## Features

- Anonymize personally identifiable information (PII) in messages
- Deanonymize previously anonymized messages
- Secure storage of original and anonymized data in MongoDB
- Support for anonymizing names, email addresses, and phone numbers

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/data-privacy-vault.git
   cd data-privacy-vault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start running on `http://localhost:3001`.

## Usage

### Anonymize a message

Send a POST request to `/anonymize` with a JSON body containing the message to anonymize:

```
curl -X POST http://localhost:3001/anonymize -H "Content-Type: application/json" -d '{"message":"oferta de trabajo para Dago Borda con email dborda@gmail.com y telefono 3152319157"}'
```

### Deanonymize a message

Send a POST request to `/deanonymize` with a JSON body containing the anonymized message:

```
curl -X POST http://localhost:3001/deanonymize -H "Content-Type: application/json" -d '{"anonymizedMessage":"oferta de trabajo para NAME_b052796551d3 con email EMAIL_863f1a09e1a9 y telefono PHONE_cea88b96e4d7"}'
```

## Security Considerations

- Ensure that your MongoDB instance is properly secured and not publicly accessible.
- Use HTTPS in production to encrypt data in transit.
- Implement proper access controls and authentication for the API in a production environment.

## License

This project is licensed under the ISC License.
