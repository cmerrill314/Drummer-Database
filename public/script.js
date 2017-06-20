/*
Christopher Merrill 
CS340
Final Project: Drummer Database

Description: This file contains all of the client side interations for the Drummer 
Database web page.

Sources: All of the HTTP requests are based off of the CS290 course lectures
by Justin Wolford, but they have been modified for this specific database.
*/

//Load the page contents and bind buttons when DOM content is loaded
document.addEventListener('DOMContentLoaded', loadContents); 
document.addEventListener('DOMContentLoaded', bindButtons); 

//Set the port value
var port = "8495"; 

/* ---------------------------------------------------------------------------------------------
                                    loadContents

Updates the page when DOM contents loads. First it updates each of the data tables, then all of 
the drop down menus.
-----------------------------------------------------------------------------------------------*/ 
function loadContents(){
	//Load all of the table contents when the page loads
	updateTable("brand");
	updateTable("drum_kit");  
	updateTable("stick");
	updateTable("drummer");
	updateTable("plays");
	//Update all drop down menu values when the page loads
	updateDropDowns();
}

/* ---------------------------------------------------------------------------------------------
                                    updateDropDowns

Updates each type of drop down menu with the current database contents. It is called whenever
an item is added or removed from a table. 
-----------------------------------------------------------------------------------------------*/ 
function updateDropDowns() {
	//Update each type of drop down menu with the current database contents
	updateStickDropDowns();
	updateBrandDropDowns();
	updateDrummerDropDowns();
	updateKitDropDowns();
}

