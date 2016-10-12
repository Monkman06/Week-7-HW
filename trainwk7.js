var config = {
    apiKey: "AIzaSyAeJX6ppJGuxgq7Cap18AbnaSXD5aPpuvM",
    authDomain: "monkweek7.firebaseapp.com",
    databaseURL: "https://monkweek7.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "88411906450"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//button for adding trains
$("#addTrainBtn").on("click", function(){
//grabs user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequencyInput").val().trim();

//creates local "temp" object for holding train data
var newTrain = {
  name: trainName,
  destination: destination,
  firstTrain: firstTrainUnix,
  frequency: frequency
}

// uploads train data to the data base
  trainData.ref().push(newTrain);

// logs everything to console
 console.log(newTrain.name);
 console.log(newTrain.destination);
 console.log(firstTrainUnix);
 console.log(newTrain.frequency);
        
// Alert
alert("Train successfully added");

//determines when the next Train arrives
  return false;
});

// creates firebase event for adding trains to the database & a row in the html when user adds an entry
  trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // store everything into a variable
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain

//calculate the minutes until arrival using hardcore math
// to calculate the minutes til arrival, take the current time in unix subtract the firstTrain time & the 
// modulus between the difference & frequency
  var differentTime = moment().diff(moment.unix(tFirstTrain), "minutes");        
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
  var tMinutes = tFrequency - tRemainder;
          
// add tMinutes to current time to calculate time
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  console.log(tMinutes);
  console.log(tArrival);

console.log(moment().format("hh:mm A"));
console.log(tArrival);
console.log(moment().format("X"));
          
// add each trains data into the table
$("#trainTrain > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" tFrequency + "</td><td>" + tArrival + "</td><td>" tMinutes + "</td></tr>");

});

// var time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
//  console.log(time);
//  $("#time").append(time);
