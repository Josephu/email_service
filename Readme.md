# Email Delivery Service

This service provides endpoint to send email.

The aim is to provide a simple and robust service that will try it's best to deliver.

At the moment, there is no way to track the status of the email from API.

## Start app
```
# Provide environment
docker-compose up

# Prepare packages and run build
npm install

# Start app
npm run start
```

## Try API out through swagger
http://13.236.179.166/docs

## Run test
```
npm run test
```

## Deploy
```
./deploy.sh # Require ssh key
```

## TODO
- email validation
- a better error description for bad formats input
- introduce CI for automated deployment, so no ssh key is needed
- would be nice to connect to some logging service for better health monitoring
- would be nice to monitor redis queue
- may introduce database for checking email record