/* ---------------------------------------------------------------------------------------------
                                    bindButtons

This function contains all of the form submit buttons throughout the entire page.
-----------------------------------------------------------------------------------------------*/ 
function bindButtons(){	

	/* ---------------------------------------------------------------------------------------------
                                    Add Brand Function

	This function allows the user to add an item to the brand table by sending a server request that
	runs an INSERT query.
	-----------------------------------------------------------------------------------------------*/ 
	document.getElementById('add_brand').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var name = document.getElementById('brand_name').value; 
		var founder = document.getElementById('brand_founder').value;  
		var country = document.getElementById('brand_country_of_origin').value; 
		var year = document.getElementById('brand_year_established').value; 
		
		if (name != "" && founder != "" && country != "" && year != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest(); 
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/insert-brand?" + "name=" + name + "&founder=" + founder + "&country_of_origin=" + country + "&year_established=" + year; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					
					//Update the table
					updateTable("brand"); 
					
					//Update drop down menus associated with brands
					updateBrandDropDowns();
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to add, this brand already exists. Brand names must be unique!");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to add. Make sure to populate ALL fields before submitting a new value.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Add Drum Kit Function

	This function allows the user to add an item to the drum kit table by sending a server request that
	runs an INSERT query.
	-----------------------------------------------------------------------------------------------*/ 
	document.getElementById('add_drum_kit').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var brand_id = document.getElementById('kit_brand_id').value; 
		var pieces = document.getElementById('kit_pieces').value;  
		var cymbal_type = document.getElementById('kit_cymbal_type').value; 
		
		if(brand_id != "" && pieces != "" && cymbal_type != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();  
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/insert-drum-kit?" + "brand_id=" + brand_id + "&pieces=" + pieces + "&cymbal_type=" + cymbal_type; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					
					//Update the table
					updateTable("drum_kit"); 
					
					//Update drop downs that reference drum kits
					updateKitDropDowns();
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to add, this drum kit already exists. The combination of brand, pieces and cymbal type must be unique!");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to add. Make sure to populate ALL fields before submitting a new value.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Add Stick Function

	This function allows the user to add an item to the stick table by sending a server request that
	runs an INSERT query.
	-----------------------------------------------------------------------------------------------*/ 
	document.getElementById('add_stick').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var brand_id = document.getElementById('stick_brand_id').value;  
		var type = document.getElementById('stick_type').value; 
		
		if (brand_id != "" && type != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest(); 
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/insert-stick?" + "type=" + type + "&brand_id=" + brand_id; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					
					//Update the table
					updateTable("stick"); 
					
					//Update Drop Down Menus with New Value
					updateStickDropDowns();
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to add, this stick type already exists. The combination of brand and stick type must be unique!");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to add. Make sure to populate ALL fields before submitting a new value.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Add Drummer Function

	This function allows the user to add an item to the drummer table by sending a server request that
	runs an INSERT query.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('add_drummer').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var name = document.getElementById('drummer_name').value;  
		var hometown = document.getElementById('drummer_hometown').value; 
		var band = document.getElementById('drummer_band').value; 
		var stick_id = document.getElementById('drummer_stick_id').value; 
		
		if (name != "" && hometown != "" && band != "" && stick_id != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();  

			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/insert-drummer?" + "name=" + name + "&hometown=" + hometown + "&band=" + band + "&stick_id=" + stick_id; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					
					//Update the table
					updateTable("drummer"); 
					
					//Update drop downs that reference drummers
					updateDrummerDropDowns();
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to add, this drummer already exists. Drummer names must be unique!");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to add. Make sure to populate ALL fields before submitting a new value.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Add Plays Function

	This function allows the user to add an item to the plays table by sending a server request that
	runs an INSERT query.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('add_plays').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var drummer_id = document.getElementById('plays_drummer_id').value;  
		var kit_id = document.getElementById('plays_kit_id').value; 
		
		if (drummer_id != "" && kit_id != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/insert-plays?" + "drummer_id=" + drummer_id + "&kit_id=" + kit_id; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					
					//Update the table
					updateTable("plays"); 
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to add, this plays relationship already exists. The combination of drummer ID and kit ID must be unique!");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to add. Make sure to populate ALL fields before submitting a new value.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Update Drummer Function

	This function allows the user to change an item in the drummer table by sending a server request that
	runs an UPDATE query.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('update_drummer').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var id = document.getElementById('update_drummer_id').value;
		var name = document.getElementById('update_name').value;  
		var hometown = document.getElementById('update_hometown').value; 
		var band = document.getElementById('update_band').value; 
		var stick_id = document.getElementById('update_stick_id').value; 
		
		if (name != "" && stick_id != "" && hometown != "" && band != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/update?" + "name=" + name + "&hometown=" + hometown + "&band=" + band + "&stick_id=" + stick_id + "&id=" + id;  
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					
					//Update the table
					updateTable("drummer"); 
					
					//Update any drummer drop down menus
					updateDrummerDropDowns();
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to edit, this drummer already exists. Each drummer name must be unique!");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to edit. Make sure to populate ALL fields before submitting a new value.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Search Kit by Drummer Function

	This function allows the user to search drum kits by drummer name. It sends a server request that
	runs a SELECT query. It displays a list of drum kits that the selected drummer plays.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('search_kit_by_drummer').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var name = document.getElementById('search_drummer_kit').value;
		
		if (name != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-kit-by-drummer?" + "name=" + name;
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Parse the JSON response
					var response = JSON.parse(req.responseText); 
					
					//Update the new results table
					updateResultsTable(response, "kit_by_drummer");
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to search, make sure to enter a valid drummer.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to search, make sure to enter a valid drummer.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Search Drummer by Kit Function

	This function allows the user to search drummers by drum kit. It sends a server request that
	runs a SELECT query. It displays a list of drummers who play (or have played) the specified kit.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('search_drummer_by_kit').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var id = document.getElementById('search_kit_drummer').value;
		
		if (id != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-drummer-by-kit?" + "id=" + id;
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Parse the JSON response
					var response = JSON.parse(req.responseText); 
					
					//Update the new results table
					updateResultsTable(response, "drummer_by_kit");
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to search, make sure to enter a valid drum kit.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to search, make sure to enter a valid drum kit.");;
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Search Brand by Drummer Function

	This function allows the user to search the brands that a particular drummer uses. It sends a server 
	request that runs a SELECT query. It displays a list of brands. 
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('search_brand_by_drummer').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var name = document.getElementById('search_brand_drummer').value;
		
		if (name != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-brand-by-drummer?" + "name1=" + name + "&name2=" + name;
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Parse the JSON response
					var response = JSON.parse(req.responseText); 
					
					//Update the new results table
					updateResultsTable(response, "brand_by_drummer");
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to search, make sure to enter a valid drummer.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to search, make sure to enter a valid drummer.");;
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Search Drummer by Brand Function

	This function allows the user to search drummers by the brands they use. It sends a server request 
	that runs a SELECT query. It displays a list of drummers who use the specified brand.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('search_drummer_by_brand').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var id = document.getElementById('search_drummer_brand').value;
		
		if (id != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-drummer-by-brand?" + "id1=" + id + "&id2=" + id;
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Parse the JSON response
					var response = JSON.parse(req.responseText); 
					
					//Update the new results table
					updateResultsTable(response, "drummer_by_brand");
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to search, make sure to enter a valid brand name.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to search, make sure to enter a valid brand name.");;
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Search Stick by Drummer Function

	This function allows the user to find the stick type that a particular drummer uses. It sends a 
	server request that runs a SELECT query. It displays a single stick type that corresponds to the 
	specified drummer.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('search_stick_by_drummer').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var name = document.getElementById('search_stick_drummer').value;
		
		if (name != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-stick-by-drummer?" + "name=" + name;
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Parse the JSON response
					var response = JSON.parse(req.responseText); 
					
					//Update the new results table
					updateResultsTable(response, "stick_by_drummer");
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to search, make sure to enter a valid drummer name.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to search, make sure to enter a valid drummer name.");;
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
	
	/* ---------------------------------------------------------------------------------------------
                                    Search Drummer by Stick Function

	This function allows the user to find all of the drummers who use a particular stick. It sends a 
	server request that runs a SELECT query. It displays a list of drummers that use the specified
	stick.
	-----------------------------------------------------------------------------------------------*/
	document.getElementById('search_drummer_by_stick').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var id = document.getElementById('search_drummer_stick').value;
		
		if (id != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest();
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-drummer-by-stick?" + "id=" + id;
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Parse the JSON response
					var response = JSON.parse(req.responseText); 
					
					//Update the new results table
					updateResultsTable(response, "drummer_by_stick");
				} 
				//If the request status isn't valid, display an error message with the request status
				else {
					alert("Unable to search, make sure to enter a valid stick type.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Unable to search, make sure to enter a valid stick type.");;
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
}

/* ---------------------------------------------------------------------------------------------
                                    getBrandName

This function takes either a kit id or stick id as an argument and returns the brand name. It
is used to display brand information in drop down menus, to make it easier for the user to know
what they are selecting. 

Arguments: 
id: either a stick_id or kit_id

Returns: 
The brand name of the passed ID
-----------------------------------------------------------------------------------------------*/
function getBrandName(id) {
	var name = "";
	
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-brand";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			//Find the brand name name of the specified brand id
			for (i = 0; i < response.length; i++) {	
				if (response[i].brand_id == id) {
					name = response[i].name;
				}
			}
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
	
	//return the brand name
	return name;
}

/* ---------------------------------------------------------------------------------------------
                                    updateDrummerDropDowns

This function updates all of the drop down menus that list drummer names. It is called whenever
a drummer is added or removed from the drummer table to assure that the drop down contents are 
up to date. 
-----------------------------------------------------------------------------------------------*/
function updateDrummerDropDowns() {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-drummer";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			/* DELETE OLD DROP CONTENTS OF EACH DROP DOWN MENU */
			
			//Delete contents from drop down 1
			if (document.getElementById("plays_drummer_id").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("plays_drummer_id").length - 1); i >= 0; i--) {
					document.getElementById("plays_drummer_id").remove(i);
				}
			}
			
			//Delete contents from drop down 2
			if (document.getElementById("update_drummer_id").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("update_drummer_id").length - 1); i >= 0; i--) {
					document.getElementById("update_drummer_id").remove(i);
				}
			}
			
			//Delete contents from drop down 3
			if (document.getElementById("search_drummer_kit").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("search_drummer_kit").length - 1); i >= 0; i--) {
					document.getElementById("search_drummer_kit").remove(i);
				}
			}
			
			//Delete contents from drop down 4
			if (document.getElementById("search_brand_drummer").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("search_brand_drummer").length - 1); i >= 0; i--) {
					document.getElementById("search_brand_drummer").remove(i);
				}
			}
			
			//Delete contents from drop down 5
			if (document.getElementById("search_stick_drummer").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("search_stick_drummer").length - 1); i >= 0; i--) {
					document.getElementById("search_stick_drummer").remove(i);
				}
			}
			
			/* ADD UPDATED DROP DOWN CONTENTS 
			note: Javascript would not allow me to add the same option to 5 different menus, which is
			why they are all separated. */
		
			for (i = 0; i < response.length; i++) {	
				//Add updated options to drop down menu 1
				var option = document.createElement("option");
				option.text = response[i].name;
				option.value = response[i].drummer_id;
				document.getElementById("plays_drummer_id").add(option);
				
				//Add updated options to drop down menu 2
				var option2 = document.createElement("option");
				option2.text = response[i].name;
				option2.value = response[i].drummer_id;
				document.getElementById("update_drummer_id").add(option2);
				
				//Add updated options to drop down menu 3
				var option3 = document.createElement("option");
				option3.text = response[i].name;
				option3.value = response[i].name;
				document.getElementById("search_drummer_kit").add(option3);
				
				//Add updated options to drop down menu 4
				var option4 = document.createElement("option");
				option4.text = response[i].name;
				option4.value = response[i].name;
				document.getElementById("search_brand_drummer").add(option4);
				
				//Add updated options to drop down menu 5
				var option5 = document.createElement("option");
				option5.text = response[i].name;
				option5.value = response[i].name;
				document.getElementById("search_stick_drummer").add(option5);
			}
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
}

/* ---------------------------------------------------------------------------------------------
                                    updateKitDropDowns

This function updates all of the drop down menus that list drum kits. It is called whenever
a drum kit is added or removed from the drum kit table to assure that the drop down contents are 
up to date. 
-----------------------------------------------------------------------------------------------*/
function updateKitDropDowns() {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-drum_kit";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			/* DELETE OLD DROP CONTENTS OF EACH DROP DOWN MENU */
			
			//Delete contents from drop down 1
			if (document.getElementById("plays_kit_id").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("plays_kit_id").length - 1); i >= 0; i--) {
					document.getElementById("plays_kit_id").remove(i);
				}
			}
			
			//Delete contents from drop down 2
			if (document.getElementById("search_kit_drummer").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("search_kit_drummer").length - 1); i >= 0; i--) {
					document.getElementById("search_kit_drummer").remove(i);
				}
			}
			
			/* ADD UPDATED DROP DOWN CONTENTS 
			note: Javascript would not allow me to add the same option to 2 different menus, which is
			why they are separated. */
			
			for (let i = 0; i < response.length; i++) {	
				//Add updated options to drop down menu 1
				var option = document.createElement("option");
				option.text = response[i].pieces + "-piece " + getBrandName(response[i].brand_id) + " set with " + response[i].cymbal_type + " cymbals";
				option.value = response[i].kit_id;
				document.getElementById("plays_kit_id").add(option);
				
				//Add updated options to drop down menu 2
				var option2 = document.createElement("option");
				option2.text = response[i].pieces + "-piece " + getBrandName(response[i].brand_id) + " set with " + response[i].cymbal_type + " cymbals";
				option2.value = response[i].kit_id;
				document.getElementById("search_kit_drummer").add(option2);
			}
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
}

