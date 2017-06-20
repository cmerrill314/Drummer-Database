/*
Christopher Merrill 
CS340
Final Project: Drummer Database

Description: This file contains all of the server side interations for the Drummer 
Database web page.

Sources: All of the routes are based off the routes in the CS290 course lectures
by Justin Wolford, but they have been modified for this specific database.
*/

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

//Create a new pool
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs290_merrillc',
  password: '2710',
  database: 'cs290_merrillc'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8495);

//Render home.handlebars when the user visits the page
app.get('/',function(req,res){
  res.render('home');
});

/* ----------------------------------------------------------------------------------
SELECT FUNCTIONS 
---------------------------------------------------------------------------------- */ 

//This allows the user to view the current status of the brand table
app.get('/select-brand', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM brand', function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to view the current status of the drum kit table
app.get('/select-drum_kit', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM drum_kit', function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to view the current status of the stick table
app.get('/select-stick', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM stick', function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to view the current status of the drummer table
app.get('/select-drummer', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM drummer', function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to view the current status of the plays table
app.get('/select-plays', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM plays', function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to search drum kits by drummer name
app.get('/select-kit-by-drummer', function(req, res, next) {
	var context = {};
	pool.query('SELECT drummer.name, brand.name, drum_kit.pieces, drum_kit.cymbal_type FROM drummer INNER JOIN plays ON drummer.drummer_id = plays.drummer_id INNER JOIN drum_kit ON plays.kit_id = drum_kit.kit_id INNER JOIN brand ON drum_kit.brand_id = brand.brand_id WHERE drummer.name = ?', [req.query.name] ,function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to search drummers by drummer kits
app.get('/select-drummer-by-kit', function(req, res, next) {
	var context = {};
	pool.query('SELECT drummer.name, drummer.band, drummer.hometown FROM drummer INNER JOIN plays ON drummer.drummer_id = plays.drummer_id INNER JOIN drum_kit ON plays.kit_id = drum_kit.kit_id WHERE drum_kit.kit_id = ?', [req.query.id] ,function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to search the brands that a drummer uses
app.get('/select-brand-by-drummer', function(req, res, next) {
	var context = {};
	pool.query('(SELECT brand.name, brand.founder, brand.country_of_origin, brand.year_established FROM brand INNER JOIN drum_kit ON brand.brand_id = drum_kit.brand_id INNER JOIN plays ON drum_kit.kit_id = plays.kit_id INNER JOIN drummer ON drummer.drummer_id = plays.drummer_id WHERE drummer.name = ?) UNION (SELECT brand.name, brand.founder, brand.country_of_origin, brand.year_established FROM brand INNER JOIN stick ON brand.brand_id = stick.brand_id INNER JOIN drummer ON drummer.stick_id = stick.stick_id WHERE drummer.name = ?)', [req.query.name1, req.query.name2] ,function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to search the drummers who use a certain brand
app.get('/select-drummer-by-brand', function(req, res, next) {
	var context = {};
	pool.query('(SELECT drummer.name, drummer.band, drummer.hometown FROM drummer INNER JOIN plays ON drummer.drummer_id = plays.drummer_id INNER JOIN drum_kit ON plays.kit_id = drum_kit.kit_id INNER JOIN brand ON drum_kit.brand_id = brand.brand_id WHERE brand.brand_id = ?) UNION (SELECT drummer.name, drummer.band, drummer.hometown FROM drummer INNER JOIN stick ON drummer.stick_id = stick.stick_id INNER JOIN brand ON stick.brand_id = brand.brand_id WHERE brand.brand_id = ?)', [req.query.id1, req.query.id2] ,function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to search the sticks that a drummer uses
app.get('/select-stick-by-drummer', function(req, res, next) {
	var context = {};
	pool.query('SELECT brand.name, stick.type FROM stick INNER JOIN drummer ON drummer.stick_id = stick.stick_id INNER JOIN brand ON stick.brand_id = brand.brand_id WHERE drummer.name = ?', [req.query.name] ,function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to search the drummers who use a certain stick type
app.get('/select-drummer-by-stick', function(req, res, next) {
	var context = {};
	pool.query('SELECT drummer.name, drummer.band, drummer.hometown FROM drummer INNER JOIN stick ON drummer.stick_id = stick.stick_id WHERE stick.stick_id = ?', [req.query.id] ,function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

/* ----------------------------------------------------------------------------------
INSERT FUNCTIONS 
---------------------------------------------------------------------------------- */ 

//This allows the user to add a new brand to the database
app.get('/insert-brand', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO brand (`name`, `founder`, `country_of_origin`, `year_established`) VALUES (?, ?, ?, ?)", [req.query.name, req.query.founder, req.query.country_of_origin, req.query.year_established], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "Row Inserted";
		res.send(context.results);  
	});
});

//This allows the user to add a new drum kit to the database
app.get('/insert-drum-kit', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO drum_kit (`brand_id`, `pieces`, `cymbal_type`) VALUES (?, ?, ?)", [req.query.brand_id, req.query.pieces, req.query.cymbal_type], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "Row Inserted";
		res.send(context.results);  
	});
});

//This allows the user to add a new stick to the database
app.get('/insert-stick', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO stick (`type`, `brand_id`) VALUES (?, ?)", [req.query.type, req.query.brand_id], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "Row Inserted";
		res.send(context.results);  
	});
});

//This allows the user to add a new drummer to the database
app.get('/insert-drummer', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO drummer (`name`, `hometown`, `band`, `stick_id`) VALUES (?, ?, ?, ?)", [req.query.name, req.query.hometown, req.query.band, req.query.stick_id], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "Row Inserted";
		res.send(context.results); 
	});
});	
	
//This allows the user to add a new plays relationship between a drummer and a drum kit
app.get('/insert-plays', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO plays (`drummer_id`, `kit_id`) VALUES (?, ?)", [req.query.drummer_id, req.query.kit_id], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "Row Inserted";
		res.send(context.results);  
	});
});

/* ----------------------------------------------------------------------------------
UPDATE FUNCTION
---------------------------------------------------------------------------------- */ 
//This allows the user to update an existing row in the database
app.get('/update',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM drummer WHERE drummer_id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query("UPDATE drummer SET name=?, hometown=?, band=?, stick_id=? WHERE drummer_id=? ",
        [req.query.name, req.query.hometown, req.query.band, req.query.stick_id, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Row Updated";
        res.send(context.results); 
      });
    }
  });
});


/* ----------------------------------------------------------------------------------
DELETE FUNCTIONS 
---------------------------------------------------------------------------------- */ 

//This allows the user to delete a row in the brand table
app.get('/delete-brand',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM brand WHERE brand_id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Row Deleted";
	res.send(context.results);  
  });
});

//This allows the user to delete a row in the drum kit table
app.get('/delete-drum_kit',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM drum_kit WHERE kit_id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Row Deleted";
	res.send(context.results);  
  });
});

//This allows the user to delete a row in the stick table
app.get('/delete-stick',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM stick WHERE stick_id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Row Deleted";
	res.send(context.results);  
  });
});

//This allows the user to delete a row in the drummer table
app.get('/delete-drummer',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM drummer WHERE drummer_id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Row Deleted";
	res.send(context.results);  
  });
});

//This allows the user to delete a row in the drummer table
app.get('/delete-plays',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM plays WHERE drummer_id=? AND kit_id=?", [req.query.drummer_id, req.query.kit_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Row Deleted";
	res.send(context.results);  
  });
});



/* ----------------------------------------------------------------------------------
ERROR MESSAGES AND NOTIFICATIONS
---------------------------------------------------------------------------------- */ 

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});