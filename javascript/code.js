// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyC5kccnMrv77Ob-RHaNn7R5WeDzaNSYwXw",
    authDomain: "train-scheduler-468bc.firebaseapp.com",
    databaseURL: "https://train-scheduler-468bc.firebaseio.com",
    projectId: "train-scheduler-468bc",
    storageBucket: "train-scheduler-468bc.appspot.com",
    messagingSenderId: "259733638640",
    appId: "1:259733638640:web:4448610fe473da8b2ca135",
};

firebase.initializeApp(config);

var database = firebase.database();

// Start click event to add trains
$('#add-train-btn').on('click', function (event) {
    event.preventDefault();

    // User input for trains 
    var trainName = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var arrival = $('#first-time-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    // Testing input 
    // console.log(trainName + ' input');
    // console.log(destination + ' input');
    // console.log(arrival + ' input');
    // console.log(frequency + ' input');

    // Local object to push new train to firebase
    var newTrain = {
        trainNameX: trainName,
        destinationX: destination,
        arrivalX: arrival,
        frequencyX: frequency
    }

    // New train object gets uploaded to database 
    database.ref().push(newTrain);
    console.log("new train successfully uploaded to database");

});

// Firebase event for adding trains to the database 
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var arrival = childSnapshot.val().arrival;
    var frequency = childSnapshot.val().frequency;

    // Train info
    console.log(trainName);
    console.log(destination);
    console.log(arrival);
    console.log(frequency);

    // Start Train Time Calculations 
    // Assumptions (in minutes)
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // End train time calculations 

});