/* ---------------------------------------------------------------------------------------------
                                    updateStickDropDowns

This function updates all of the drop down menus that list stick types. It is called whenever
a stick is added or removed from the stick table to assure that the drop down contents are 
up to date. 
-----------------------------------------------------------------------------------------------*/
function updateStickDropDowns() {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-stick";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			/* DELETE OLD DROP CONTENTS OF EACH DROP DOWN MENU */
			
			//Delete contents from drop down 1
			if (document.getElementById("drummer_stick_id").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("drummer_stick_id").length - 1); i >= 0; i--) {
					document.getElementById("drummer_stick_id").remove(i);
				}
			}
			
			//Delete contents from drop down 2
			if (document.getElementById("update_stick_id").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("update_stick_id").length - 1); i >= 0; i--) {
					document.getElementById("update_stick_id").remove(i);
				}
			}
			
			//Delete contents from drop down 3
			if (document.getElementById("search_drummer_stick").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("search_drummer_stick").length - 1); i >= 0; i--) {
					document.getElementById("search_drummer_stick").remove(i);
				}
			}
			
			/* ADD UPDATED DROP DOWN CONTENTS 
			note: Javascript would not allow me to add the same option to 3 different menus, which is
			why they are separated. */
			
			for (let i = 0; i < response.length; i++) {	
				//Add updated options to drop down menu 1
				var option = document.createElement("option");
				option.text = getBrandName(response[i].brand_id) + " " + response[i].type;
				option.value = response[i].stick_id;
				document.getElementById("drummer_stick_id").add(option);
				
				//Add updated options to drop down menu 2
				var option2 = document.createElement("option");
				option2.text = getBrandName(response[i].brand_id) + " " + response[i].type;
				option2.value = response[i].stick_id;
				document.getElementById("update_stick_id").add(option2);
				
				//Add updated options to drop down menu 3
				var option3 = document.createElement("option");
				option3.text = getBrandName(response[i].brand_id) + " " + response[i].type;
				option3.value = response[i].stick_id;
				document.getElementById("search_drummer_stick").add(option3);
			}
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
}

