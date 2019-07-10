# node-cb-docker-helloworld
node-cb-docker-helloworld is a dockerized hello world app using node & couchbase to insert 10k documents into couchbase and supply /test-data endpoint to retrieve a single document using a key

## Installation

1. Download [Docker Desktop](https://hub.docker.com/?overlay=onboarding/)
2. Run your couchbase container with the first docker command below and configure your [server](https://docs.couchbase.com/server/current/getting-started/look-at-the-results.html)
3. Login to the admin at http://localhost:8091
4. Create a new bucket called "subscribers"
5. Add a new user to the bucket and make note of the credentials you create
6. Execute the remaining docker commands.
7. Be sure to update the credentials with your Couchbase bucket user credentials after you have created the couchbase container
and added a user account to your bucket.
Note: See Docker Cheatsheet below if you need help with commands

```bash
docker run -t --name db -p 8091-8094:8091-8094 -p 11210:11210 couchbase/server-sandbox:6.0.0
docker build -t nodejs-custom .
docker run -d -p 3000:3000 -e COUCHBASE_HOST=172.17.0.2 -e COUCHBASE_BUCKET=subscribers -e COUCHBASE_BUCKET_USERNAME=your_username -e COUCHBASE_BUCKET_PASSWORD="your secure password" -e APPLICATION_PORT=3000 --name nodejs nodejs-custom
```

## Usage

The container will insert 10,000 rows of randomly generated ids (and subscriberIds) as well as segments when the container is run.
@todo: Check for existing rows before creating more

## Docker Cheatsheet
[Containerization - Docker & K8](https://www.evernote.com/l/AhZMD8tIUKRK2obD6glxK2NdZZSmoviSp1s)