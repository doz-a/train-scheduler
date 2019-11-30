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
    var arrival = moment($('#first-time-input').val().trim(), "HHmm").format("X");
    var frequency = $('#frequency-input').val().trim();

    // Local object to push new train to firebase
    var newTrain = {
        trainNameX: trainName,
        destinationX: destination,
        arrivalX: arrival,
        frequencyX: frequency
    }

    // New train object gets uploaded to database 
    database.ref().push(newTrain);

    // Clears text boxes to add more trains 
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#first-time-input').val('');
    $('#frequency-input').val('');

});

// Firebase event for adding trains to the database 
database.ref().on("child_added", function (childSnapshot) {

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainNameX;
    var destination = childSnapshot.val().destinationX;
    var arrival = childSnapshot.val().arrivalX;
    var frequency = childSnapshot.val().frequencyX;

    // Prettify arrival time using moment.unix in military time
    var arrivalPretty = moment.unix(arrival).format("HHmm");

    // Start Train Time Calculations 
    var tFrequency = frequency;

    // Variable is arrival 
    var firstTime = arrivalPretty;

    // // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HHmm").subtract(1, "years");

    // // Gets the current time, need to convert to MILITARY time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HHmm"));

    // // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("remainder: ", + tRemainder);

    // // Minutes Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("---------------------ARRIVAL TIME (military time): " + moment(nextTrain).format("HHmm"));

    // console.log(arrivalPretty + "arrival");
    // console.log(nextTrain + "next train");
    // console.log(firstTime + "first time");
    // console.log(firstTimeConverted + " first time converted");
    console.log("current time" + moment().format("HHmm"));
    console.log("next train time" + moment(nextTrain).format("HHmm"));
    // console.log(moment(firstTimeConverted).format("HHmm"));

    // End train time calculations 

    // if else statement to make sure the next Train time is always greater than the first arrival time
    // if (arrivalPretty > nextTrain) {

    // } else {

    // }

    // Create the new row in the train schedule table
    // Train Name, Destination, First train Time, frequency, minutes away (calculated), next train time (calculated)
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(arrivalPretty),
        $("<td>").text(frequency),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").text(moment(nextTrain).format("HHmm"))
        // Add button here for deleting a row 

    );

    // Append the row to the table
    $("#train-table > tbody").append(newRow);

});