/* ---------------------------------------------------------------------------------------------
                                    updateBrandDropDowns

This function updates all of the drop down menus that list brand names. It is called whenever
a brand is added or removed from the brand table to assure that the drop down contents are 
up to date. 
-----------------------------------------------------------------------------------------------*/
function updateBrandDropDowns() {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-brand";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			/* DELETE OLD DROP CONTENTS OF EACH DROP DOWN MENU */
			
			//Delete contents from drop down 1
			if (document.getElementById("kit_brand_id").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("kit_brand_id").length - 1); i >= 0; i--) {
					document.getElementById("kit_brand_id").remove(i);
				}
			}
			
			//Delete contents from drop down 2
			if (document.getElementById("stick_brand_id").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("stick_brand_id").length - 1); i >= 0; i--) {
					document.getElementById("stick_brand_id").remove(i);
				}
			}
			
			//Delete contents from drop down 3
			if (document.getElementById("search_drummer_brand").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("search_drummer_brand").length - 1); i >= 0; i--) {
					document.getElementById("search_drummer_brand").remove(i);
				}
			}
			
			/* ADD UPDATED DROP DOWN CONTENTS 
			note: Javascript would not allow me to add the same option to 3 different menus, which is
			why they are separated. */
			
			for (i = 0; i < response.length; i++) {	
				//Add updated options to drop down menu 1
				var option = document.createElement("option");
				option.text = response[i].name;
				option.value = response[i].brand_id;
				document.getElementById("kit_brand_id").add(option);
				
				//Add updated options to drop down menu 2
				var option2 = document.createElement("option");
				option2.text = response[i].name;
				option2.value = response[i].brand_id;
				document.getElementById("stick_brand_id").add(option2);
				
				//Add updated options to drop down menu 3
				var option3 = document.createElement("option");
				option3.text = response[i].name;
				option3.value = response[i].brand_id;
				document.getElementById("search_drummer_brand").add(option3);
			}
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
}

