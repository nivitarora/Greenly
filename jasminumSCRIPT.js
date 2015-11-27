var database = new Firebase("https://vivid-torch-4313.firebaseio.com/"); 
var username;
var todayTotal;
var gallons;
var powertotal;
var watts;
var status;
var email;
var a;
var leaderGal;
var userGallons;
var userList;
var listUG = [];
var user1;
var user1score;
var user2;
var user2score;
var user3;
var user3score;
var leaderWatts;
var userWatts;
var userListWatts;
var listUGwatts = [];
var user1watts;
var user1scoreWatts;
var user2watts;
var user2scoreWatts;
var user3watts;
var user3scoreWatts;

//define my function "login"
function login () {
	username = $('#username').val();
   	database.child(username).once('value', function(snapshot) {
		if (snapshot.val() === null) { //if the user doesn't exist
		   alert("There is no user " + String(username));
		   $('#username').val(""); //clear username text field
		}
		else { //This user's account already exists
			database.child(username).once('value', function(snapshot) {
			var keys=snapshot.val();
			gallons=keys.gallonsSaved; //sets gallons to the user's info
			watts=keys.wattsSaved; //sets watts to user's info
			$('#profileusername').html(username);
			$('#myResults').html(gallons);
			$('#myWatts').html(watts);
		});
			//Go to the database and get gallons as the number of gallons saved as stored in the database
		    window.location.replace('#pageMain');
		    topUsers();
		    topUsersWatts();
		}
	});
};

// LEADERBOARD STUFFFFF
function topUsers () { 
	//console.log("lala")
	var usersindb;
	var counter = 0;
	database.once('value', function(snapshot) {
	    userList=  Object.keys(snapshot.val());
	    //console.log(userList);
		var keys = snapshot.val();
		for (var i=0;i< userList.length; i++) {
			var user=userList[i];
			listUG.push([user]);
		}
		database.on('child_added', function (data) {
			var gee = data.val();
			userGallons = gee.gallonsSaved; 
			listUG[counter].push(userGallons);
			counter++;
			sort(listUG);
            user1 = listUG[listUG.length-1][0];
            user1score = listUG[listUG.length-1][1];
            user2 = listUG[listUG.length-2][0];
            user2score = listUG[listUG.length-2][1];
            user3 = listUG[listUG.length-3][0];
            user3score = listUG[listUG.length-3][1];
            $('#leaderboard1').html(user1);
            $('#leaderboard1gal').html(user1score);
            $('#leaderboard2').html(user2);
            $('#leaderboard2gal').html(user2score);
            $('#leaderboard3').html(user3);
            $('#leaderboard3gal').html(user3score);
		});
	});
};
	
function sort(list) {
    var endIndex = 0;
    var len = list.length - 1;
    for (var i = 0; i < len; i++) { //for the number of items in the list
        for (var j = 0, swapping, endIndex = len - i; j < endIndex; j++) { //for each item in the list
            if (list[j][1] > list[j + 1][1]) { //if the item is greater than the next item
                swapping = list[j];
                list[j] = list[j + 1];
                list[j + 1] = swapping;
            };
        };
    }
 };

function topUsersWatts () { 
	var usersindbwatts;
	var counterwatts = 0;
	database.once('value', function(snapshot) {
	    userListWatts=  Object.keys(snapshot.val());
		var keysWatts = snapshot.val();
		for (var i=0; i<userListWatts.length; i++) {
			var userW=userListWatts[i];
			listUGwatts.push([userW]);
		}
		database.on('child_added', function (data) {
			var geeWatts = data.val();
			userWatts = geeWatts.wattsSaved; 
			listUGwatts[counterwatts].push(userWatts);
			counterwatts++;
			sort(listUGwatts);
		    user1watts = listUGwatts[listUGwatts.length-1][0];
            user1scoreWatts = listUGwatts[listUGwatts.length-1][1];
            user2watts = listUGwatts[listUGwatts.length-2][0];
            user2scoreWatts = listUGwatts[listUGwatts.length-2][1];
            user3watts = listUGwatts[listUGwatts.length-3][0];
            user3scoreWatts = listUGwatts[listUGwatts.length-3][1];
            $('#Eleaderboard1').html(user1watts);
            $('#Eleaderboard1watts').html(user1scoreWatts);
            $('#Eleaderboard2').html(user2watts);
            $('#Eleaderboard2watts').html(user2scoreWatts);
            $('#Eleaderboard3').html(user3watts);
		    $('#Eleaderboard3watts').html(user3scoreWatts);
		});
	});
};

//MORE LEADERBOARD STUFF
function sortWatts(list1) {
    var endIndexWatts = 0;
    var length = list1.length - 1;
    for (var i = 0; i < length; i++) { //for the number of items in the list
        for (var j = 0, swapping, endIndexWatts = length - i; j < endIndexWatts; j++) { //for each item in the list
            if (list1[j][1] > list1[j + 1][1]) { //if the item is greater than the next item
                swapping = list1[j];
                list1[j] = list1[j + 1];
                list1[j + 1] = swapping;
            };
        };
    }           
};

