# PROMPTS FOR THE DATA PRIVACY VAULT PROJECT

Here you will find the prompts to finish the project

## PROMPT 1

I am creating a Data Privacy Vault so that PII (Personally identifiable information) become anonymized using node.js. 

I need to start with the first step: have an endpoint so that it receivesa single string with a message that contains PII like names, emails and phone numbers and returns it anonymized replacing the whole name, email and phone with an alphanumeric token.

Please act as an experienced node.js developer and tell me step by step how would you do it. Ask me for information whenever you need it and use good coding practices and comments in the functions. For example, please separate the server logic and the anonymizer logic in two different files.

An example of the request can be:
curl -X POST http://localhost:3001/anonymize -H "Content-Type: application/json" -d '{"message":"oferta de trabajo para Dago Borda con email dborda@gmail.com y telefono 3152319157"}'

The response for that request would be:
{
    "anonymizedMessage": "oferta de trabajo para d7e8e0bf bd673df2 con email b09bde30 y telefono dd195b6c"
}

When creating the start script, please use nodemon so that the server is constantly listening to changes in the code.

## PROMPT 2

Thanks. Now, lets implement the deanonymize endpoint where the calling should be like this:

curl -X POST http://localhost:3001/deanonymize -H "Content-Type: application/json" -d '{"anonymizedMessage":"oferta de trabajo para NAME_b052796551d3 con email EMAIL_863f1a09e1a9 y telefono PHONE_cea88b96e4d7"}'

and should return the original message:
{"message":"oferta de trabajo para Dago Borda con email dborda@gmail.com y telefono 3152319157"}

## PROMPT 3

Amazing. Thanks for that. now I want we to add storage in a MongoDB database storing the each piece of information with its respective tokenized version.

## PROMPT 4

Great. The curl message is getting an answer with an unresolved promise. Can you help me making the answer wait before returing in the endpoint please?

## PROMPT 5

Can you please help me moving the mongo URI to an .env file and including a .gitignore file to get the project ready to be uploaded to github?

For the deanonymize it is asking for a token map, but in the initial specification I didnt ask the deanonimized message to expect a token map, Just the anonimized message string. Can you help me sove it please?