/* ---------------------------------------------------------------------------------------------
                                    updateTable

This function takes a table id as an argument and then updates that table. It is called whenever
an entity is added or removed from a data table to assure that the contents are up to date.

Arguments: 

tablID: the ID of the table that is being altered
-----------------------------------------------------------------------------------------------*/
function updateTable(tableID) {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/select-" + tableID;
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			//Delete old table contents
			deleteTableContents(tableID);
			
			//Add new table contents;
			addTableContents(tableID, response);
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
}

/* ---------------------------------------------------------------------------------------------
                                    addTableContents

This function populates the contents of each of the five data tables that are used in the database.

Arguments: 

tablID: the ID of the table that is being altered
object: the JSON object that will be used to populate the table
-----------------------------------------------------------------------------------------------*/
function addTableContents(tableID, object) {
	//Add a new row to the for each member of the passed object
	for (i = 0; i < object.length; i++) {
		if (tableID == "brand") {
			//Insert a new row
			var row = document.getElementById(tableID).insertRow(i + 1);
			
			//Insert a new cell for each column
			var id = row.insertCell(0);
			var name = row.insertCell(1);
			var founder = row.insertCell(2);
			var country = row.insertCell(3);
			var year = row.insertCell(4);
			var del = row.insertCell(5);
			
			//Update the HTML in each new cell
			id.innerHTML = "<center>" + object[i].brand_id + "</center>";
			name.innerHTML = "<center>" + object[i].name + "</center>";
			founder.innerHTML = "<center>" + object[i].founder + "</center>";	
			country.innerHTML = "<center>" + object[i].country_of_origin + "</center>";
			year.innerHTML = "<center>" + object[i].year_established + "</center>";
			del.innerHTML = "<center><form><input type='submit' value='Delete' class='submit' onclick='deleteTableRow(" + object[i].brand_id + ", `brand`)'></form></center>";
		}
		else if (tableID == "drum_kit") {
			//Insert a new row
			var row = document.getElementById(tableID).insertRow(i + 1);
			
			//Insert a new cell for each column
			var id = row.insertCell(0);
			var brand_id = row.insertCell(1);
			var pieces = row.insertCell(2);
			var cymbal_type = row.insertCell(3);
			var del = row.insertCell(4);
			
			//Update the HTML in each new cell
			id.innerHTML = "<center>" + object[i].kit_id + "</center>";
			brand_id.innerHTML = "<center>" + object[i].brand_id + "</center>";
			pieces.innerHTML = "<center>" + object[i].pieces + "</center>";	
			cymbal_type.innerHTML = "<center>" + object[i].cymbal_type + "</center>";
			del.innerHTML = "<center><form><input type='submit' value='Delete' class='submit' onclick='deleteTableRow(" + object[i].kit_id + ", `drum_kit`)'></form></center>";
		}
		else if (tableID == "stick") {
			//Insert a new row
			var row = document.getElementById(tableID).insertRow(i + 1);
			
			//Insert a new cell for each column
			var id = row.insertCell(0);
			var type = row.insertCell(1);
			var brand_id = row.insertCell(2);
			var del = row.insertCell(3);
			
			//Update the HTML in each new cell
			id.innerHTML = "<center>" + object[i].stick_id + "</center>";
			type.innerHTML = "<center>" + object[i].type + "</center>";
			brand_id.innerHTML = "<center>" + object[i].brand_id + "</center>";
			del.innerHTML = "<center><form><input type='submit' value='Delete' class='submit' onclick='deleteTableRow(" + object[i].stick_id + ", `stick`)'></form></center>";
		}
		else if (tableID == "drummer") {
			//Insert a new row
			var row = document.getElementById(tableID).insertRow(i + 1);
			
			//Insert a new cell for each column
			var id = row.insertCell(0);
			var name = row.insertCell(1);
			var hometown = row.insertCell(2);
			var band = row.insertCell(3);
			var stick_id = row.insertCell(4);
			var del = row.insertCell(5);
			
			//Update the HTML in each new cell
			id.innerHTML = "<center>" + object[i].drummer_id + "</center>";
			name.innerHTML = "<center>" + object[i].name + "</center>";
			hometown.innerHTML = "<center>" + object[i].hometown + "</center>";
			band.innerHTML = "<center>" + object[i].band + "</center>";
			stick_id.innerHTML = "<center>" + object[i].stick_id + "</center>";
			del.innerHTML = "<center><form><input type='submit' value='Delete' class='submit' onclick='deleteTableRow(" + object[i].drummer_id + ", `drummer`)'></form></center>";
		}
		else if (tableID == "plays") {
			//Insert a new row
			var row = document.getElementById(tableID).insertRow(i + 1);
			
			//Insert a new cell for each column
			var drummer_id = row.insertCell(0);
			var kit_id = row.insertCell(1);
			var del = row.insertCell(2);
			
			//Update the HTML in each new cell
			drummer_id.innerHTML = "<center>" + object[i].drummer_id + "</center>";
			kit_id.innerHTML = "<center>" + object[i].kit_id + "</center>";
			del.innerHTML = "<center><form><input type='submit' value='Delete' class='submit' onclick='deletePlaysRow(" + object[i].drummer_id + ", " + object[i].kit_id + ")'></form></center>";
		}
	}
}