function addToDB(){
	var user = $('#newUser').val();
	database.child(user);
};

$(document).ready(function() {
    $("#buttonLogin2").click(function(){
    	login();
    });
	$('#username').keypress(function (e) {
        if (e.keyCode == 13) {
        	login();
    	}
	});
});

//CREATE AN ACCOUNT
$(document).ready(function() {
    $("#buttonAdd").click(function(){
       	username = $('#newUser').val();
       	database.child(username).once('value', function(snapshot) {
			if (snapshot.val() === null){
				addToDB();
				gallons = 0;
       			database.child(username).update({"gallonsSaved" : gallons});
			    watts = 0;
       		    database.child(username).update({"wattsSaved" : watts});
			    window.location.replace('#pageMain');
			    $('#profileusername').html(username);
			    topUsers();
			    topUsersWatts();
			}
			else {
				alert("username already used");
				$('#newUser').val("");
			}
		});
	}); 
});

$(document).ready(function() {
    $("#buttonProfile").click(function(){ //when you click on the profile button
		//show gallons
		$('#myResults').html(gallons);
	}); 
});


// SUBSCRIPTION
$(document).ready(function() {
    $("#buttonProfile").click(function(){ //when you click on the profile button
		//show gallons
		$('#myResults').html(gallons);
		$('#myWatts').html(watts);
		signUp();
	}); 
});

//checks if the button is clicked and if it is, it runs through the challenges and add respective points to the today's total
$(document).ready(function(gal) {
	var challengeValues = [25, 3, 20, 4, 20];
	$('#saveWater').click(function(gal) {
		todayTotal = 0; 
		for (var i = 0; i < 5; i++) {
			if($('#check' + i).prop('checked')) {
				todayTotal = todayTotal + challengeValues[i];
			}
		}
		gallons = gallons + todayTotal;
		database.child(username).update({"gallonsSaved" : gallons});
		$('#myResults').html(gallons);
		window.location.replace('#buttonProfile');
	});
});

//THIS IS FOR ELECTRICITY
$(document).ready(function() {
	var electricityValues = [20, 90, 45, 120, 150];
	$('#saveElectricity').click(function(){
		powerTotal = 0; 
		for (var i = 5; i < 10; i++) {
			if($('#check' + i).prop('checked')){
				powerTotal = powerTotal + electricityValues[i-5];
			}
		}
		watts = watts + powerTotal;
		database.child(username).update({"wattsSaved" : watts});
		$('#myWatts').html(watts);
	});
});

//subscribe to fun facts **note: email/texting APIs not implemented yet**
$(document).ready(function() {
	$('#subscribe').click(function(){
		email = $('#email').val();
		database.child(username).update({"email" : email});
		phone = $('#phone').val();
		database.child(username).update({"phone" : phone});
		if($('#alert').prop('checked')){
			window.location.replace('#pageProfile');
			sendFact();
		}
		status = true;
		database.child(username).update({"a": 0});
		database.child(username).update({"facts": 0});
		database.child(username).child("facts").update({0: "During the time it takes you to read this sentence, 50,000 twelve-ounce aluminum cans are made"});
		database.child(username).child("facts").update({1: "If all our newspaper was recycled, we could save about 250 million trees each year - so get recycling!"});
		database.child(username).child("facts").update({2: "Plastic bags and other plastic garbage thrown into the ocean kill as many as 1 million sea creatures every year"});
		database.child(username).child("facts").update({3: "Americans use 2 5 million plastic bottles every hour, most of which are thrown away"});
		database.child(username).child("facts").update({4: "A modern glass bottle takes 4,000 years or more to decompose"});
		database.child(username).child("facts").update({5: "Plastic in oceans break down into such small segments that pieces from a one liter bottle could reach every mile of beach in the world"});
		database.child(username).child("facts").update({6: "Approximately 380 billion plastic bags are used in the United States every year. That’s more than 1,200 bags per US resident, per year"});
		database.child(username).child("facts").update({7: "The US has less than 4% of its forests left"});
		signUp();
		//setInterval(sendFact(), 86400000);
		window.location.replace('#pageProfile');
	});
});

$(document).ready(function() {
	$('#email').click(function(){
		$('#email').val("");
	});
	$('#phone').click(function(){
		$('#phone').val("");
	});
});

$(document).ready(function() {
	$('#buttonTest').click(function(){
		sendFact();
	});
});

function signUp(){
	if(status === true) {
		$('#subscription').html("");
    	$('#subscription').html("thank you for subscribing! you are now being emailed daily with facts about the world you live in");
	}
	else {
		$('#subscription').html("click subscribe to get emailed a fun fact every day about your environment");
	}
	var d = new Date();
    var t = d.toLocaleTimeString();
    console.log("woohoo");
};

function sendFact(){
	database.child(username).once('value', function(snapshot) {
		var thing=snapshot.val();
		a = thing.a;
		fact = thing.facts[a];
		alert(fact);
		a = a+1;
		database.child(username).update({"a": a});
		var j = $('#factsList li').eq(4);
		j.show();
	});
};
