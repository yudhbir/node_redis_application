var redis = require('redis');
var redisClient = redis.createClient({host : '127.0.0.1', port : 6379});
// const host="redis-19994.c13.us-east-1-3.ec2.cloud.redislabs.com";
// var redisClient = redis.createClient({host : host, port : 19994,password:'t3zqb76Lks7G0kTVUqRzyHltLqsduqFr'});

redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function(err) {
 console.log("Error in Redis");
 console.log(err);
});

module.exports=redisClient;