/* ---------------------------------------------------------------------------------------------
                                    updateResultsTable

This function populates the contents of the results table at the top of the web page. This table
is different depending on which of the 6 search queries are executed. That is why there are 6
sections in the if/else section for adding values.

Arguments: 

object: the JSON object that will be used to populate the table
type: the type of table that will be created (each search form will result in a different table type)
-----------------------------------------------------------------------------------------------*/
function updateResultsTable(object, type) {
	
	/* First delete the old results table contents */
	
	if (document.getElementById("results").rows.length > 1) {
		//Delete the table rows in reverse order to avoid missing rows
		for (i = (document.getElementById("results").rows.length) - 1; i >= 0; i--) {
			document.getElementById("results").deleteRow(i);
		}
	}
	
	/* Then add the new table contents depending on the search query that was selected */
	
	for (i = 0; i <= object.length; i++) {
		if (type == "kit_by_drummer") {
			if (i == 0) {
				//Add table headers 
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var pieces = row.insertCell(1);
				var cymbals = row.insertCell(2);
				
				name.innerHTML = "<center><b>Kit Brand Name</b></center>";
				pieces.innerHTML = "<center><b># of Pieces</b></center>";
				cymbals.innerHTML = "<center><b>Type of Cymbals</b></center>";
			}
			else {
				//Then add table contents
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var pieces = row.insertCell(1);
				var cymbals = row.insertCell(2);
				
				name.innerHTML = "<center>" + object[i-1].name + "</center>";
				pieces.innerHTML = "<center>" + object[i-1].pieces + "</center>";
				cymbals.innerHTML = "<center>" + object[i-1].cymbal_type + "</center>";
			}
		}
		else if (type == "drummer_by_kit") {
			if (object.length == 0) {
				alert("There are no drummers in the database who use that drum kit");
			}
			else if (i == 0) {
				//Add table headers 
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var band = row.insertCell(1);
				var hometown = row.insertCell(2);
				
				name.innerHTML = "<center><b>Drummer Name</b></center>";
				band.innerHTML = "<center><b>Band</b></center>";
				hometown.innerHTML = "<center><b>Hometown</b></center>";
			}
			else {
				//Then add table contents
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var band = row.insertCell(1);
				var hometown = row.insertCell(2);
				
				name.innerHTML = "<center>" + object[i-1].name + "</center>";
				band.innerHTML = "<center>" + object[i-1].band + "</center>";
				hometown.innerHTML = "<center>" + object[i-1].hometown + "</center>";
			}
		}
		else if (type == "brand_by_drummer") {
			if (i == 0) {
				//Add table headers 
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var founder = row.insertCell(1);
				var country = row.insertCell(2);
				var year = row.insertCell(3);
				
				name.innerHTML = "<center><b>Brand Name</b></center>";
				founder.innerHTML = "<center><b>Founder</b></center>";
				country.innerHTML = "<center><b>Country of Origin</b></center>";
				year.innerHTML = "<center><b>Year Established</b></center>";
			}
			else {
				//Then add table contents
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var founder = row.insertCell(1);
				var country = row.insertCell(2);
				var year = row.insertCell(3);
				
				name.innerHTML = "<center>" + object[i-1].name + "</center>";
				founder.innerHTML = "<center>" + object[i-1].founder + "</center>";
				country.innerHTML = "<center>" + object[i-1].country_of_origin + "</center>";
				year.innerHTML = "<center>" + object[i-1].year_established + "</center>";
			}
		}
		else if (type == "drummer_by_brand") {
			if (object.length == 0) {
				alert("There are no drummers in the database who use that brand");
			}
			else if (i == 0) {
				//Add table headers 
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var band = row.insertCell(1);
				var hometown = row.insertCell(2);
				
				name.innerHTML = "<center><b>Drummer Name</b></center>";
				band.innerHTML = "<center><b>Band</b></center>";
				hometown.innerHTML = "<center><b>Hometown</b></center>";
			}
			else {
				//Then add table contents
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var band = row.insertCell(1);
				var hometown = row.insertCell(2);
				
				name.innerHTML = "<center>" + object[i-1].name + "</center>";
				band.innerHTML = "<center>" + object[i-1].band + "</center>";
				hometown.innerHTML = "<center>" + object[i-1].hometown + "</center>";
			}
		}
		else if (type == "stick_by_drummer") {
			if (i == 0) {
				//Add table headers 
				var row = document.getElementById("results").insertRow(i);
				
				var brand = row.insertCell(0);
				var stickType = row.insertCell(1);
				
				brand.innerHTML = "<center><b>Stick Brand</b></center>";
				stickType.innerHTML = "<center><b>Type</b></center>";
			}
			else {
				//Then add table contents	
				var row = document.getElementById("results").insertRow(i);
				
				var brand = row.insertCell(0);
				var stickType = row.insertCell(1);
				
				brand.innerHTML = "<center>" + object[i-1].name + "</center>";
				stickType.innerHTML = "<center>" + object[i-1].type + "</center>";
			}
		}
		else if (type == "drummer_by_stick") {
			if (object.length == 0) {
				alert("There are no drummers in the database who use that stick type");
			}
			else if (i == 0) {
				//Add table headers 
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var band = row.insertCell(1);
				var hometown = row.insertCell(2);
				
				name.innerHTML = "<center><b>Drummer Name</b></center>";
				band.innerHTML = "<center><b>Band</b></center>";
				hometown.innerHTML = "<center><b>Hometown</b></center>";
			}
			else {
				//Then add table contents
				var row = document.getElementById("results").insertRow(i);
				
				var name = row.insertCell(0);
				var band = row.insertCell(1);
				var hometown = row.insertCell(2);
				
				name.innerHTML = "<center>" + object[i-1].name + "</center>";
				band.innerHTML = "<center>" + object[i-1].band + "</center>";
				hometown.innerHTML = "<center>" + object[i-1].hometown + "</center>";
			}
		}
	}
}

