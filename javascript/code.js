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

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var frequency = childSnapshot.val().start;
    var arrival = childSnapshot.val().rate;

    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(arrival);

})