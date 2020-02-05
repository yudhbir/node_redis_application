var express = require('express');
var router = express.Router();
var users = require('../models/users');
var posts = require('../models/posts');
var comments = require('../models/comments');
var albums = require('../models/albums');
var redisClient = require('../db/cache');

/* GET users listing. */
router.get('/', function(req, res) {
	  	var obj = {
	  		"user_info":[],
		    "posting": [],		    
		    "albuming": [],
		};
		var comment={
			"Post_comment":[]
		}
	users.find({},async function(err,response){
	  	for (var i = 0; i<response.length - 1; i++) {
	  	 	let  user_info=response[i];  
	       	let posting =await posts.find({ "userId": user_info.id }).exec();	
	        let albuming = await albums.find( { "userId": user_info.id}).exec();	       	
	       obj.posting.push(posting);	      
	       obj.albuming.push(albuming);
	       obj.user_info.push(user_info);
	       
	       let flags = [];
	       for (var j = 0; j<posting.length - 1; j++) {
	       		let  post=posting[i];	       		
	       		if( flags[posting[i].id]) continue;
    				flags[posting[i].id] = true;	       		
	       	 	let p_comment = await comments.find( { "postId": post.id  } ).exec();
	       	 	comment.Post_comment.push(p_comment);
	       	 	//obj.commenting.push(comment);
	       }
	    }	
		// console.log(obj);
		res.send({object: obj, commenting: comment});
	});		
});

router.get('/test', function(req, res) {	  	
	var final_result=users.findOne({id:2
	  	// for (var i = 0; i<response.length - 1; i++) {
	  	//  	let  user_info=response[i];  
	   //     	let posting =await posts.find({ "userId": user_info.id }).exec();	
	   //      let albuming = await albums.find( { "userId": user_info.id}).exec();	       	
	   //     obj.posting.push(posting);	      
	   //     obj.albuming.push(albuming);
	   //     obj.user_info.push(user_info);
	       
	   //     let flags = [];
	   //     for (var j = 0; j<posting.length - 1; j++) {
	   //     		let  post=posting[i];	       		
	   //     		if( flags[posting[i].id]) continue;
    	// 				flags[posting[i].id] = true;	       		
	   //     	 	let p_comment = await comments.find( { "postId": post.id  } ).exec();
	   //     	 	comment.Post_comment.push(p_comment);	       	 	
	   //     }
	   //  }	
		// console.log(obj);
		// res.send({object: obj, commenting: comment});
	}).then(customers => { 
		// console.log(customers);                
	    // console.log(customers[0].name); // 'A'
	    return posts.find({ "userId": customers.id });
	}).then(posts => {   
		// console.log(posts); 
		return posts;          
	    // console.log(customers[0].name); // 'A'
	    // return albums.find({ "userId": customers.id });
	});	
	console.log(final_result);	
});
// router.get('/cache', async function(req, res) {	
// 	let posting =await posts.find({}).exec();
// 	var lookup = {};
// 	for (var obj in posting) {
// 	    lookup[posting[obj]._id] = posting[obj];
// 	}
// 	var u_info=JSON.stringify(lookup);	
// 	await redisClient.set('users',u_info);
// 	res.send(lookup);	
// });
async function get_user_info (req, res){
	let posting =await posts.find({}).exec();
	var lookup = {};
	for (var obj in posting) {
	    lookup[posting[obj]._id] = posting[obj];
	}
	var u_info=JSON.stringify(lookup);	
	await redisClient.set('users',u_info);
	res.send(lookup);
}

router.get('/user_info', async function(req, res) {	
	var user_data=redisClient.get('users',function(err, object){
		if (err) {
			res.send(err);	    
	   } 
	   if(object){
	   		var f_result=JSON.parse(object);
	   		/*Update section for the existing records*/
		   		var u_value=f_result['5d7255fbbd034596606d90d4'];
		   		u_value.title="updated successfully";
		   		f_result['5d7255fbbd034596606d90d4']=u_value;
	   		/*Update section for the existing records*/	   		
	   		res.send(f_result);	
	   }else {
	   		console.log('posts'); 
	   		get_user_info(req, res);
	   }
	});	
	
});
router.get('/delete',function(req, res){
	/*check either the key exist or not*/
	redisClient.exists("users",function (err, response) {
	  res.send({'redis_delete':response});	
	});

	/*Delete the operation for data w.r.t key*/
	redisClient.del("users",function (err, response) {
	  res.send({'redis_delete':response});	
	});

});
router.get('/key_list',function(req, res){
	redisClient.keys('*', function (err, keys) {
	  if (err) return console.log(err);
	  var arr=[];
	  for(var i = 0, len = keys.length; i < len; i++) {
	    arr.push(keys[i]);
	  }
	  res.send({'redis_keys':arr});
	});
	
});
router.get('/multiple',function(req, res){
	multi = redisClient.multi();
	multi.incr("incr thing");
	multi.incr("incr other thing");	 
	// runs immediately
	redisClient.mset("incr thing", 100, "incr other thing", 1);	 
	// drains multi queue and runs atomically
	multi.exec(function (err, replies) {
	    // console.log(replies); // 101, 2 
	    res.send({'multi-ple operation':replies});
	});
});



module.exports = router;