/* ---------------------------------------------------------------------------------------------
                                    updateResultsTable

Clears the contents of a given table. It is used evertime an item is added or removed to a table.
The table is cleared with this function before being filled with updated data. 

Arguments: 

tablID: the ID of the table that is being cleared
-----------------------------------------------------------------------------------------------*/
function deleteTableContents(tableID) {
	//Delete all rows besides the header row
	if (document.getElementById(tableID).rows.length > 1) {
		//Delete the table rows in reverse order to avoid missing rows
		for (i = (document.getElementById(tableID).rows.length - 1); i > 0; i--) {
			document.getElementById(tableID).deleteRow(i);
		}
	}
}

/* ---------------------------------------------------------------------------------------------
                                    deleteTableRow

This function deletes a given item from the database. It is called whenever the user presses onerror
of the delete buttons in the data tables. It sends a DELETE request to the server to delete a 
particular item from a particular table.

Arguments: 

id: the ID of the element that is being deleted
tablID: the ID of the elements table
-----------------------------------------------------------------------------------------------*/
function deleteTableRow(id, tableID) {
	//Create a new HTTP request
	var req = new XMLHttpRequest();   
	
	//Contruct a URL that sends a GET request to /delete with the id and tableID value
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/delete-" + tableID + "?id=" + id; 
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			console.log(req.responseText); 
			updateTable(tableID);
			updateDropDowns();
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			alert("Can't Delete This Row, It is Referenced By Another Table!");
		}});	
		
	req.send(null);         //no need to send additional data
	event.preventDefault(); //prevent the page from refreshing
}

/* ---------------------------------------------------------------------------------------------
                                    deletePlaysRow

This function deletes a given item from the plays table. It is a modified version of the 
deleteTableRow function, which was necessary because the plays table uses two primary keys instead
of one and therefore needs to be passed two id values.

Arguments: 

id1: the drummer ID of the element that is being deleted
id2: the kit ID of the element that is being deleted
-----------------------------------------------------------------------------------------------*/
function deletePlaysRow(id1, id2) {
	//Create a new HTTP request
	var req = new XMLHttpRequest();   
	
	//Contruct a URL that sends a GET request to /delete with the id value
	var url = "http://flip2.engr.oregonstate.edu:" + port + "/delete-plays" + "?drummer_id=" + id1 + "&kit_id=" + id2; 
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			console.log(req.responseText); 
			updateTable("plays");
			updateDropDowns();
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}});	
		
	req.send(null);         //no need to send additional data
	event.preventDefault(); //prevent the page from refreshing
}