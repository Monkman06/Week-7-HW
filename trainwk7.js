var config = {
    apiKey: "AIzaSyAeJX6ppJGuxgq7Cap18AbnaSXD5aPpuvM",
    authDomain: "monkweek7.firebaseapp.com",
    databaseURL: "https://monkweek7.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "88411906450"
  };
  firebase.initializeApp(config);

var database = firebase.database();



var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;
var nextArrival = "";
var minutesAway = 0;


$("#addTrain").on("click", function() {

  trainName = $("#nameinput").val().trim();
  destination = $("#destinationinput").val().trim();
  startTime = $("#starttimeinput").val().trim();
  frequency = $("#frequencyinput").val().trim();

        database.ref().push({

        trainName: trainName,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        
        });

  return false;

});

  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().startTime);
    console.log(childSnapshot.val().frequency);


    var startTime = childSnapshot.val().startTime;
      var frequency = childSnapshot.val().frequency;

        var firstTimeConverted = moment(startTime,"hh:mm").subtract(1, "years");
          console.log("First Time: " + firstTimeConverted);

        var currentTime = moment();
          console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          console.log("DIFFERENCE IN TIME: " + diffTime);

        var timeRemainder = diffTime % frequency;
          console.log(timeRemainder);

        var minutesAway = frequency - timeRemainder;
          console.log("MINUTES TILL TRAIN: " + minutesAway);

        var nextArrival = moment().add(minutesAway, "minutes");
          console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    
    var $trainBody = $("#trainRows");

    var $trainRow = $("<tr>");

    var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
    var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
    var $startTime = $('<td>').html(childSnapshot.val().startTime).appendTo($trainRow);
    var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);

    var $nextArrival = $('<td>').html(nextArrival).appendTo($trainRow);
    var $minutesAway = $('<td>').html(minutesAway).appendTo($trainRow);
      
    $trainRow.appendTo($trainBody);

    }), function(errorObject){

    console.log("Errors handled: " + errorObject.code)
    
    }


// var time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
//  console.log(time);
//  $("#time").append(time);
