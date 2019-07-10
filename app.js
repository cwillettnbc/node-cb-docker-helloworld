var Couchbase = require("couchbase");
var Express = require("express");
var BodyParser = require("body-parser");
var UUID = require("uuid");

var app = Express();

var cluster = new Couchbase.Cluster('couchbase://' + process.env.COUCHBASE_HOST);
cluster.authenticate(process.env.COUCHBASE_BUCKET_USERNAME, process.env.COUCHBASE_BUCKET_PASSWORD);
var bucket = cluster.openBucket(process.env.COUCHBASE_BUCKET);
bucket.operationTimeout = 120 * 1000;

app.use(BodyParser.json());

for(var x = 0; x < 10000; x++) {

  var subscriberId = [...Array(36)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
  var segments = [...Array(16)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
  var payload = {"subscriberId": subscriberId, "doc_type": "subscriber", "segments": segments};

  bucket.insert(subscriberId, payload, function(error, result) {
    if(error) {
        return response.status(500).send(error);
    }
    console.log(result);
  });

}

app.get("/", function(request, response) {
    response.send("Try using the `/test-data/:id` endpoint!");
});

app.get("/test-data/:subscriber_id", function(request, response) {
  var sid = request.params.subscriber_id;
  bucket.get(sid, function(err, result) {
    if (err) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.post("/save", function(request, response) {
    bucket.insert(UUID.v4(), request.body, function(error, result) {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

var server = app.listen(process.env.APPLICATION_PORT || 3000, function() {
    console.log("Listening on port " + server.address().port + "...");
});